"use client"
import Form from "next/form";
import styles from './signup.module.css'
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
export default function SignupPage(){
    const [error, setError] = useState<{error: string | undefined} | null>(null)
    const [isError, setIsError] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
     const router = useRouter()
   async function handleSubmit(formData: FormData){
      const name = formData.get('name')?.toString().trim();
      const email = formData.get("email")?.toString().trim();
     
      const password = formData.get("password")?.toString().trim();
      console.log(name, email, password)
       setIsLoading(true)
      if(!name || !email || !password){
        setIsError(true)
        setIsLoading(false)
        setError({error: "All fields are required"})
        return;
      }

     

      const {error} = await authClient.signUp.email({
        name: name as string,
        email: email as string,
        password: password as string
      })

      setIsLoading(false)

      if(error){
        console.log(error)
        setIsError(true);
        setError({error: error.message})
        return;
      }

      return router.push('/')

    }
    return (
        <section className={styles.signup_container}>
            <Form action={handleSubmit}>
                <div className={styles.signup_form}>
                      <div className={styles.signup_heading}>
                          <h3 className={styles.header}>
                        Create your account
                          </h3>
                          <p id={styles.text}>
                          Your memories, beautifully organized
                          </p>
                    </div>
                      
                      <label>Full name</label>
                      <input name='name' placeholder='John Doe'/>

                      <label>Email address</label>
                      <input type="email" name="email" placeholder='you@example.com'/>

                      <label>Password</label>
                      <input type="password" name="password" placeholder='Enter your password'/>
                     {isError && <div className={styles.error_container}>
                        <p>{error ? error.error : 'Failed to create an account. Please try again'}</p>
                      </div>}
                      <button disabled={isLoading} className={styles.signup_button}>
                        {isLoading ? <ClipLoader color="white" size={17}/> : 'Create account'}
                      </button>
                </div>
            </Form>
        </section>
    )
}