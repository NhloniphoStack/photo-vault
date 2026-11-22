import styles from './emptyAlbum.module.css'
import icon from '../../public/photos-vault-stacked-photos.svg'
export default function EmptyAlbum({handleToggle}: {
    handleToggle: () => void
}){
    return (
        <div className={styles.empty_container}>
          <img src={icon.src} />
          <h3>
            Add photos to this album
          </h3>
          <p>Choose photos from your library</p>
          <button onClick={handleToggle} className={styles.add_button}>
            Add photos
          </button>
        </div>
    )
}