
import { getSession } from "@/lib/get-session"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import styles from './gallery.module.css'
import photo1 from '../../public/pexels-helloaesthe-12526519.jpg'
import photo2 from '../../public/pexels-lilartsy-2748052.jpg'
import photo3 from '../../public/pexels-cottonbro-3777933.jpg'
import PhotoSkeleton from "@/components/PhotoSkeleton/PhotoSkeleton"
import SkeletonGrid from "@/components/SkeletonGrid/SkeletonGrid"
import { getAllPhotos } from "@/lib/photos"
import Router from "next/navigation"
import Link from "next/link"
import tick from '../../public/tick-svgrepo-com.svg'
import PhotoCard from "@/components/PhotoCard/PhotoCard"
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid"
import GalleryClient from "@/components/GalleryClient/GalleryClient"

export default async function GalleryPage(){
    
    const session = await getSession()
    if(!session){
       return redirect('/login')
       
    }
    const photos = await getAllPhotos()
    
    return (
             
          <GalleryClient photos={photos}/>
        
    )
}