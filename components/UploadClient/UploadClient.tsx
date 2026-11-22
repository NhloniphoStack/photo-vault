"use client"
import styles from './uploadClient.module.css'
import arrow from '../../public/arrow.svg'
import Image from 'next/image'
import { authClient } from '@/lib/auth-client'
import { useRouter, redirect } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react'
import Form from 'next/form'
import { ClipLoader } from 'react-spinners'
import tick from '../../public/tick.svg'
import Link from 'next/link'
import type { Session } from '@/lib/auth'

export default function UploadClient({session} : {
    session: Session | null
}){
     const [isLoading, startTransition] = useTransition()
    
    
    const [file, setFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage]  = useState("")
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null) 
    const [showResults, setShowResults] = useState(false)
    const [attempt, setAttempt] = useState(false)
    const router = useRouter()

    

    const inputRef = useRef<HTMLInputElement>(null)

    function handleClick(){
         if(inputRef.current){
            inputRef.current.click()
         }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
         const files = e.target.files
         setAttempt(true)
         if(files && files.length > 0){
               setFile(files[0])
              
         }else{
            setAttempt(false)
         }
         
         
    }

    useEffect(() => {
        
    })

    useEffect(() => {
       
        if(file){
            const previewUrl = URL.createObjectURL(file)
            console.log(previewUrl)
            setPreviewImage(previewUrl)
             return (() => {

            URL.revokeObjectURL(previewUrl)

            })
        }

       
    }, [file])

   async function handleUpload(formData: FormData){
   
    
    setIsError(false)
       
     if(file){ 
              formData.append("image", file)
       }
       
       startTransition(async() => {


        try{
              const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
                
              })

              if(!res.ok){
                throw new Error(`Failed to upload: ${res.statusText}`)
              }

              setShowResults(true)

            


        }catch(error){
          
          setIsError(true)
        }

       })
    }
    function LoadButtonText(){
        if(isLoading){
            return <ClipLoader size={18} color='white'/>
        }else if(showResults){
            return 'Upload again'
        }else if(isError){
            'Try again'
        }else{
            return 'Upload'
        }
    }

    function handleReset(){
         setFile(null);
         setPreviewImage("");
         setIsError(false);
         setShowResults(false)
         setAttempt(false)
    }

    function handleRedirect(){
        return router.push("/gallery")
    }
    return (
        <section className={styles.upload_container}>
            <Form action={handleUpload}>
            <div className={styles.upload_layout}>
                       <div >
                <h4>Upload photo</h4>
                <p>Choose a photo to upload to your library</p>

               {!attempt && <div onClick={handleClick} className={styles.drop_zone}>
                 <Image className={styles.arrow_icon} alt='arrow' src={arrow} />
                 <h4>Choose a photo</h4>
                 <p>JPG, PNG or HEIC</p>
                 <button type='button' className={styles.file_button}>
                    Choose files
                 </button>
                </div>}
                <input name="image"  onChange={handleChange} ref={inputRef}  type="file" hidden/>
            </div>
           {attempt && <div className={styles['photo-preview']}>
               {previewImage.length > 0 && <img alt='photo' src={previewImage ? previewImage : undefined} />}
               {file && !isLoading && !showResults &&
               <div className={styles.small_preview}>
                <div className={styles.metadata}>
                        <div>
                            <img src={previewImage ? previewImage : undefined} />
                        </div>
                        
                        <div className={styles.info}>
                            <h5 id={styles.file_name}>{file.name}</h5>
                            <p>3.5 MB</p>
                        </div>
               </div>
              
               <button type='button' onClick={handleClick} className={styles.change_button}>
                 Change photo
               </button>
               </div>
               }
              {isError && <div className={styles.error_container}>
                <p>Upload failed. Check your connection and try again</p>
               </div>}
               
              {isLoading && <div className={styles.pending_container}>
                      <div className={styles.loading_container}>

                    <div className={styles.progress_bar}>
                    </div>

                    <div className={styles.uploading_text}>
                        <p>Uploading...</p>
                    </div>

               </div>
               </div>}
               
               {showResults && <div className={styles.results_container}>
                <div className={styles.results_layout}>
                    
                    <p>
                        <strong>Uploaded</strong>. You can view the image in your <Link href="/gallery">library</Link>
                        
                     </p>
                </div>
              
               </div>}
                

              {file && !showResults &&  <div className={styles.button_container}>
                <button disabled={isLoading}  className={styles.upload_button}>

                   {LoadButtonText()}
                </button>
               </div>}

               {showResults && <div className={styles.results_buttons}>
                <button type='button' onClick={handleReset} className={styles.another_button}>
                    Upload another
                </button>

                 <button type='button' onClick={handleRedirect} className={styles.view_button}>
                    View photos
                </button>
               </div>}
               
            </div>}
            </div>
           </Form>
        </section>
    )
}