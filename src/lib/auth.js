import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('RecipeHubDB');

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
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
    }
})