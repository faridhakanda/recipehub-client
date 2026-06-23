import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const RecipeCard = ({ recipe }) => {
    const id = recipe._id?.toString() || '';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-200">
                {recipe.recipeImage ? (
                    <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName || 'Recipe'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                            {recipe.recipeName?.charAt(0) || 'R'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Recipe Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {recipe.recipeName || 'Untitled Recipe'}
                </h3>

                {/* Author and Likes */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{recipe.authorName || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{recipe.likesCount || 0}</span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link 
                    href={`/dashboard/user/my-recipe/${id}`}
                    className="mt-3 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;