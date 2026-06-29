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
    // const res = await fetch(`${SERVER_URL}${path}`, {
    //     method: 'GET',
    //     // headers: {
    //     //     'Content-Type': 'application/json',
    //     //     ...await authHeader(),
    //     // }
    //     headers: await authHeader(),
    // });
    // return res.json();
    try {
    
        const res = await fetch(`${SERVER_URL}${path}`, {
            method: 'GET',
            headers: await authHeader(),
        });
        if (!res.ok) {
            const text = await res.text();
            console.error('Server response status: ', res.status);
            console.error('Server response text: ', text);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        try {
            return await res.json();
        } catch(parseError) {
            const text = await res.text();
            console.error('Failed to parse JSON. Response was: ', text);
            throw new Error('Invalid JSON response from server!');
        }
    } catch(parseError) {
        const text = await res.text();
    }
}