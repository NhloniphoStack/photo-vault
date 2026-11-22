import PhotoViewer from "@/components/PhotoViewer/PhotoViewer"
import { getPhotoById } from "@/lib/photos"
import { notFound, redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
export default async function PhotoViewPage({params}: {
    params: Promise<{id: string}>}
){

    const session = await getSession()

    if(!session){
        redirect('/login')
    }

    const {id} = await params

   

    if(!id){
      return  notFound()
    }

    let photoID ;
    
     photoID = Number(id)


    const photo = await getPhotoById(photoID)
 

    console.log(photo)


    return(
        <PhotoViewer   photo={photo}/>
    )
}