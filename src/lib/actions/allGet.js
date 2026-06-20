import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

export const getAllUsers = async() => {
    return serverFetch(`/api/users`);
}

export const getRecipeById = async(id) => {
    return serverFetch(`/api/recipe/:${id}`);
}