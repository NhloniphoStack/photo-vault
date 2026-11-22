"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import photo1 from '../public/pexels-burst-374871.jpg'
import photo2 from '../public/pexels-burst-545014.jpg'
import photo3 from '../public/pexels-cottonbro-3777933.jpg'
import photo4 from '../public/pexels-solodsha-9008988.jpg'
import photo5 from '../public/pexels-lilartsy-2748052.jpg'


export default function Home() {
  
  return (
    <main className={styles.home_container}>
     
      <p className={styles.slogan}>
        Your photos,
        <span className={styles.blue_style}> 
        beautifully organized
        </span>
      </p>

      <p className={styles.overview}>
        A home for every memory.
         Backup your photos automatically, search them in 
         seconds, and relive the moments that matter in one place
      </p>
      <div className={styles.nav_links}>
          <Link id={styles.signup_link} href="/signup">
          Get started 
          </Link>

          <Link id={styles.about_link} href="/about">
          Learn more
          </Link>

      </div>
      <div className={styles.showcase_container}>
        <p className={styles.phrase}>
          All your memories in one place
        </p>
        <div className={styles.gallery}>
          <div className={styles.image_card}>
            <Image alt="photo" src={photo1} />
            <div className={styles.content}>
               <p>Summer 2024</p>
            </div>
            
          </div>

           <div className={styles.image_card}>
            <Image alt="photo" src={photo2} />
            <div className={styles.content}>
               <p>Weekend 2024</p>
            </div>

            
            
          </div>

          <div className={styles.image_card}>
            <Image alt="photo" src={photo3} />
            <div className={styles.content}>
               <p>Happy times</p>
            </div>

            
            
          </div>

          <div className={styles.image_card}>
            <Image alt="photo" src={photo4} />
            <div className={styles.content}>
               <p>Summer times</p>
            </div>
          </div>

           <div className={styles.image_card}>
            <Image alt="photo" src={photo5} />
            <div className={styles.content}>
               <p>Nolstagia</p>
            </div>
          </div>


        </div>
      </div>
      
    </main>
  )
}
