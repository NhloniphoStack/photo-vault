import { tempDelete } from "@/lib/photos";

export async function PATCH(request: Request){
    const {ids} = await request.json()

    if(!ids){
        throw new Error(`Invalid Request`)
        return;
    }

    try{

        await tempDelete(ids)
        
        return Response.json({message: 'Photos moved to trash'})

    }catch(error){
        throw new Error(`ERROR:${error}`)
    }
}