"use client"
import styles from './binGrid.module.css'
import bin from '../../public/bin-svgrepo-com.svg'
import type { Photo } from "../PhotoViewer/PhotoViewer"
import restore from '../../public/restore.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function BinGrid({photos, handleRemove, handleRestore} : { 
    photos: Photo[]
    handleRemove: (id: number) => void
    handleRestore: (id:number) => void
}){
  
 

    
    return (
        <div className={styles.delete_card_layout}>

            {photos.toReversed().map((photo, i) =>
          <div key={i} className={styles.delete_card}>
           <img className={styles.delete_photo_card} src={photo.image_url} />
           <div className={styles.content}>
                <button onClick={() => handleRestore(Number(photo.id))} className={styles.restore_button}>
                     <img alt="restore" src={restore.src} />
                </button>
                <button onClick={() => handleRemove(photo.id as number)} className={styles.delete_button}>
                    <img alt="bin" src={bin.src} />
                </button>
           </div>
           </div>)}

           </div>
    )
}