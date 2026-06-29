import { getUserAllRecipeByUserId, recipeLikeByUser } from '@/lib/actions/allGet';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserPage = async () => {
    const user = await getUserSession();
    const myAllRecipe = await getUserAllRecipeByUserId(user?.id);
    const recipeLike = await recipeLikeByUser(user?.id);
    console.log('total like: ', recipeLike.data);
    const recipeLikeLength = recipeLike.data.length;
    console.log('Recipe Like count: ', recipeLikeLength);
    const likeRecipes = recipeLike.data;
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
            <div>
                <h2>user like all recipe will display here!</h2>
                <h2>Total liked recipe is: {recipeLikeLength || 0}</h2>
            </div>
            <div className='gap-2'>
                {likeRecipes.map(recipe => 
                    <div className='bg-gray-50 m-2 px-4 py-2 rounded-md' key={recipe._id}>
                        <h2>{recipe.recipe.recipeName}</h2>
                        <h2>{recipe.userId}</h2>
                        <h2>{recipe.userName}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;