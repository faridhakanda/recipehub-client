import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

// for fetch all user information
export const getAllUsers = async() => {
    return serverFetch(`/api/users`);
}


// fetch recipe by id
export const getRecipeById = async(id) => {
    return serverFetch(`/api/recipe/:${id}`);
}


// fetch all plans
export const getPlans = async(planId)=> {
    return serverFetch(`/api/plans?id=${planId}`);
}