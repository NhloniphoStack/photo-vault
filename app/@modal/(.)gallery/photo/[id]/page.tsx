import { notFound } from 'next/navigation'
import styles from './page.module.css'
import PhotoViewer from '@/components/PhotoViewer/PhotoViewer'
import { getPhotoById } from '@/lib/photos'
export default async function PhotoModal({params}: {
    params: Promise<{id: string}>
}){
    
     const {id} = await params

     if(!id){
        return notFound()
     }

     let photoID;

     photoID = Number(id)

     const photo = await getPhotoById(photoID)
     
  
    return (
        <>
        <PhotoViewer  photo={photo}/>
        </>
        
    )
}