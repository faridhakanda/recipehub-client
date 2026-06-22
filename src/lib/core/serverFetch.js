
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