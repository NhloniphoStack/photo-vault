import { betterAuth } from 'better-auth'
import { db } from './db'

export const auth = betterAuth({
    database: db,

    emailAndPassword: {
        enabled: true
    },
    
    trustedOrigins: [
        "http://localhost:3000",
        "https://photo-vault-w8ji-jade.vercel.app/",
    ],
})


export type Session = typeof auth.$Infer.Session

