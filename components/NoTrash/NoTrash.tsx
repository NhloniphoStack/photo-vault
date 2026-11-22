import styles from './noTrash.module.css'
import bin from '../../public/bin.svg'
export default function NoTrash(){
    return(
        <div className={styles.noTrash_container}>
            <img className={styles.bin} src={bin.src} alt="bin" />
             <h3>
                Trash is empty
             </h3>
             <p>Photos you delete will show up here for 30 days</p>
        </div>
    )
}