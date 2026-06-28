import { getUserAllRecipeByUserId } from '@/lib/actions/allGet';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserPage = async () => {
    const user = await getUserSession();
    const myAllRecipe = await getUserAllRecipeByUserId(user?.id);
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-2 md:px-4 lg:px-4'>
            <h2>user Page</h2>
            <h2>Total Added Recipe: {myAllRecipe.length}</h2>
            <h2>{user?.id}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto justify-center'>
                <div className='bg-gray-50 shadow-sm rounded-md px-2 py-2'>
                    <h2>Total Added Recipe: {myAllRecipe.length}</h2>
                </div>
                <div className='bg-gray-50 shadow-sm rounded-md px-2 py-2'>
                    <h2>Total saved Recipe: {myAllRecipe.length}</h2>
                </div>
                <div className='bg-gray-50 shadow-sm rounded-md px-2 py-2'>
                    <h2>Total favorite Recipe: {myAllRecipe.length}</h2>
                </div>
                <div className='bg-gray-50 shadow-sm rounded-md px-2 py-2'>
                    <h2>Total Purchased Recipe: {myAllRecipe.length}</h2>
                </div>
            </div>
        </div>
    );
};

export default UserPage;