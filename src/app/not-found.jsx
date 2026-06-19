import Link from 'next/link';
import React from 'react';

const NotFound404 = () => {
    return (
        <div className='flex  items-center min-h-screen justify-center mx-auto my-auto'>
            <div className='w-96 bg-purple-400 mx-auto my-auto justify-center items-center flex flex-col text-center h-96'>
                <h2>Not Found 404!</h2>
                <Link href={'/'}>Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound404;