"use client"
import styles from './accountList.module.css'
import { useState, useTransition } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import SignOutBox from '../SignOutBox/SignOutBox'

export default function AccountList(){
    const [showMenu, setShowMenu] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const {data: session, isPending} = authClient.useSession()
     const router = useRouter()
    function handleToggle(){
        setShowMenu(prev => !prev)
    }
    const menuRef = useClickOutside(() => {
            setShowMenu(false)
        })

    function handleLogout(){
         startTransition(async() => {
        
                     const {error} = await authClient.signOut();
        
              if(error){
                throw new Error(error.message)
                return;
              }
              setShowMenu(false)
              router.refresh()
              router.push('/login')
        
                })
    }
    return (
        <>
        <div className={styles.account}>
                            <div onClick={handleToggle} className={styles.account_icon_container}>
                            <span className={styles.avatar}>{session?.user.name[0]}</span>
                            </div>

                            {showMenu && <div ref={menuRef} className={styles.menu}>
                                <ul>
                                    <li>
                                        <button onClick={handleLogout} className={styles.logout_button}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>}
        </div>
       {isLoading && <SignOutBox />}
        </>
    )
}