import { ClipLoader } from "react-spinners"
import styles from './signOutBox.module.css'
export default function SignOutBox(){
    return (
        <div  className={styles.logout_state}>
           <ClipLoader color=' #1656a9' size={30}/>
           <h4>Signing you out</h4>
           <p className={styles.sub_title}>Saving your whole last changes. This takes a moment</p>
        </div>
    )
}