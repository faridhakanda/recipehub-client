
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
const RecipeCard = ({ recipe }) => {
    const id = recipe._id?.toString() || recipe._id || '';
    return (
        <div className='w-84 mx-auto my-1 rounded-md bg-purple-500 h-48'>
            <h2>Recipe Id: {recipe._id}</h2>
            <h2>Recipe title: {recipe.recipeName}</h2>
            <h2>Recipe id to string: {recipe._id.toString()} ss</h2>
            <Image src={recipe.recipeImage} alt={recipe.recipeName} width={400} height={400} />
            {/* <Link href={`/recipe/${recipe._id.toString()}`}>View Detail</Link> */}
            <Link href={`/recipe/${id}`}>Details</Link>
        </div>
    );
};

export default RecipeCard;