"use client"
import ErrorUi from "@/components/ErrorUi/ErrorUi"

export default function ErrorPage({error, retry} : {
    error: unknown,
    retry: () => void
}){
    return (
        <section >
            <ErrorUi title="We couldn't load your photo" 
            retry={retry}/>
        </section>
    )
}