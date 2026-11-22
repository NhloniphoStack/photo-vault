import NotFoundUi from "@/components/NotFoundUi/NotFoundUi"
import styles from './page.module.css'

export default function NotFound(){
    return(
        <section className={styles.not_found_section}>
            <NotFoundUi />
        </section>
    )
}