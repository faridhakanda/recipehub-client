import React from 'react';
//import PostRecipeForm from './postRecipe';
import { getUserSession } from '@/lib/core/session';
//import AddRecipe from './addRecipe';
import { getPlans } from '@/lib/actions/allGet';
import RecipePost from './RecipeAdd';


const Page = async() => {
    const user = await getUserSession();
    console.log('user in add recipe page: ', user);
    const userPlan = await getPlans(user?.plan);
    console.log('user current plan is: ', userPlan);
    return (
        <div>
            <h2>Add Recipe</h2>
            <h2>User current plan is: {userPlan?.name}</h2>
            <h2>User current recipe add amount: {userPlan?.maxRecipePerUser}</h2>
            <h2>Username: {user?.name}</h2>
            <h2>Userplan: {user?.plan}</h2>
            <h2>isUnlimited: {userPlan?.isUnlimited === 'true' ? "Unlimited" : "2"}</h2>
            {/* <AddRecipe user={user} /> */}
            {/* <PostRecipeForm user={user}/> */}
            {/* <AddRecipe user={user}/> */}
            <RecipePost user={user}/>
        </div>
    );
};

export default Page;