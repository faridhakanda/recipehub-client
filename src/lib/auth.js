import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";


const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('RecipeHubDB');

export const auth = betterAuth({
    
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
        //disableSignUp: false 
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_KEY
        }
    },
    user: {
        additionalFields: {
            image: {
                default: "http://imgbb.co/userProfile.png"
            },
            role: {
                default: "user"
            },
            plan: {
                default: "free"
            }
        }
    },
    
    // plugins: [
    //     admin()
    // ]
})