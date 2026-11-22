import { db } from "./db";
import { getSession } from "./get-session";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



export async function getAllPhotos(){
   
    const session = await getSession()

    if(!session){
        throw new Error('Unauthorized')
    }

   const photos = await db.query(`
        SELECT * FROM photos p 
        WHERE p.user_id = $1 
        AND NOT EXISTS (
         SELECT 1 FROM bin b 
         Where b.photo_id = p.id
         ORDER BY p.created_at
         )
        `, [session?.user.id])

    return photos.rows
}

export async function getPhotoById(id: number){
    const session = await getSession()

    const photo = await db.query(`
        SELECT * FROM photos 
        WHERE id= $1 AND user_id = $2
        `, [id, session?.user.id])

    return photo.rows[0]
}


export async function tempDelete(ids: number[]){
  const session = await getSession()
  if(!ids){
    throw new Error(`Missing field`)
    return;
  }

  try{

      for(const id of ids){
    await db.query(`
        INSERT INTO bin (photo_id, user_id) 
        VALUES ($1, $2) 
        `, [id, session?.user.id])
   }


    
  }catch(error){
    throw new Error(`ERROR: ${error}`)
  }

 



}


export async function getBin(){
     const session = await getSession()

   const photos =  await db.query(`
        SELECT p.id, p.image_url, bin.created_at
         FROM photos p 
         INNER JOIN
         bin ON bin.photo_id = p.id 
         WHERE p.user_id = $1  
          ` ,[session?.user.id])


    return photos.rows


}

export async function deleteAll(){
   const session = await getSession()

   try{

    const photos = await db.query(`
      SELECT photos.id, photos.public_id 
      FROM photos 
      INNER JOIN
      bin ON bin.photo_id = photos.id
      WHERE bin.user_id = $1
      `, [session?.user.id])

      const publicIds = photos?.rows?.map(photo => photo.public_id)
      const photoIds = photos?.rows.map(photo => photo.id)
      if(publicIds.length > 0){
        const result = await cloudinary.api.delete_resources(
          publicIds,
          {invalidate: true}
        )
      }

      if(photoIds.length > 0){
        await db.query(`
          DELETE FROM photos
           WHERE id = ANY($1::int[]) 
           AND user_id = $2
           `, [photoIds, session?.user.id])
      }


   }catch(error){
    console.log(error)
    throw new Error(`ERROR: ${error}`)
   }

   
}

export async function deletePhoto(id: number){

  const session = await getSession()

  if(!id){
   
    throw new Error(`Invalid Request: Missing Id param!`)
    return;
  }

  const public_id = await db.query(`
    SELECT public_id FROM photos 
    WHERE user_id = $1 AND id = $2
    `, [session?.user.id, id])

    if(public_id.rows.length === 0){
      throw new Error(`Photo not found!`)
      return;
    }

    try{

       const results = await cloudinary.uploader.destroy(public_id?.rows[0]?.public_id, {invalidate: true})
      console.log(results)
       await db.query(`
        DELETE FROM photos 
        WHERE id = $1
        AND user_id = $2`, [id, session?.user.id])


    }catch(error){
      console.log(error)
       throw new Error(`Deletion Failed: ${error}`)
    }

 
  
}


export async function restorePhoto(id: number){
  const session = await getSession()

    if(!id){
  
    throw new Error(`Invalid Request: Missing Id param!`)
    return;
  }

   try{

      await db.query(`
        DELETE FROM bin
        WHERE photo_id = $1`, [id])



   }catch(error){
    console.log(error)
    throw new Error(`ERROR: Failed to Restore`)
   }

}


export async function makeFavorite({ids, isFavorite} : {
  ids: number[]
  isFavorite: boolean
}){
  const session = await getSession()

  if(!ids){
    throw new Error('Missing ids')
    return;
  }

   try{

    for(const id of ids){

      await db.query(`
        UPDATE photos
         SET is_favorite = $1 
         WHERE user_id = $2
         AND id = $3
         `, [ isFavorite, session?.user.id, id])

    }
  
   }catch(error){
    console.log(error)
    throw new Error('FAILED TO MAKE FAVORITE')
   }

}