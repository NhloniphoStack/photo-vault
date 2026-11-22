import { deleteAll } from "@/lib/photos";
import { makeFavorite } from "@/lib/photos";

export async function DELETE(request: Request){
//login

try{

    await deleteAll()
    
    return Response.json({message: 'Bin cleared'})

}catch(error){
    console.log(error)
    throw new Error(`ERROR: Failed to do Request!`)
}

   
}


export async function PATCH(request: Request){

    const {ids, isFavorite} = await request.json()
       console.log(ids)

    if(ids.length === 0){
        
       throw new Error('Missing ids request')
    }

    try{

        await makeFavorite({ids: ids, isFavorite: isFavorite})

        return Response.json({message: 'Photos added to favorite'})
        
    }catch(error){
        console.log(error)
        throw new Error(`Failed to favorite: ${error}`)
    }
}