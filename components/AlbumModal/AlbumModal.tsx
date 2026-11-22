"use client"
import Form from 'next/form'
import styles from './albumModal.module.css'



export default function AlbumModal({onClick, handleAdd}: { 
    onClick: () => void
    handleAdd: (formData: FormData) => void
}){


    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        const formData =  new FormData(e.currentTarget)
        handleAdd(formData)
        
    }

  
    return (
       <section className={styles.overlay}>
        <form onSubmit={handleSubmit}>

             <div className={styles.new_album_container}>
            <h3>New Album</h3>
            <label>Album name</label>
            <input name="name" placeholder='e.g Summer trip' autoComplete='off'/>
            <span>
                Give it a name you'll remember
            </span>
            <div  className={styles.button_container}>
                <button type='button' onClick={onClick} className={styles.cancel_button}>
                    Cancel
                </button>
                <button className={styles.create_button}>
                    Create
                </button>
            </div>
        </div>

        </form>
       
       </section>
    )
}