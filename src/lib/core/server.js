import { getUserToken } from "./session";



const baseUrl = process.env.SERVER_URL;

export const authHeader = async() => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const protectedFetch = async(path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        //headers: await 
        headers: await authHeader()
    });
    return res.json();
}