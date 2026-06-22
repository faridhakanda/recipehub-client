import Link from 'next/link';
import React from 'react';

const RecipeCard = ({ recipe }) => {
    //const id = recipe._id.toString();
    return (
        <div>
            <h2>{recipe.recipeName}</h2>
            <h2>{recipe._id}</h2>
            <Link href={`/recipe/${recipe._id}`}>View Details</Link>
        </div>
    );
};

export default RecipeCard;