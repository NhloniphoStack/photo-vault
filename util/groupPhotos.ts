import type { Photo } from "@/components/PhotoViewer/PhotoViewer";


export default function groupPhotos(photos: Photo[]){

    const groups = new Map<string, Photo[]>()


    photos.forEach(photo => {
        const date = new Date(photo.created_at)

        const key = date.toLocaleDateString("en-CA")

        if(!groups.has(key)){
            groups.set(key, [])
        }

        groups.get(key)!.push(photo)
    });

    return groups

}