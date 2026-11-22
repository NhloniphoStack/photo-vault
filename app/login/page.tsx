"use client"
import { useState, useTransition } from 'react'
import styles from './login.module.css'
import Form from 'next/form'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

export default function Login(){
  const [error, setError] = useState<{error: string | undefined} | null>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  async function handleSubmit(formData: FormData){
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim()
    
    startTransition(async () => {
                   if(!password || !email){
      setIsError(true)
      setError({error: 'All fields are required'})
      return;
    }

    const {error} = await authClient.signIn.email({
      email: email as string,
      password: password as string,
    })

   

    if(error){
      setIsError(true)
      setError({error: error.message || 'Failed to Login'})
      setIsLoading(false)
      return;
    }

     setIsLoading(false)
     router.refresh()
    return  router.push('/')
    })
    
  }
    return (
        <section className={styles.login_container}>
            <Form action={handleSubmit}>
                <div className={styles.login_form}>
                    <div className={styles.login_heading}>
                          <h3 className={styles.site_name}>
                        Photo Vault
                          </h3>
                          <p id={styles.text}>
                          Your memories, beautifully organized
                          </p>
                    </div>
                      

                      <label>Email address</label>
                      <input type='email' name="email" placeholder='you@example.com' autoComplete='off'/>

                      <label>Password</label>
                      <input name="password" placeholder='Enter your password' autoComplete='off'/>
                     {isError && <div className={styles.error_container}>
                        <p>{error ? error.error : 'Failed to login. Please try again'}</p>
                      </div>}
                      <button disabled={isPending} className={styles.login_button}>
                        {isPending ? <ClipLoader size={16} color='white'/>: 'Login'}
                      </button>
                </div>
            </Form>
        </section>
    )
}