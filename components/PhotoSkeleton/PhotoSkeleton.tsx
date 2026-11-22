import styles from './photoSkeleton.module.css'

export default function PhotoSkeleton(){
    return (
        <div className={styles.card_skeleton}>
            <div className={styles.photo_skeleton}></div>
        </div>
    )
}