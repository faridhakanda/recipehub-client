//import { serverMutation } from "../core/serverMutation";
'use server';
import { authHeader } from "../core/server";
import { protectedMutation, serverMutation } from "../core/serverMutation";

//const SEVER = process.env.SERVER_URL;

const SERVER = process.env.SERVER_URL;
// for user recipe post
export const postRecipe = async(recipeData) => {
    //return serverMutation('/api/recipe', recipeData);
    // 'http://localhost:5000/api/recipe'
    const res = await fetch(`${SERVER}/api/recipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(recipeData)
    })
    return res.json();
    //return result;
    //return serverMutation('/api/recipe', recipeData);
}

export const createRecipe = async(data) => {
    //return serverMutation('/api/recipe', data);
    return protectedMutation('/api/recipe', data);
}
// for subscription
export const createSubscriptionPlan = async(subInfo) => {
    // return serverMutation('/api/subscriptions', subInfo);
    return protectedMutation('/api/subscriptions', subInfo);
}

export const buyRecipe = async(buyerInfomation) => {
    // return serverMutation('/api/buy-recipe', buyerInfomation);
    return protectedMutation('/api/buy-recipe', buyerInfomation);
}


// for secure and authenticated user
// like, save and favorite api 

export const recipeLike = async(id, recipeInformationWithUser) => {
    return protectedMutation(`/api/recipe-like/${id}`, recipeInformationWithUser);
}
export const recipeSave = async(id, recipeInfomationWithUser) => {
    return protectedMutation(`/api/recipe-save/${id}`, recipeInfomationWithUser);
}
export const recipeFavorite = async(id, recipeInfomationWithUser) => {
    return protectedMutation(`/api/recipe-favorite/${id}`, recipeInfomationWithUser);
}


// admin feature post
export const featurePost = async(recipeId, Data) => {
    return protectedMutation(`/api/admin/feature-recipe/${recipeId}`, Data);
}