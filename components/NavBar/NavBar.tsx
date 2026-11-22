
import styles from './navBar.module.css'
import logo from '../../public/photos-vault-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { getSession } from '@/lib/get-session'
import AccountList from '../AccountList/AccountList'
import { FaBars } from 'react-icons/fa6'
import SideBar from '../SideBar/SideBar'

import NavUi from '../NavUI/NavUi'


export default async function NavBar(){
   
    const session = await getSession()
    

  
    return (
        
         <NavUi session={session}/>
    )
}