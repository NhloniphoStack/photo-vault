"use client"
import groupPhotos from "@/util/groupPhotos"
import type { Photo } from "../PhotoViewer/PhotoViewer"
import { date } from "better-auth"
import getDateLabel from "@/util/getDateLabel"
import PhotoCard from "../PhotoCard/PhotoCard"
import { useState, useTransition } from "react"
import ToolBar from "../ToolBar/ToolBar"
import styles from './photoGallery.module.css'
import { useRouter } from "next/navigation"
import ErrorBox from "../ErrorBox/ErrorBox"
export default function PhotoGallery({photos} : {
      photos: Photo[]
}){
    
      const [isError, setIsError] = useState(false)
       const [isPending, startTransition] = useTransition()
      const [selectedId, setSelectedId] = useState<number[]>([])
      const [favoritePhotos, setFavouritePhotos] = useState<number[]>([])
      const [isLoadingFav, setIsLoadingFav] = useState(false)
      
        const [favAction,setFavAction] = useState<"fav" | "unfav" | null>(null)
      const previousPhotos = photos
    const [uiPhotos, setUiPhotos] = useState<Photo[]>(photos)
    const groups = groupPhotos(uiPhotos)
    const router = useRouter();

     async function handlemoveTrash(){
        if(selectedId.length === 0) return;
        
        setUiPhotos(prev => prev.filter(photo => !selectedId.includes(photo.id as number)))

        startTransition(async() => {
              
            try{
             
              
                const res = await fetch(`/api/temp`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ids: selectedId})
                }) 

                if(!res.ok){
                    throw new Error(`ERROR : ${res.statusText}`)
                }
             
                router.refresh()
                setSelectedId([])

            }catch(error){
            setUiPhotos(previousPhotos)
            setIsError(true)
             console.log(error)
            }
        })
     }

     async function handleFav(isFavorite: boolean){

        setIsLoadingFav(true)

        setFavAction(isFavorite ? 'fav' : 'unfav')
        
           const favPhotos = photos.filter(photo => selectedId.includes(Number(photo.id)))
         setUiPhotos(prev => prev.map(photo => selectedId.includes(Number(photo.id)) ? {...photo, is_favorite: isFavorite} : photo))
           
         
         try{

            

            const res = await fetch('/api/photos', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ids: selectedId, isFavorite: isFavorite})
            })

            if(!res.ok){
                throw new Error('Failed to add to Favourite')
                return;
            }

            
          setSelectedId([])
          return router.refresh()

        }catch(error){
            setUiPhotos(previousPhotos)
            console.log(error)
        }finally{
            setIsLoadingFav(false)
            setFavAction(null)
        }
        
     }

     const pickedPhotos: Photo[] = photos.filter(photo => selectedId.includes(Number(photo.id)))
     const allFavorited = pickedPhotos.every(photo => photo.is_favorite)

    return(
        <>
        {isError && 
                             <ErrorBox>
                                Failed to delete.
                                 Please refresh page and try again
                             </ErrorBox>}

        {selectedId.length > 0 && !isError &&
                            <ToolBar 
                            handleFav={handleFav}
                            isLoadingFav={isLoadingFav}
                            allFavorited={allFavorited}
                            favAction={favAction}
                            handleMoveTrash={handlemoveTrash}
                             selectedId={selectedId} 
                             isPending={isPending}/>
                             }
        <div className={styles.gallery_container}>
            {[...groups.entries()].map(([date, photos]) => (
                <section key={date}>
                    
                     

                    <h4 className={styles.heading}>{getDateLabel(date)}</h4>
                     
                    <div className={styles.photo_grid}>
                        {photos.map(photo =>
                             <PhotoCard 
                             onFavorite={(id: number) => setFavouritePhotos(prev => prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id])}
                             key={photo.id}
                             isFavorite={photo.is_favorite}
                             photo={photo}
                             isActive={selectedId.includes(photo.id as number)}
                             onSelect={(id: number) => setSelectedId(prev => prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id])}

                             />)}
                    </div>

                </section>
            ))}
        </div>
        </>
    )
}