"use client"
import styles from './noAlbum.module.css'
import { FaPlus, FaMagic } from 'react-icons/fa'
import AlbumModal from '../AlbumModal/AlbumModal'
import { useState } from 'react'
export default function NoAlbum({handleAdd, handleClick, showModal}: {
  handleAdd: (formData: FormData) => void
  handleClick: () => void
  showModal: boolean
}){

    

    

    return (
        <>
        <div className={styles.empty_container}>
          <h2>
            No albums yet
          </h2>
          <p>
            Albums help you group photos around people,
             places, and moments. Create your first one to get started
          </p>
          <div className={styles.button_container}>
            <button onClick={handleClick}  className={styles.create_button}>
              <FaPlus color='white'/>
              Create your first album
          </button>

          </div>

          
          
        </div>

       {showModal && <AlbumModal handleAdd={handleAdd} onClick={handleClick}/>}
        </>
    )
}