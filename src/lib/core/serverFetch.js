'use server';

import { authHeader } from "./server";

const SERVER_URL = process.env.SERVER_URL;
export const serverFetch = async(path) => {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    return data;
}

export const protectedFetch = async(path) => {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        //     ...await authHeader(),
        // }
        headers: await authHeader(),
    });
    return res.json();
}