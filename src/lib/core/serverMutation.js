const SERVER_URL = process.env.SERVER_URL;

export const serverMutation = async(path, data, method='POST') => {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
    // const data = await res.json();
    // return data;
}