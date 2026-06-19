import RecipeCard from '@/components/ui/card';
import React from 'react';
const recipes = [
    {
        id: 1,
        title: 'Chicken Masala'
    },
    {
        id: 2,
        title: 'Beef Stick Roll'
    },
    {
        id: 3,
        title: 'Mutton Curry'
    },
    {
        id: 4,
        title: 'Tandury Nanbread Roll'
    },
    {
        id: 5,
        title: 'Fish Fry'
    },
    {
        id: 6,
        title: 'French Fry with Tomoto Sauce'
    },
    {
        id: 7,
        title: 'Vegetable Fry without Oil'
    }
]
const RecipePage = () => {
    return (
        <div>
            <h2>Recipe Page!</h2>
            <h2>Here to be add card for recipe!</h2>
            <p>All card pass a props id for recipe details for meta data!</p>
            <div className='w-6xl mx-auto bg-blue-200'>
                <div className='grid grid-cols-3'>
                    {/* <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard /> */}
                    {recipes.map(recipe => 
                        <div key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    )}
                </div>
            </div>
            
            
        </div>
    );
};

export default RecipePage;