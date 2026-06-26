//const SERVER = process.env.SERVER_URL;
//const SERVER = 'http://localhost:5000';
'use server';
const SERVER_URL = process.env.SERVER_URL;
export const deleteRecipe = async(recipeId, authorId) => {
    const res = await fetch(`${SERVER_URL}/api/user-recipe/${recipeId}?authorId=${authorId}`, {
        method: 'DELETE'
    });
    return res.json()
}