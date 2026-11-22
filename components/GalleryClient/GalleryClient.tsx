import styles from './galleryClient.module.css'
import type { Photo } from '../PhotoViewer/PhotoViewer'
import { Suspense } from 'react'
import SkeletonGrid from '../SkeletonGrid/SkeletonGrid'

import PhotoGallery from '../PhotoGallery/PhotoGallery'
import EmptyGallery from '../EmptyGallery/EmptyGallery'
export default function GalleryClient({photos}: {
    photos: Photo[]
}){
    return (
            <section className={styles.gallery_container}>
                  <div className={styles.heading}>
                        <h3 className={styles.header}>All photos</h3>
                        <p>{photos.length} {photos.length > 1 ? "photos" : "photo"}</p>
                  </div>
                 <Suspense fallback={<SkeletonGrid count={5}/>}>

                       

                   <PhotoGallery photos={photos}/>   

                   {photos.length === 0 && <EmptyGallery />}
                    

                 </Suspense>
                 
            </section>
    )
}