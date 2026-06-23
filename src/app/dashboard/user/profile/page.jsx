import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async() => {
    const user = await getUserSession();
    return (
        <div>
            <h2>To be update user Name and Image Feild!</h2>
            <h2>User name: {user?.name}</h2>
            <h2>User image: {user?.image}</h2>
        </div>
    );
};

export default page;