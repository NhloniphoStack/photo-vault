"use client"
import styles from './binHeader.module.css'
import { useState, useTransition } from 'react'
import ConfirmBox from '../ConfirmBox/ConfirmBox'
import { useRouter } from 'next/navigation'
import type { Photo } from '../PhotoViewer/PhotoViewer'
export default function BinHeader({photos, handleWipe, onConfirm, confirm, showResults, isPending}: {
    photos: Photo[]
    handleWipe: () => void
    onConfirm: (prev: boolean) => void
    confirm: boolean
    showResults: boolean
    isPending: boolean
} ){
    
     const router = useRouter()
     
    function handleConfirm(){
      onConfirm(true)
    }

   
    return (
        <>
            <div className={styles.heading}>
                <h2>Trash</h2>
                <button className={styles.delete_button} disabled={photos.length === 0}  onClick={handleConfirm}>
                    
                    Empty trash
                </button>

            </div>
           {confirm &&
           <div className={styles.overlay}>
               <ConfirmBox photos={photos} isPending={isPending} handleDelete={handleWipe} onClick={() => onConfirm(false)}/>
           </div>
            }

             {showResults && <div className={styles.complete_notification}>
            <p>✅Trash emptied. {photos.length} photos were removed</p>
             </div>}
        </>
    )
}