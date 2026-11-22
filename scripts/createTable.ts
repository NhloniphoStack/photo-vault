import { db } from "@/lib/db";


async function createTable(){

    await db.query(`CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        name TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`)

        await db.query(`CREATE TABLE IF NOT EXISTS bin ( 
            id SERIAL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)

        await db.query(`CREATE TABLE IF NOT EXISTS albums ( 
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            user_id TEXT NOT NULL REFERENCES "user"(id),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)


        await db.query(`CREATE TABLE IF NOT EXISTS album_photos ( 
            id SERIAL PRIMARY KEY,
            photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
            album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )`)



    console.log("table was created")
}

createTable()