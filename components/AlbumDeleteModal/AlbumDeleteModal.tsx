import styles from './albumDeleteModal.module.css'

export default function AlbumDeleteModal({handleToggle, handleDeleleAlbum} : {
    handleToggle: () => void
    handleDeleleAlbum: () => void
}){
    return (
       <section className={styles.overlay}>


         <div className={styles.delete_modal}>
            <h3>
                Delete Album?
            </h3>
            <p>Summer trip will be deleted </p>
            <p>Your photos will stay in your library</p>
            <div className={styles.button_container}>
                <button onClick={handleToggle} className={styles.cancel_button}>
                    Cancel
                </button>
                <button onClick={handleDeleleAlbum} className={styles.delete_button}>
                    Delete album
                </button>
            </div>
        </div>

       </section>
    )
}