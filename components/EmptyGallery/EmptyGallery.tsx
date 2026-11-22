"use client"
import styles from './emptyGallery.module.css'
import icon from '../../public/photos-vault-stacked-photos.svg'
import { redirect } from 'next/navigation'

export default function EmptyGallery(){
    
    function handleRedirect(){
       return redirect('/upload')
    }
    return (
         <div className={styles.empty_container}>
          <img src={icon.src} />
          <h3>
           Your library is empty
          </h3>
          <p>Upload photos to start building your library</p>
          <button onClick={handleRedirect}  className={styles.add_button}>
            Upload
          </button>
        </div>
    )
}