//import { serverMutation } from "../core/serverMutation";
'use server';
import { serverMutation } from "../core/serverMutation";

//const SEVER = process.env.SERVER_URL;

const SERVER = process.env.SERVER_URL;
// for user recipe post
export const postRecipe = async(recipeData) => {
    //return serverMutation('/api/recipe', recipeData);
    // 'http://localhost:5000/api/recipe'
    const res = await fetch(`${SERVER}/api/recipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    })
    return res.json();
    //return result;
    //return serverMutation('/api/recipe', recipeData);
}

export const createRecipe = async(data) => {
    return serverMutation('/api/recipe', data);
}
// for subscription
export const createSubscriptionPlan = async(subInfo) => {
    return serverMutation('/api/subscriptions', subInfo);
}

export const buyRecipe = async(buyerInfomation) => {
    return serverMutation('/api/buy-recipe', buyerInfomation);
}