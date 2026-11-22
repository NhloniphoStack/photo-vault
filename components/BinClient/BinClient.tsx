"use client"
import styles from './binClient.module.css'
import type { Photo } from '../PhotoViewer/PhotoViewer'
import BinGrid from '../BinGrid/BinGrid'
import BinHeader from '../BinHeader/BinHeader'
import NoTrash from '../NoTrash/NoTrash'
import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorBox from '../ErrorBox/ErrorBox'
export default function BinClient({photos}: {
    photos: Photo[]
}){      
       const [confirm, setConfirm] = useState(false)
       const [isPending, startTransition] = useTransition()
       const [isError, setIsError] = useState(false)
       const [showResults, setShowResults] = useState(false)
       const router = useRouter()
       const [showRestore, setShowRestore] = useState(false)
       
       const [uiPhotos, setUiPhotos] = useState<Photo[]>(photos)

       const previousPhotos = photos

       async function handleDelete(){
           setUiPhotos([])
           setConfirm(false)
            setShowResults(true)
            setTimeout(() => {
               setShowResults(false)
            }, 2000)
            
            try{
            
                const res = await fetch(`/api/photos`, {
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

             setConfirm(false)

            if(!res.ok){
                throw new Error(`FAILED TO DELETE`)
                setIsError(true)
            }
           
             router.refresh()
            

            setTimeout(() => {
               setShowResults(false)
            }, 2000)

            
            }catch(error){
                setUiPhotos(previousPhotos)
              console.log(error)
              setIsError(true)
            }
       
    }

      async function handleRemove(id: number){
        
        setUiPhotos(prev => prev.filter(photo => photo.id !== id))
        
        try{
           
            const res = await fetch(`/api/photos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!res.ok){
                throw new Error(`Failed to Delete: ${res.statusText}`)
                
            }

            router.refresh()

        }catch(error){
            setIsError(true)
            console.log(error)
            setUiPhotos(previousPhotos)
        }
    }

     async function handleRestore(id: number){
       setUiPhotos(prev => prev.filter(photo => photo.id !== id))
       setShowRestore(true)
      try{

        const res = await fetch(`/api/photos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!res.ok){
            throw new Error(`Failed to restore!`)
            return;
        }

        

        setTimeout(() => {
            setShowRestore(false)
        }, 2000)

        router.refresh()

      }catch(error){
         setUiPhotos(previousPhotos)
      }
   }

   useEffect(() => {
    setUiPhotos(photos)
   }, [photos])


    return(
         <section className={styles.trash_container}>

           <BinHeader 
           showResults={showResults}
           confirm={confirm}
           isPending={isPending}
           onConfirm={(value: boolean) => setConfirm(value)}
           handleWipe={handleDelete} 
           photos={uiPhotos}/>

        

           <div className={styles.advice}>
            <p>Items in Trash are deleted after 30 days. Restore them any time before then</p>
           </div>

              {isError && <ErrorBox>Failed to delete photos. Please refresh site and try again</ErrorBox>}

           <BinGrid handleRestore={handleRestore} 
           handleRemove={handleRemove}
            photos={uiPhotos}/>
           
          {uiPhotos.length === 0 && <NoTrash />}

          {showRestore && <div className={styles.complete_notification}>
            <p>✅Image Restored</p>
             </div>}
        </section>
    )
}