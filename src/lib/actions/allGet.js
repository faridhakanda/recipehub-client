import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

// for fetch all user information
export const getAllUsers = async() => {
    return serverFetch(`/api/users`);
}


// fetch recipe by user id who created
export const getUserAllRecipeByUserId = async(id) => {
    return serverFetch(`/api/user-recipe/${id}`);
}

// fetch all recipe
export const getAllRecipe = async() => {
    return serverFetch('/api/recipe');
}
// fetch recipe by id
export const getRecipeById = async(id) => {
    return serverFetch(`/api/recipe/${id}`);
}


// fetch all plans
export const getPlansForRecipe = async(planId)=> {
    return serverFetch(`/api/plans?id=${planId}`);
}