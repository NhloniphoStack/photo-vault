"use client"
import styles from './navUi.module.css'
import Image from 'next/image'
import logo from '../../public/photos-vault-icon.svg'
import Link from 'next/link'
import AccountList from '../AccountList/AccountList'
import { FaBars } from 'react-icons/fa6'
import SideBar from '../SideBar/SideBar'
import type { Session } from '../../lib/auth'
import { useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'

export default function NavUi({session} : {
    session: Session | null
}){
    const [showPanel, setShowPanel] = useState(false)
    function handleToggle(){
        setShowPanel(prev => !prev)
    }

     const menuRef = useClickOutside(() => {
        setShowPanel(false)
     })

     
    return(
         <>
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                <Image 
                className={styles['logo-icon']}
                alt='logo' src={logo} />
                <p className={styles.site_name}>Photo Vault</p>
                </Link>
            </div> 
            <nav >
                <ul className={styles.nav_list}>
                   {!session && <li>
                        <Link href="/signup"  className={styles.signup_button}>
                        Create account
                        </Link>
                    </li>}

                   {!session && <li>
                       <Link className={styles.login_nav} href='/login'>Login</Link>
                    </li>}

                     {session && 
                     <li>
                        <Link className={styles.gallery_nav} href="/gallery">Gallery</Link>
                    </li>}

                    {session && 
                     <li>
                        <Link className={styles.upload_nav} href="/upload">Upload</Link>
                    </li>}

                   

                   {session && <li>
                       <AccountList />
                        
                    </li>}

                    

                   
                </ul>

                <ul className={styles.mobile_list}>

                    <li>
                        <button onClick={handleToggle} className={styles.menu_button}>
                               <FaBars />
                        </button>
                    </li>

                </ul>
            </nav>  
        </header>
       {showPanel && <SideBar handleClose={handleToggle} ref={menuRef}/>}
        </>
    )
}