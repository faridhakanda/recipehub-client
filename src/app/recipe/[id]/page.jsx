// import { getRecipeById } from '@/lib/actions/allGet';
// import Link from 'next/link';
// import React from 'react';


// export const generateMetadata = async({ params }) => {
//     const { id } = await params;
//     //const recipeId = _id.toString();
//     //const id = _id.toString();
//     const recipe = await  getRecipeById(id);
//     return {
//         //title: `Farid Akanda ${id}`,
//         title: `${recipe.recipeName}`,
//         //description: `Chicken masala is made by Farid Akanda ${id}`
//         description: `${recipe.recipeName} is made ${recipe.authorName}`
//     }
// }

// const RecipeDetailsPage = async ({ params }) => {
//     const { id } = await params;
//     //const id = _id.toString();
//     //const recipeId = _id.toString();
//     console.log('current id recipe is: ', id);
//     const recipeDetails = await getRecipeById(id);
//     return (
//         <div>
//             <h2>Id: {recipeDetails._id}</h2>
//             <h2>{recipeDetails.recipeName}</h2>
//             <h2>{recipeDetails._id}</h2>
//             <h2>Author: {recipeDetails.authorName}</h2>
//             <h2>Here is Recipe Details</h2>
//             <p>If want to show recipe details with title then use here meta data from metadata page in components folder!</p>
            
//             <Link className='bg-blue-500 px-2 py-1 rounded-md m-1 mx-auto' href={'/recipe'}>Back to Recipe</Link>
//         </div>
//     );
// };

// export default RecipeDetailsPage;


import { getRecipeById } from '@/lib/actions/allGet';
import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const generateMetadata = async({ params }) => {
    try {
        const { id } = await params;
        const recipe = await getRecipeById(id);
        
        if (!recipe) {
            return {
                title: 'Recipe Not Found',
                description: 'The requested recipe could not be found'
            };
        }
        
        return {
            title: `${recipe.recipeName} - Recipe by ${recipe.authorName}`,
            description: `${recipe.recipeName} is made by ${recipe.authorName}. ${recipe.category} dish with ${recipe.cuisineType} cuisine.`,
        };
    } catch (error) {
        return {
            title: 'Recipe Details',
            description: 'View recipe details'
        };
    }
}

const RecipeDetailsPage = async ({ params }) => {
    try {
        const { id } = await params;
        console.log('current id recipe is: ', id);
        
        const recipeDetails = await getRecipeById(id);
        
        // If no recipe found, show 404
        if (!recipeDetails) {
            notFound();
        }
        
        // Format date
        const formattedDate = new Date(recipeDetails.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return (
            <>
                <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link 
                        href={'/recipe'}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mb-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Recipes
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-linear-to-r from-blue-600 to-blue-800 px-6 py-8 sm:px-8 sm:py-10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                            recipeDetails.status === 'Approved' 
                                                ? 'bg-green-500 text-white' 
                                                : recipeDetails.status === 'Pending'
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-gray-500 text-white'
                                        }`}>
                                            {recipeDetails.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-white/20 text-white">
                                            {recipeDetails.category}
                                        </span>
                                        {recipeDetails.isFeatured && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-yellow-400 text-gray-900">
                                                ★ Featured
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                        {recipeDetails.recipeName}
                                    </h1>
                                    <p className="text-blue-100 mt-2">
                                        By {recipeDetails.authorName}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        <span>{recipeDetails.likesCount || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        {recipeDetails.recipeImage ? (
                            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200">
                                <Image
                                    src={recipeDetails.recipeImage}
                                    alt={recipeDetails.recipeName}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-64 sm:h-80 md:h-96 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-500 mt-2">No image available</p>
                                </div>
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="p-6 sm:p-8">
                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Cuisine</p>
                                    <p className="font-semibold text-gray-800 capitalize">{recipeDetails.cuisineType}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Difficulty</p>
                                    <p className="font-semibold text-gray-800 capitalize">{recipeDetails.difficultyLevel}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center col-span-2 sm:col-span-1">
                                    <p className="text-sm text-gray-500">Prep Time</p>
                                    <p className="font-semibold text-gray-800">{recipeDetails.preparationTime} minutes</p>
                                </div>
                            </div>

                            {/* Two Column Layout for Ingredients & Instructions */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Ingredients */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Ingredients
                                    </h2>
                                    <ul className="space-y-2">
                                        {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
                                            recipeDetails.ingredients.map((ingredient, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-700">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{ingredient}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No ingredients listed</p>
                                        )}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Instructions
                                    </h2>
                                    <ol className="space-y-3">
                                        {recipeDetails.instructions && recipeDetails.instructions.length > 0 ? (
                                            recipeDetails.instructions.map((instruction, index) => (
                                                <li key={index} className="flex items-start gap-3 text-gray-700">
                                                    <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <span>{instruction}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No instructions provided</p>
                                        )}
                                    </ol>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Author:</span> {recipeDetails.authorName}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email:</span> {recipeDetails.authorEmail}
                                    </div>
                                    <div>
                                        <span className="font-medium">Recipe ID:</span> {recipeDetails._id}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-medium">Created:</span> {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    } catch (error) {
        console.error('Error rendering recipe details:', error);
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-red-50 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h2 className="text-xl font-semibold">Error Loading Recipe</h2>
                    </div>
                    <p className="mb-4">Unable to load recipe details. Please try again later.</p>
                    <Link 
                        href={'/recipe'}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }
};

export default RecipeDetailsPage;