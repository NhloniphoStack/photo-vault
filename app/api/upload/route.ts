import { v2 as cloudinary } from "cloudinary";
import { NextResponse, NextRequest } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import {db} from '../../../lib/db'
import { getSession } from "@/lib/get-session";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export async function POST(request: Request){
   const session = await getSession()
   if(!session){
    throw new Error(`Unauthorized`)
    console.log("user is not logged in")
    return;
   }

   
     const formData = await request.formData()
     console.log(formData)
     const file = formData.get("image") as File
     const buffer= Buffer.from(await file.arrayBuffer())

    const results = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            
            {folder: "photo-vault"},
            
            (error, result) => {
                if(error) reject(error);
                else resolve(result)
            }
        );
        stream.end(buffer)
    })


    //const autoTags = results?.tags.join(", ")

    const img_url = results?.secure_url
      const public_id = results?.public_id
   
  

    if(!img_url){
        console.log("im the problem")
        throw new Error(`image failed to upload`)
        return;
    }

    try{
       
   const result =  await db.query(`INSERT INTO photos (image_url, user_id, public_id) 
        VALUES ($1, $2, $3) 
        RETURNING id
        `, [img_url, session?.user?.id, public_id])
       
        return Response.json({message: `Image ${result?.rows[0]?.id} was upload`})
        
    }catch(error){
      
      throw new Error(`Failed to Upload: ${error}`)
      
    }
}
