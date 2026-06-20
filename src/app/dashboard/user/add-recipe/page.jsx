import React from 'react';
import PostRecipeForm from './postRecipe';
import { getUserSession } from '@/lib/core/session';
import AddRecipe from './addRecipe';


const AddRecipePage = async() => {
    const user = await getUserSession();
    console.log('user in add recipe page: ', user);
    return (
        <div>
            <h2>Add Recipe</h2>
            {/* <AddRecipe user={user} /> */}
            {/* <PostRecipeForm user={user}/> */}
            <AddRecipe user={user}/>
        </div>
    );
};

export default AddRecipe;