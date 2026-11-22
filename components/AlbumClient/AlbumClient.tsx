"use client"
import NoAlbum from "../NoAlbum/NoAlbum"
import styles from './albumClient.module.css'
import { useState, useEffect } from "react"
import { FaRegImages, FaPlus } from "react-icons/fa6"
import AlbumModal from "../AlbumModal/AlbumModal"
import { useRouter } from "next/navigation";
import ConditionalLink from "../ConditionalLink/ConditionalLink"
import getDateLabel from '@/util/getDateLabel'
export type Album = {
    id: number
    total_photos: number
    created_at: string
    name: string
    isOptimistic?: boolean
    sample_image_url: string
}
export default function AlbumClient({albums}: {
    albums: Album[]
}){
    const [showModal, setShowModal]= useState(false)
    const prevAlbums = albums
    
    const [uiAlbum, setUiAlbum] = useState<Album[]>(albums)
    
     
    const router = useRouter()

    useEffect(() => {
        setUiAlbum(albums)
    }, [albums])


     async function handleAdd(formData: FormData){
   
    const name = formData.get("name")?.toString().trim()

   if(!name) return;

    const newAlbum = {
        name: name, 
        id: Date.now(),
        total_photos: 0,
        isOptimistic: true,
        sample_image_url: "",
        created_at: new Date().toISOString(),

    }

     setUiAlbum((prev) => [...prev, newAlbum])
     setShowModal(false)
       try{
         
        const res = await fetch('/api/album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
       })

       if(!res.ok){
        throw new Error(`FAILED TO ADD: ${res.statusText}`)
        return;
       }
        router.refresh()
        

       }catch(error){
        setUiAlbum(prevAlbums)
           console.log(error)
       }
    }

    function handleClick(){
        setShowModal(prev => !prev)
    }

    function loadText(num: number){

        if(num > 1){
            return 'photos'
        }else{
            return 'photo'
        }

    }
    return (
        <section className={styles.album_container}>
        <div>
            <h2>
                Albums
            </h2>
        </div>
        {uiAlbum.length > 0 && <div className={styles.card_layout}>
            {uiAlbum?.map(album =>
          
            <div className={styles.card} key={album.id}>
                  <ConditionalLink disabled={album.isOptimistic} href={`/gallery/album/${album.id}`}>
                {album.total_photos === 0 ? <div className={styles.thumbnail}>
                  <div className={styles.icon}>
                       <FaRegImages size={23} color="#1A73E7"/>
                  </div>
                   <p>No photos yet</p>
  
                </div> :
                 <div className={styles.thumbnail}>
                    <img className={styles.thumbnail} src={album.sample_image_url} />
                    </div>}
                </ConditionalLink>
                <div className={styles.content}>
                 <h5>{album.name}</h5>
                <div>
                    <span>{album.total_photos} {loadText(album.total_photos)} • </span>
                    <span>{getDateLabel(album.created_at)}</span>
                </div>
                </div>

        

            </div>)}

            <div className={styles.add_card}>
                <button onClick={handleClick}>
                    <FaPlus color="#1A73E7"/>
                </button>
                <p>New album</p>
            </div>
        </div>}
         {uiAlbum.length === 0 && <NoAlbum showModal={showModal} handleClick={handleClick} handleAdd={handleAdd}/>}
         {showModal && <AlbumModal onClick={handleClick} handleAdd={handleAdd}/>}
        </section>
    )
}