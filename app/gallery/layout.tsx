import { ReactNode } from "react"
import GalleryPanel from "@/components/GalleryPanel/GalleryPanel"
import styles from './gallery.module.css'
import { getAllAlbums } from "@/lib/album"
import { getSession } from "@/lib/get-session"
export default async function GalleryLayout({children}: { 
    children: ReactNode
}){
    const session = await getSession()
    const albums = await getAllAlbums()
   

    return (
        <main className={styles.gallery_main}>
      {session &&  <GalleryPanel albums={albums}/>}
        {children}
        </main>
    )
}