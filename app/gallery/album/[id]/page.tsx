import styles from './page.module.css'
import AlbumDetails from '@/components/AlbumDetails/AlbumDetails'
import { getAllPhotos } from '@/lib/photos'
import { getAlbumById, getAlbumDetailsById } from '@/lib/album'
import { getSession } from '@/lib/get-session'
import { notFound, redirect } from 'next/navigation'

export default async function AlbumDetailPage({params} : {
    params: Promise<{id: string}>
}){
      const session = await getSession()
       if(!session){
       return  redirect('/login');
      }


       const {id} = await params

       if(!id){
        return notFound()
       }

      let albumId = Number(id)
   

      const albumPhotos = await getAlbumById(albumId)

      const details = await getAlbumDetailsById(albumId)
      
    
  
      const photos = await getAllPhotos()
    return (
        <AlbumDetails albumPhotos={albumPhotos} details={details} photos={photos}/>
    )
}