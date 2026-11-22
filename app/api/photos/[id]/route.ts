import { deletePhoto } from "@/lib/photos";
import { restorePhoto } from "@/lib/photos";


export async function DELETE(request: Request ,{params}: { params: Promise<{id: string}>}){
    
    const {id} = await params
    
     if(!id){
        console.log("missing id")
        throw new Error(`Missing params`)
        return;
     }

     let photoId = Number(id);

     if(Number.isNaN(photoId)){
        
        throw new Error(`Id is not a valid number!`)
        return;
     }

    try{

        await deletePhoto(photoId)

        return Response.json({message: 'photo deleted'})

    }catch(error){
        console.log(error)
     throw new Error(`Id is not a valid number!`)
    }


    
}


export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}){
        const {id} = await params
    
     if(!id){
        console.log("missing id")
        throw new Error(`Missing params`)
        return;
     }

     let photoId = Number(id);

     if(Number.isNaN(photoId)){
        
        throw new Error(`Id is not a valid number!`)
        return;
     }

    try{
 
         await restorePhoto(photoId)

        return Response.json({message: 'photo restored'})

    }catch(error){
        console.log(error)
     throw new Error(`Id is not a valid number!`)
    }
}