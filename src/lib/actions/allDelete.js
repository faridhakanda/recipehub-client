//const SERVER = process.env.SERVER_URL;
//const SERVER = 'http://localhost:5000';
'use server';

import { authHeader } from "../core/server";

const SERVER_URL = process.env.SERVER_URL;
export const deleteRecipe = async(recipeId, authorId) => {
    const res = await fetch(`${SERVER_URL}/api/user-recipe/${recipeId}?authorId=${authorId}`, {
        method: 'DELETE',
        headers: {
            ...await authHeader()
        }
    });
    return res.json()
}


export const userDelete = async(userId) => {
    const res = await fetch(`${SERVER_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        }
    });
    return res.json();
}

export const recipeDeleteByAdmin = async(recipeId) => {
    const res = await fetch(`${SERVER_URL}/api/admin/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        }
    });
    return res.json();
}