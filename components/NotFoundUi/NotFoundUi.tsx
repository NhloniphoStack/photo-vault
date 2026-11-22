"use client"
import { redirect } from 'next/navigation'
import styles from './notFoundUi.module.css'
import { MdBrokenImage } from 'react-icons/md'
export default function NotFoundUi(){

    function handleRedirect(){
        return redirect('/')
    }
    return (
        <div className={styles.not_found_container}>
            <MdBrokenImage size={110} color='#1c6cd4'/>
            <span>ERROR 404</span>
            <h2>The page doesn't exist </h2>
            <p>The link may be broken, or the page has moved</p>
            <div>
                <button onClick={handleRedirect} className={styles.home_button}>
                    Go back home
                </button>
            </div>
        </div>
    )
}