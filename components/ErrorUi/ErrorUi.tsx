import { title } from 'process'
import styles from './errorUi.module.css'

export default function ErrorUi({retry, title}: {
    retry: () => void
    title: string
}){


    return(
        <section className={styles.container}>
                <div className={styles.error_container}>
            <div className={styles.icon_container}>
                   <span className={styles.icon}>
                      !
                  </span>
            </div>
            

            <h4>
               {title}
            </h4>
            <p>Check your connection and try again. Your photos are still safe</p>
            <button onClick={() => retry()} className={styles.retry_button}>
                Try again
            </button>
              </div>
        </section>
        

    )
}