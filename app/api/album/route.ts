
import { addAlbum } from "@/lib/album";
import { addPhotos } from "@/lib/album";
import { deleteAlbum } from "@/lib/album"


export async function POST(request: Request){
    const {name} = await request.json()

    if(!name){
        throw new Error('Missing request')
        return;
    }
     try{

       await addAlbum(name)

       return Response.json({message: 'Album created'})

     }catch(error){
        console.log(error)
        throw new Error(`Failed to add album: ${error}`)
     }
}


export async function PATCH(request: Request){
  const {ids, album_id} = await request.json()

  if(!ids || !album_id){
    throw new Error('Missing fields')
    return;
  }

  try{

    await addPhotos({ids, album_id})

    return Response.json({message: 'Photos added'})

  }catch(error){
    console.log(error)
    throw new Error(`FAILED: ${error}`)
  }
}





export async function DELETE(request: Request){

    let {album_id} = await request.json()

    console.log(album_id)

    if(!album_id){
        throw new Error('Missing id requirement!')
        return;
    }

    let id = Number(album_id)

    try{

        await deleteAlbum(id)

        return Response.json({message: 'Album deleted'})

    }catch(error){
        console.log(error)
        throw new Error(`FAILED TO DELETE: ${error}`)
    }
}