//const SERVER_URL = process.env.SERVER_URL;

const PUBLIC_SERVER_URL = process.env.SERVER_URL;
export const serverMutation = async(path, data, method='POST') => {
    const url = `${PUBLIC_SERVER_URL}${path}`
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json();
    // const data = await res.json();
    // return data;
}