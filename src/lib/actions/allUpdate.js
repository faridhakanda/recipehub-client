'use server'

import { authHeader } from "../core/server";

const SERVER_URL = process.env.SERVER_URL;

export const updateRecipe = async(recipeId, authorId, data) => {
    const res = await fetch(`${SERVER_URL}/api/user-recipe/${recipeId}?authorId=${authorId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data)
    })
    return res.json();
}

export const userProfileUpdate = async(userId, data) => {
    const res  = await fetch(`${SERVER_URL}/api/auth/update-profile/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data)
    })
    return res.json();
}