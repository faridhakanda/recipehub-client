import { headers } from "next/headers";
import { authHeader, protectedFetch } from "../core/server";
import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

// for fetch all user information
export const getAllUsers = async() => {
    //return serverFetch(`/api/users`);
    return protectedFetch(`/api/users`);
}


// fetch recipe by user id who created
export const getUserAllRecipeByUserId = async(id) => {
    return serverFetch(`/api/user-recipe?authorId=${id}`);
}
export const getUserRecipeByRecipeId = async(id) => {
    return serverFetch(`/api/user-recipe/${id}`);
}

// fetch all recipe
export const getAllRecipe = async(queryString) => {
    return serverFetch(`/api/recipe?${queryString}`, {
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader(),
        }
    });
}
// fetch recipe by id
export const getRecipeById = async(id) => {
    return serverFetch(`/api/recipe/${id}`);
}


// fetch all plans
export const getPlansForRecipe = async(planId)=> {
    return serverFetch(`/api/plans?id=${planId}`);
}



// here is all protected fetch
export const getUserByAdmin = async(path) => {
    return protectedFetch(path);
}


// for recipe like, save and favorite

export const recipeLikeByUser = async(id) => {
    return protectedFetch(`/api/recipe-like/${id}`);
}

export const recipeSaveByUser = async(id) => {
    return protectedFetch(`/api/recipe-save/${id}`);
}
export const recipeFavoriteByUser = async(id) => {
    return protectedFetch(`/api/recipe-favorite/${id}`);
}


export const myPurchaseRecipe = async(id) => {
    return protectedFetch(`/api/my-purchase/${id}`);
}