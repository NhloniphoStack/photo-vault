import { ReactNode } from 'react'
import styles from './errorBox.module.css'


export default function ErrorBox({children} : {
    children: ReactNode
}){
    return (
        <div className={styles.error_container}>
                <p>{children}</p>
               </div>
    )
}


