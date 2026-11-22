"use client"
import { useState, useTransition, useEffect } from 'react'
import styles from './albumDetails.module.css'
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6'
import AddPhotosModal from '../AddPhotosModal/AddPhotosModal'
import type { Photo } from '../PhotoViewer/PhotoViewer'
import photo1 from '../../public/pexels-burst-545014.jpg'
import PhotoCard from '../PhotoCard/PhotoCard'
import { FaTrash } from 'react-icons/fa'
import { redirect, useRouter } from 'next/navigation'
import ErrorBox from '../ErrorBox/ErrorBox'
import EmptyAlbum from '../EmptyAlbum/EmptyAlbum'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import AlbumDeleteModal from '../AlbumDeleteModal/AlbumDeleteModal'
import ToolBar from '../ToolBar/ToolBar'

export type Details = {
            id: number | undefined
          user_id: string
         name: string
         created_at: string
}

export default function AlbumDetails({photos, details, albumPhotos}: {
    photos: Photo[]
    details: Details
    albumPhotos: Photo[]
}){
    const [showModal, setShowModal] = useState(false)
    const [uiPhotos, setUiPhotos] = useState(albumPhotos)
    const previousPhotos = albumPhotos
    
    console.log(details)
    const [seletedIds, setSelectedIds] = useState<number[]>([])
    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
    console.log(selectedPhotos)
    const [isPending, startTransition] = useTransition()
   const [uiAllPhotos, setUiAllPhotos] = useState<Photo[]>(photos)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingFav, setIsLoadingFav] = useState(false)
    const [favoritePhotos , setFavouritePhotos] = useState<number[]>([])
    const [error, setError] = useState(null)
    const [isUnfavorite, setIsUnfavorite] = useState(false)
    const [favAction,setFavAction] = useState<"fav" | "unfav" | null>(null)
     console.log(isLoadingFav)
    const router = useRouter()
    function handleClose(){
        setShowModal(false)
    }

    function handleToggle(){
        setShowModal(prev => !prev)
    }

    function loadText(){
        if(uiPhotos.length > 1){
            return `${uiPhotos.length} Photos`
        }else if(uiPhotos.length === 0){
            return `No photos yet`
        }else {
            return `${uiPhotos.length} Photo`
        }
    }

   

    const newPhotos = photos.filter(photo => selectedPhotos.includes(Number(photo.id)))

   

    async function handleAdd(){
       setShowModal(false)
       if(isLoading) return;
      for(const obj of newPhotos){
        setUiPhotos(prev => [...prev, obj])
      }
      
      setUiAllPhotos(prev => prev.filter(photo => !selectedPhotos.includes(Number(photo.id))))
       try{
          setIsLoading(true)
        const res = await fetch(`/api/album`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ids: selectedPhotos, album_id: details.id})
        })

        if(!res.ok){
            throw new Error('Failed to submit')
        }

        setSelectedPhotos([])

       }catch(error){
       console.log(error)
        setUiPhotos(previousPhotos)

       }finally{
        setIsLoading(false)
       }
    }

    async function handlemoveTrash(){
        if(seletedIds.length === 0) return;

        setUiPhotos(prev => prev.filter(photo => !seletedIds.includes(photo.id as number)))

        startTransition(async() => {
              
            try{
              
                const res = await fetch(`/api/temp`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ids: seletedIds})
                }) 

                if(!res.ok){
                    throw new Error(`ERROR : ${res.statusText}`)
                }
             
                router.refresh()
                setSelectedIds([])

            }catch(error){
            setUiPhotos(previousPhotos)
             console.log(error)
            }
        })
     }


      function handleSelect(id: number){
        setSelectedPhotos(prev => prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id])
     }

     const availablePhotos = uiAllPhotos.filter(photo => 
        !albumPhotos.some(a => a.id === photo.id)
     )

     useEffect(() => {
        setUiPhotos(albumPhotos)
     }, [albumPhotos])

     function handleSwitch(){
        setShowDeleteModal(prev => !prev)
     }

     async function handleDeleteAlbum(){
           setShowDeleteModal(false)
            router.push('/gallery/album')
          
           try{

            const res = await fetch(`/api/album`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({album_id: details.id})
            })

            if(!res.ok){
                throw new Error(`Failed to delete album`)
                return;
            }
  
            return router.push('/gallery/album')

           }catch(error){
            console.log(error)
            
             setIsError(true)
           }
     }

     function openBox(){
        if(seletedIds.length > 0){
            return true
        }

        if(favoritePhotos.length > 0){
            return true
        }

        return false
     }

     async function handleFav(isFavorite: boolean){

        if(seletedIds.length === 0 || isLoadingFav) return
        
         setIsLoadingFav(true)
         setFavAction(isFavorite ? "fav" : "unfav")

           const favPhotos = photos.filter(photo => seletedIds.includes(Number(photo.id)))
         setUiPhotos(prev => prev.map(photo => seletedIds.includes(Number(photo.id)) ? {...photo, is_favorite: isFavorite} : photo))
            try{

           

            const res = await fetch('/api/photos', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ids: seletedIds, isFavorite: isFavorite})
            })

            if(!res.ok){
                throw new Error('Failed to add to Favourite')
                return;
            }

            
          setSelectedIds([])
          return router.refresh()

        }catch(error){
            setUiPhotos(previousPhotos)
            console.log(error)
        }finally{
            setIsLoadingFav(false)
            setFavAction(null)
        }
        
     }

     const pickedPhotos: Photo[] = uiPhotos.filter(photo => seletedIds.includes(Number(photo.id)))
     const allFavorited = pickedPhotos.every(photo => photo.is_favorite)

     function handleNav(){
        return redirect('.')
     }

    return (
           <section className={styles.container}>
            <div className={styles.header_container}>

                 <div className={styles.header}>
               <div onClick={handleNav} className={styles.arrow}>
                   <FaArrowLeftLong size={14} color='grey'/>
               </div>
               
               <div>
                <h4>{details?.name ?? "Unknown"}</h4>
                <span className={styles.no_photo_text}>{loadText()}</span>
               </div>
               
            </div>
            <div className={styles.button_container}>
                <button onClick={handleToggle} className={styles.add_button}>
                    <FaPlus size={13}/>
                    Add photos
                </button>
                 <button onClick={handleSwitch} className={styles.delete_button}>
                    <FaTrash color='red' size={13}/>
                </button>
            </div>

            </div>
             {openBox() &&
              <ToolBar 
              favAction={favAction}
              allFavorited={allFavorited}
              isLoadingFav={isLoadingFav}
              handleFav={handleFav}
              selectedId={seletedIds}
              handleMoveTrash={handlemoveTrash}
               isPending={isPending}/>}

              

           {isError && <ErrorBox>
                Failed to delete Album.
                Please refresh page and try again
            </ErrorBox>}
            {uiPhotos.length === 0 && !isPending && <EmptyAlbum handleToggle={handleToggle}/>}
            

            <div className={styles.card_layout}>
                {uiPhotos.map(photo => 
                <PhotoCard 
                isFavorite={photo.is_favorite}
                onFavorite={(id: number) => setFavouritePhotos(prev => prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id])}
                key={photo.id} isActive={seletedIds.includes(Number(photo.id))} onSelect={(id: number) => setSelectedIds(prev => prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id])} 
                 photo={photo}/> )}
            </div>
          {showModal && 
          <AddPhotosModal 
          selectedPhotos={selectedPhotos}
          handleSelect={handleSelect}
          handleAdd={handleAdd}
          handleClose={handleClose}
           photos={availablePhotos}/>}

       {showDeleteModal && 
       <AlbumDeleteModal
        handleDeleleAlbum={handleDeleteAlbum} 
        handleToggle={handleSwitch}/>}
        
        </section>
    )
}