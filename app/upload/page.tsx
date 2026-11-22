
import { getSession } from '@/lib/get-session'
import UploadClient from '@/components/UploadClient/UploadClient'
import { redirect } from 'next/navigation'

export default async function UploadPage(){
    const session = await getSession()

    if(!session){
        return redirect('/login')
    }

       return(
             <UploadClient  session={session}/>
       )
}