import SkeletonGrid from "@/components/SkeletonGrid/SkeletonGrid"
import styles from './gallery.module.css'

export default function LoadingPage(){
    return (
         <section className={styles.gallery_container}>
          
            <SkeletonGrid count={6}/>
         </section>
    )
}