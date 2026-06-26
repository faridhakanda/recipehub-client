import { protectedFetch } from "../core/server";
import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

// for fetch all user information
export const getAllUsers = async() => {
    return serverFetch(`/api/users`);
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
    return serverFetch(`/api/recipe?${queryString}`);
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