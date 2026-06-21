import { serverMutation } from "../core/serverMutation";

//const SEVER = process.env.SERVER_URL;


// for user recipe post
export const postRecipe = async(recipeData) => {
    return serverMutation(`/api/recipe`, recipeData);
}


// for subscription
export const createSubscriptionPlan = async(subInfo) => {
    return serverMutation('/api/subscriptions', subInfo);
}