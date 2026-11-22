import styles from './addPhotosModal.module.css'
import { FaXmark } from 'react-icons/fa6'
import photo1 from '../../public/pexels-helloaesthe-12526519.jpg'
import type { Photo } from '../PhotoViewer/PhotoViewer'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import icon from '../../public/photos-vault-stacked-photos.svg'
export default function AddPhotosModal({photos, handleClose, handleAdd, handleSelect, selectedPhotos}: {
    photos: Photo[]
    handleClose: () => void
    handleAdd: () => void
    handleSelect: (id: number) => void
    selectedPhotos: number[]
}){

   
    

     const active = {
        border: '2px solid rgb(35, 93, 201)'
     }


    return (
        <section className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.heading_text}>
                          <h3>Add photos</h3>
                          <span>to summer trip</span>
                    </div>
                    
                     <button onClick={handleClose} className={styles.close_button}>
                        <FaXmark color='grey'/>
                     </button>
                </div>

                {photos.length === 0 && 
                
                <div className={styles.empty_container}>
                    <img className={styles.icon} src={icon.src} />
                    <h4>No photos to add</h4>
                    <p>Upload photos to your library then add them to the album</p>
                    <button onClick={() => redirect('/upload')} className={styles.upload_button}>
                        Upload Photos
                    </button>
                </div>}
              
               <div className={styles.card_grid}>

                {photos.map(photo => 
                     <div  onClick={() => handleSelect(Number(photo.id))} key={photo.id} className={styles.card}>
                    
                    <img style={selectedPhotos.includes(Number(photo.id)) ? active : {}} className={styles.photo} src={photo.image_url} />

                </div>)}
          
               </div>

                <div className={styles.modal_footer}>
                <div className={styles.selected_notice}>
                    <p>{selectedPhotos.length} selected</p>
                </div>

                <div>
                    <button onClick={handleAdd} className={styles.add_button}>
                        Add {selectedPhotos.length} {selectedPhotos.length > 1 ? 'photos': 'photo'}
                    </button>
                </div>
             
                </div>
              </div>
        </section>
    )
}