import PhotoSkeleton from "../PhotoSkeleton/PhotoSkeleton"
import styles from './skeletonGrid.module.css'
export default function SkeletonGrid({count}: {
    count: number
}){
    return (<>
              <div className={styles.title}></div>
             <div className={styles.grid}>
                {Array.from({length: count}, (_, i) => {
                    return <PhotoSkeleton key={i}/>
                })}
           </div>
            
            </>
           
    )
}