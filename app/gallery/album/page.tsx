import styles from './album.module.css'
import NoAlbum from '@/components/NoAlbum/NoAlbum'
import AlbumModal from '@/components/AlbumModal/AlbumModal'
import AlbumClient from '@/components/AlbumClient/AlbumClient'
import { getAllAlbums } from '@/lib/album'
import { getSession } from '@/lib/get-session'
import { redirect } from 'next/navigation'

export default async function AlbumPage(){
     const albums = await getAllAlbums()
    
     const session = await getSession()
     if(!session){
          return redirect('/login')
     }
    

    return(
         <AlbumClient albums={albums}/>
    )
}