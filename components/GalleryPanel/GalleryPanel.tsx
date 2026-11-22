"use client"
import Link from "next/link";
import styles from './galleryPanel.module.css'
import NavLink from "../NavLink/NavLink";
import { usePathname } from "next/navigation";
import AlbumModal from "../AlbumModal/AlbumModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Album } from "../AlbumClient/AlbumClient";
import ConditionalLink from "../ConditionalLink/ConditionalLink";
export default function GalleryPanel({albums}: {
    albums: Album[]
}){
    const [showModal, setShowModal] = useState(false)
    const prevAlbums = albums
    const [uiAlbum, setUiAlbum] = useState<Album[]>(albums)
   
    const path = usePathname()
    const router = useRouter()
     let active = {
         backgroundColor: "#E8F0FE",
         borderRadius: "10px",
         fontWeight: "600"
    }

    let activeLink = {
        color: 'var(--theme-color)'
    }

    function handleToggle(){
        setShowModal(prev => !prev)
    }

    

    async function handleAdd(formData: FormData){
   
    const name = formData.get("name")?.toString().trim()

   if(!name) return;

    const newAlbum = {
        name: name, 
        id: Date.now(),
        total_photos: 0,
        sample_image_url: "",
        created_at: new Date().toISOString(),
        isOptimistic: true

    }

     setUiAlbum((prev) => prev ? [...prev, newAlbum] : [newAlbum])
     setShowModal(false)
       try{
         
        const res = await fetch('/api/album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
       })

       if(!res.ok){
        throw new Error(`FAILED TO ADD: ${res.statusText}`)
        return;
       }
        router.refresh()
        

       }catch(error){
       setUiAlbum(prevAlbums)
           console.log(error)
       }
    }
    return (
        <>
        <div className={styles.side_panel}>
            

            <ul className={styles.list}>
                <li style={path === "/gallery" ? active: {}}>
                    <Link style={path === "/gallery" ? activeLink: {}} href="/gallery">Photos</Link>
                </li>

                <li style={path === "/gallery/album" ? active: {}}>
                    <Link style={path === "/gallery/album" ? activeLink: {}} href="/gallery/album">Albums</Link>
                </li>

                <li style={path === "/gallery/trash" ? active: {}}>
                    <Link style={path === "/gallery/trash" ? activeLink: {}} href="/gallery/trash">Trash</Link>
                </li>

                
            </ul>

            <div className={styles.album}>
                <p>ALBUMS</p>
                <ul className={styles.album_list}>
                    {uiAlbum?.map(album =>
                    <li style={path === `/gallery/album/${album.id}` ? active : {}}  key={album.id}>
                      <ConditionalLink disabled={album.isOptimistic} className={styles.links} style={path === `/gallery/album/${album.id}` ? activeLink : {}} href={`/gallery/album/${album.id}`}>{album.name}</ConditionalLink>
                    </li>)}
                    <li>
                        <button onClick={handleToggle} className={styles.new_album_button}>
                           + New album
                        </button>
                    </li>
                </ul>
            </div>
            
        </div>
       {showModal && <AlbumModal handleAdd={handleAdd} onClick={handleToggle} />}
        </>
    )
}