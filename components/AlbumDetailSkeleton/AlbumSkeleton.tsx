import styles from './albumDetailSkeleton.module.css'

import SkeletonGrid from '../SkeletonGrid/SkeletonGrid'
export default function AlbumSkeleton(){
    return (
        <section className={styles.container}>
         <div className={styles.header}>
            <div className={styles.heading}>
            <div className={styles.arrow}></div>

            <div className={styles.title_quantity}>
                <div className={styles.title}></div>
                <div className={styles.sub_title}></div>
            </div>
            </div>

            <div className={styles.buttons}>
            <div className={styles.button}></div>
            <div className={styles.button}></div>
            </div>
         </div>

        <br /> 
        <SkeletonGrid count={5}/>
        </section>
    )
}