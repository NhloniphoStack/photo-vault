import Link from 'next/link'
import styles from './sideBar.module.css'
import logo from '../../public/photos-vault-icon.svg'
import type { Ref } from 'react'
import { FaXmark } from 'react-icons/fa6'
export default function SideBar({ref, handleClose}: {
   ref: Ref<HTMLDivElement> | undefined
   handleClose: () => void
}){
    return (
        <div ref={ref} className={styles.sidebar}>
            <div className={styles.logo}>
               <img src={logo.src} />
               <h4>Photo Vault</h4>
            </div>
            <ul className={styles.side_list}>
             <li>
                <Link href="/gallery">Photos</Link>
             </li>

             <li>
                <Link href="/gallery/album">Albums</Link>
             </li>

             <li>
                <Link href="/galley/trash">Trash</Link>
             </li>
            </ul>
            <button onClick={handleClose} className={styles.close_button}>
                <FaXmark />
            </button>
        </div>
    )
}