import NoTrash from "@/components/NoTrash/NoTrash"
import styles from './trash.module.css'
import { getBin } from "@/lib/photos"
import BinGrid from "@/components/BinGrid/BinGrid"
import BinHeader from "@/components/BinHeader/BinHeader"
import BinClient from "@/components/BinClient/BinClient"
export default async function TrashPage(){
    const photos = await getBin()
    console.log(photos)
    return (
         <BinClient photos={photos}/>
    )
}