import { serverMutation } from "../core/serverMutation";

const SEVER = process.env.SERVER_URL;


export const postRecipe = async(recipeData) => {
    return serverMutation(`/api/recipe`, recipeData);
}