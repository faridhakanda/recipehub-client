import UserDashBoardHomePage from '@/components/dashboard/userdashboard/UserPage';
import { getUserAllRecipeByUserId, myPurchaseRecipe, recipeFavoriteByUser, recipeLikeByUser, recipeSaveByUser } from '@/lib/actions/allGet';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserPage = async () => {
    const user = await getUserSession();
    
    // user like, saved and favorite recipe
    const recipeLike = await recipeLikeByUser(user?.id);
    const recipeSave = await recipeSaveByUser(user?.id);
    const recipeFavorite = await recipeFavoriteByUser(user?.id);

    console.log('total like: ', recipeLike.data);
    const recipeLikeLength = recipeLike.data.length;
    console.log('Recipe Like count: ', recipeLikeLength);
    
    

    const myPurchaseRecipes = await myPurchaseRecipe(user?.id);
    const myAddedRecipe = await getUserAllRecipeByUserId(user?.id);
    const myPurchases = myPurchaseRecipes.data;
    //const likeRecipes = recipeLike.data;
    const savedRecipes = recipeSave.data;
    const favoriteRecipes = recipeFavorite.data;

    return (
        <div>
            <UserDashBoardHomePage />
        </div>
    );
};

export default UserPage;