import { serverFetch } from "../core/serverFetch";

//const SEVER = process.env.SERVER_URL;

export const getAllUsers = async() => {
    return serverFetch(`/api/users`);
}