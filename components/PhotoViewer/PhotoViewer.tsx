"use client"
import styles from './photoViewer.module.css'
import photo1 from '../../public/pexels-helloaesthe-12526519.jpg'
import photo2 from '../../public/pexels-cottonbro-3777933.jpg'
import heart from '../../public/heart.svg'
import { Ref, RefObject, useState } from 'react'
import { useRouter, redirect } from 'next/navigation'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'

export type Photo = {
            id: number | undefined
         image_url: string
          user_id: string
         name: string
         created_at: string
         is_favorite: boolean
}

export default function PhotoViewer({photo} : { 
    photo: Photo
   
}){
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const menuRef = useClickOutside(() => {
        router.push('..')
    })

   
    
    return (
        <>
        <div   className={styles.viewer}>
            <Link href="/gallery" className={styles.close_button}>
                &times;
            </Link>
            
            <div ref={menuRef as RefObject<HTMLDivElement | null>} className={styles.viewer_container}>
                   <img alt={photo.name}  className={styles.image}  src={photo.image_url}  />  
             <div className={styles.lightbox_container}>
                
                 <div className={styles.lightbox}>
                
                
                
            </div>
             </div>
            </div>
           
             
            <div className={styles.caption_container}>
                <p className={styles.caption}>{photo.name}</p> 
            </div>
             
               
        </div>
        </>
    )
}