import { db } from "./db";
import { getSession } from "./get-session";



export async function addAlbum(name: string){
   const session = await getSession();

   if(!name){
    throw new Error(`Invalid request: Missing name value!`)
    return ;
   }

   try{

     await db.query(`
        INSERT INTO albums
         (user_id, name) 
         VALUES ($1, $2)
         `, [session?.user.id, name])

   }catch(error){
    console.log(error)
    throw new Error(`FAILED: ${error}`)
   }

}

export async function getAllAlbums(){
      
   const albums = await db.query(`
   SELECT 
    a.id,
    a.name,
    a.created_at,
    COUNT(p.photo_id) FILTER (
        WHERE NOT EXISTS (SELECT 1 FROM bin b WHERE b.photo_id = p.photo_id)
    )::INTEGER AS total_photos,
    MIN(photos.image_url) AS sample_image_url
FROM albums a
LEFT JOIN album_photos p ON p.album_id = a.id
LEFT JOIN photos ON photos.id = p.photo_id
GROUP BY a.id, a.name, a.created_at;
    `)
     console.log(albums.rows)
    return albums.rows
}

export async function getAlbumById(id: number){
    const session = await getSession()

 const album =  await db.query(`
     SELECT p.id, p.is_favorite, p.image_url, p.created_at 
     FROM photos p 
     INNER JOIN
   album_photos a ON a.photo_id = p.id 
   WHERE p.user_id = $1 AND a.album_id = $2 
    AND NOT EXISTS (
         SELECT 1 FROM bin b 
         Where b.photo_id = p.id
         )
       `, [session?.user.id, id])

      

      return album.rows
}


export async function getAlbumDetailsById(id: number){
   const session = await getSession()

    

   const album = await db.query(`
      SELECT * FROM albums 
      WHERE user_id = $1 AND id = $2
      `, [session?.user.id, id])

     
    
   return album.rows[0]

}



export async function addPhotos({ids, album_id} : {
   ids: number[]
   album_id: number
}){

   if(!ids){
      throw new Error(`Invalid Request: Missing id Input`)
      return
   }

    if(!album_id){
      throw new Error(`Invalid Request: Missing id Input`)
      return
   }

   try{

     for(const photoId of ids){
      await db.query(`
         INSERT into album_photos
          (album_id, photo_id) 
          VALUES ($1, $2)
          `, [album_id, photoId])
     }
       

   }catch(error){
      console.log(error)
      throw new Error('Failed to add')

   }



}


export async function deleteAlbum(album_id: number){
   const session = await getSession();

   if(!album_id){
      throw new Error('Missing id requirement')
      return;
   }


   try{

      await db.query(`
         DELETE FROM albums 
         WHERE user_id = $1 AND 
         id = $2
         `, [session?.user.id, album_id])

      

   }catch(error){
      console.log(error)
      throw new Error('Failed to delete Album')
   }
}



