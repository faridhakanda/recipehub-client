
import React from 'react';
import Link from 'next/link';
const RecipeCard = ({ recipe }) => {
    
    return (
        <div className='w-84 mx-auto my-1 rounded-md bg-purple-500 h-48'>
            <h2>Recipe title: {recipe.title}</h2>
            <Link href={`/recipe/${recipe.id}`}>View Detail</Link>
        </div>
    );
};

export default RecipeCard;