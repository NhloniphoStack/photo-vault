"use client"
import styles from './photoCard.module.css'
import Link from 'next/link'
import tick from '../../public/tick-svgrepo-com.svg'
import type { Photo } from '../PhotoViewer/PhotoViewer'
import { MouseEventHandler, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

export default function PhotoCard({photo, onSelect, isActive, onFavorite, isFavorite} : {
    photo: Photo,
    onSelect: (id: number) => void
    isActive: boolean
     isFavorite?: boolean
    onFavorite: (id: number) => void
    
    
    
   
}){


    const [favorite, setFavorite] = useState(0)
   
    function handleClick(e :React.MouseEvent<HTMLDivElement>){
        e.preventDefault()
       
        e.stopPropagation()
       
        onSelect(photo.id as number)
       
    }

     let active = {
        backgroundColor: " #1A73E7"
     }

     function handleFavorite(e :React.MouseEvent<Element>){
         e.preventDefault()
        console.log("clicked")
        e.stopPropagation()
        onFavorite(photo.id as number)
        
     }
    
    return (

        <div key={photo.id} className={styles.photo_card}>
                        <div  onClick={handleClick}  className={styles.tick}>
                                 <div style={isActive ? active: {}} className={styles.tick_container}>
                                      <img src={tick.src} />
                                 </div>
                        </div>

                        <div className={styles.star}>
                            
                           {isFavorite && <FaHeart  size={16} color="crimson"/>}

                        </div>
                       
                        <Link href={`/gallery/photo/${photo.id}`}>
                        
                        <img className={styles.photo}  src={photo?.image_url} />
                        </Link>
                      </div> 

    )
}