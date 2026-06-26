import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex min-h-screen justify-center items-center mx-auto my-auto'>
            <Spinner />
            {/* <h2>Loading...</h2> */}
        </div>
    );
};

export default Loading;