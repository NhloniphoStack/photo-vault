import { useState, useTransition } from 'react'
import styles from './confirmBox.module.css'
import { ClipLoader } from 'react-spinners'
import type { Photo } from '../PhotoViewer/PhotoViewer'
export default function ConfirmBox({onClick, handleDelete, isPending, photos}: {
    onClick: () => void
    handleDelete: () => void
    isPending: boolean
    photos: Photo[]
}){
     
    function loadButtonText(){
        if(isPending){
            return <div className={styles.load}>
                <ClipLoader color='white' size={16}/>
                <p>Emptying bin....</p>
            </div>
        }else{
            return `Empty trash`
        }
    }

   
    return (
       <>
        <div className={styles.confirm_box}>
            <div className={styles.icon}>
               <span>!</span>
            </div>
            
            <h4>Empty trash?</h4>
            <p>
            This will permanetly delele {photos.length} {photos.length > 1 ? 'photos': 'photo'}.
                 You can't undo this
            </p>
            <div className={styles.button_container}>
                <button onClick={onClick} className={styles.cancel_button}>
                    Cancel
                </button>
                <button onClick={handleDelete} className={styles.empty_button}>
                    {loadButtonText()}
                </button>
            </div>
        </div>

       
       </>
    )
}