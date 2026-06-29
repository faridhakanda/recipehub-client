import { getRecipeById } from '@/lib/actions/allGet';
import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@heroui/react';
import Like from './Like';
import Save from './Save';
import Favorite from './Favorite';
import { getUserSession } from '@/lib/core/session';


export const generateMetadata = async ({ params }) => {
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
    let recipeDetails = null;
    let error = null;
    
    try {
        const { id } = await params;
        //console.log('current id recipe is: ', id);
        
        recipeDetails = await getRecipeById(id);
        
        if (!recipeDetails) {
            notFound();
        }
    } catch (err) {
        console.error('Error fetching recipe:', err);
        error = err;
    }
    
    // user 
    const user = await getUserSession();


    // Error state
    if (error || !recipeDetails) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 sm:px-6 py-6 sm:py-8 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h2 className="text-lg sm:text-xl font-semibold">Error Loading Recipe</h2>
                    </div>
                    <p className="text-sm sm:text-base mb-4">Unable to load recipe details. Please try again later.</p>
                    <Link 
                        href={'/recipe'}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                    >
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }
    
    const formattedDate = new Date(recipeDetails.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-4 sm:py-6 md:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link 
                    href={'/recipe'}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mb-4 sm:mb-6 text-sm sm:text-base"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Recipes
                </Link>

                {/* Main Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-xl dark:shadow-zinc-900/50 overflow-hidden border border-gray-200 dark:border-zinc-800">
                    {/* Header Section */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 px-4 sm:px-6 py-5 sm:py-7">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase ${
                                        recipeDetails.status === 'Approved' 
                                            ? 'bg-green-500 text-white' 
                                            : recipeDetails.status === 'Pending'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-gray-500 text-white'
                                    }`}>
                                        {recipeDetails.status}
                                    </span>
                                    
                                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase bg-white/20 text-white">
                                        {recipeDetails.category}
                                    </span>
                                    {recipeDetails.isFeatured && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase bg-yellow-400 text-gray-900">
                                            ★ Featured
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                    {recipeDetails.recipeName}
                                </h1>
                                <p className="text-blue-100 dark:text-blue-200 mt-0.5 sm:mt-1 text-xs sm:text-sm">
                                    By {recipeDetails.authorName}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span>{recipeDetails.likesCount || 0}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    {recipeDetails.recipeImage ? (
                        <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gray-200 dark:bg-zinc-800">
                            <Image
                                src={recipeDetails.recipeImage}
                                alt={recipeDetails.recipeName}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="w-full h-48 sm:h-64 md:h-80 bg-linear-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                            <div className="text-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-zinc-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500 dark:text-zinc-400 mt-2 text-sm">No image available</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-200 dark:border-zinc-800">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {/* <Button className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-200 dark:border-red-800/50 text-xs sm:text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>Like</span>
                                
                                <span className="text-[10px] bg-red-100 dark:bg-red-800/50 px-1.5 py-0.5 rounded-full">{recipeDetails.likesCount || 0}</span>
                            </Button> */}
                            <div>
                                {!user?.id ? (
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <Link href={`/signin?redirect=recipe/${recipeDetails._id}`} className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-200 dark:border-red-800/50 text-xs sm:text-sm font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <span>Like</span>
                                            
                                            <span className="text-[10px] bg-red-100 dark:bg-red-800/50 px-1.5 py-0.5 rounded-full">{recipeDetails.likesCount || 0}</span>
                                        </Link> 
                                        <Link href={`/signin?redirect=recipe/${recipeDetails._id}`} className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800/50 text-xs sm:text-sm font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                            <span>Save</span>
                                        </Link>
                                        <Link href={`/signin?redirect=recipe/${recipeDetails._id}`} className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 rounded-lg transition-colors border border-yellow-200 dark:border-yellow-800/50 text-xs sm:text-sm font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>Favorite</span>
                                        </Link>

                                        <Link href={`/signin?redirect=recipe/${recipeDetails._id}/purchase`} className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 border border-yellow-300 dark:border-yellow-700 text-xs sm:text-sm">
                                            {/* Sparkle Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>Purchase</span>
                                            {/* Arrow Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <Like recipeDetails={recipeDetails}/>
                                        <Save recipeDetails={recipeDetails} />
                                        <Favorite recipeDetails={recipeDetails} />
                                        <Link href={`/recipe/${recipeDetails._id}/purchase`} className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 border border-yellow-300 dark:border-yellow-700 text-xs sm:text-sm">
                                            {/* Sparkle Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>Purchase</span>
                                            {/* Arrow Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 sm:p-5">
                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-2.5 sm:p-3 text-center">
                                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400">Cuisine</p>
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.cuisineType}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-2.5 sm:p-3 text-center">
                                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400">Difficulty</p>
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.difficultyLevel}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-2.5 sm:p-3 text-center">
                                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400">Prep Time</p>
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-zinc-200">{recipeDetails.preparationTime}m</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-2.5 sm:p-3 text-center">
                                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400">Category</p>
                                <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.category}</p>
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Ingredients */}
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-zinc-200 mb-2 sm:mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Ingredients
                                </h2>
                                <ul className="space-y-1.5">
                                    {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
                                        recipeDetails.ingredients.map((ingredient, index) => (
                                            <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-zinc-300">
                                                <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
                                                <span>{ingredient}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-zinc-400 text-sm">No ingredients listed</p>
                                    )}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-zinc-200 mb-2 sm:mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Instructions
                                </h2>
                                <ol className="space-y-2 sm:space-y-2.5">
                                    {recipeDetails.instructions && recipeDetails.instructions.length > 0 ? (
                                        recipeDetails.instructions.map((instruction, index) => (
                                            <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 dark:text-zinc-300">
                                                <span className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold">
                                                    {index + 1}
                                                </span>
                                                <span>{instruction}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-zinc-400 text-sm">No instructions provided</p>
                                    )}
                                </ol>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200 dark:border-zinc-800">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600 dark:text-zinc-400">
                                <div>
                                    <span className="font-medium">Author:</span> {recipeDetails.authorName}
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span> {recipeDetails.authorEmail}
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="font-medium">Created:</span> {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;


// import { getRecipeById } from '@/lib/actions/allGet';
// import Link from 'next/link';
// import React from 'react';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';

// export const generateMetadata = async ({ params }) => {
//     try {
//         const { id } = await params;
//         const recipe = await getRecipeById(id);
        
//         if (!recipe) {
//             return {
//                 title: 'Recipe Not Found',
//                 description: 'The requested recipe could not be found'
//             };
//         }
        
//         return {
//             title: `${recipe.recipeName} - Recipe by ${recipe.authorName}`,
//             description: `${recipe.recipeName} is made by ${recipe.authorName}. ${recipe.category} dish with ${recipe.cuisineType} cuisine.`,
//         };
//     } catch (error) {
//         return {
//             title: 'Recipe Details',
//             description: 'View recipe details'
//         };
//     }
// }

// const RecipeDetailsPage = async ({ params }) => {
//     let recipeDetails = null;
//     let error = null;
    
//     try {
//         const { id } = await params;
//         console.log('current id recipe is: ', id);
        
//         recipeDetails = await getRecipeById(id);
        
//         if (!recipeDetails) {
//             notFound();
//         }
//     } catch (err) {
//         console.error('Error fetching recipe:', err);
//         error = err;
//     }
    
//     // Error state
//     if (error || !recipeDetails) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4">
//                 <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 sm:px-6 py-6 sm:py-8 rounded-lg shadow-lg">
//                     <div className="flex items-center gap-3 mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                         </svg>
//                         <h2 className="text-lg sm:text-xl font-semibold">Error Loading Recipe</h2>
//                     </div>
//                     <p className="text-sm sm:text-base mb-4">Unable to load recipe details. Please try again later.</p>
//                     <Link 
//                         href={'/recipe'}
//                         className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
//                     >
//                         Back to Recipes
//                     </Link>
//                 </div>
//             </div>
//         );
//     }
    
//     const formattedDate = new Date(recipeDetails.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });
    
//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 {/* Back Button */}
//                 <Link 
//                     href={'/recipe'}
//                     className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mb-6"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                     Back to Recipes
//                 </Link>

//                 {/* Main Card */}
//                 <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-zinc-900/50 overflow-hidden border border-gray-200 dark:border-zinc-800">
//                     {/* Header Section */}
//                     <div className="bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 px-4 sm:px-6 py-6 sm:py-8">
//                         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                             <div className="flex-1">
//                                 <div className="flex flex-wrap items-center gap-2 mb-2">
//                                     <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
//                                         recipeDetails.status === 'Approved' 
//                                             ? 'bg-green-500 text-white' 
//                                             : recipeDetails.status === 'Pending'
//                                             ? 'bg-yellow-500 text-white'
//                                             : 'bg-gray-500 text-white'
//                                     }`}>
//                                         {recipeDetails.status}
//                                     </span>
//                                     <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-white/20 text-white">
//                                         {recipeDetails.category}
//                                     </span>
//                                     {recipeDetails.isFeatured && (
//                                         <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-yellow-400 text-gray-900">
//                                             ★ Featured
//                                         </span>
//                                     )}
//                                 </div>
//                                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//                                     {recipeDetails.recipeName}
//                                 </h1>
//                                 <p className="text-blue-100 dark:text-blue-200 mt-1 text-sm sm:text-base">
//                                     By {recipeDetails.authorName}
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-3 sm:gap-4 text-white/90 text-sm sm:text-base">
//                                 <div className="flex items-center gap-1">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
//                                         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                     </svg>
//                                     <span>{recipeDetails.likesCount || 0}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
//                                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                                     </svg>
//                                     <span>{formattedDate}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Image Section */}
//                     {recipeDetails.recipeImage ? (
//                         <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 bg-gray-200 dark:bg-zinc-800">
//                             <Image
//                                 src={recipeDetails.recipeImage}
//                                 alt={recipeDetails.recipeName}
//                                 fill
//                                 className="object-cover"
//                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
//                                 priority
//                             />
//                         </div>
//                     ) : (
//                         <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96 bg-linear-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
//                             <div className="text-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 dark:text-zinc-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 <p className="text-gray-500 dark:text-zinc-400 mt-2">No image available</p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Action Buttons - Like, Save, Favorite */}
//                     <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
//                         <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                             <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-200 dark:border-red-800/50 text-sm font-medium">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                 </svg>
//                                 <span>Like</span>
//                                 <span className="text-xs bg-red-100 dark:bg-red-800/50 px-1.5 py-0.5 rounded-full">{recipeDetails.likesCount || 0}</span>
//                             </button>
//                             <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800/50 text-sm font-medium">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                                 </svg>
//                                 <span>Save</span>
//                             </button>
//                             <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 rounded-lg transition-colors border border-yellow-200 dark:border-yellow-800/50 text-sm font-medium">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                                 <span>Favorite</span>
//                             </button>
//                             <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors border border-green-200 dark:border-green-800/50 text-sm font-medium">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.368-2.684 3 3 0 00-5.368 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                                 </svg>
//                                 <span>Share</span>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-4 sm:p-6">
//                         {/* Quick Info Grid */}
//                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:p-4 text-center">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Cuisine</p>
//                                 <p className="font-semibold text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.cuisineType}</p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:p-4 text-center">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Difficulty</p>
//                                 <p className="font-semibold text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.difficultyLevel}</p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:p-4 text-center">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Prep Time</p>
//                                 <p className="font-semibold text-sm text-gray-800 dark:text-zinc-200">{recipeDetails.preparationTime}m</p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:p-4 text-center">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Category</p>
//                                 <p className="font-semibold text-sm text-gray-800 dark:text-zinc-200 capitalize truncate">{recipeDetails.category}</p>
//                             </div>
//                         </div>

//                         {/* Two Column Layout for Ingredients & Instructions */}
//                         <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
//                             {/* Ingredients */}
//                             <div>
//                                 <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                     </svg>
//                                     Ingredients
//                                 </h2>
//                                 <ul className="space-y-2">
//                                     {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
//                                         recipeDetails.ingredients.map((ingredient, index) => (
//                                             <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-zinc-300">
//                                                 <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
//                                                 <span>{ingredient}</span>
//                                             </li>
//                                         ))
//                                     ) : (
//                                         <p className="text-gray-500 dark:text-zinc-400 text-sm">No ingredients listed</p>
//                                     )}
//                                 </ul>
//                             </div>

//                             {/* Instructions */}
//                             <div>
//                                 <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                                     </svg>
//                                     Instructions
//                                 </h2>
//                                 <ol className="space-y-3">
//                                     {recipeDetails.instructions && recipeDetails.instructions.length > 0 ? (
//                                         recipeDetails.instructions.map((instruction, index) => (
//                                             <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-zinc-300">
//                                                 <span className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
//                                                     {index + 1}
//                                                 </span>
//                                                 <span>{instruction}</span>
//                                             </li>
//                                         ))
//                                     ) : (
//                                         <p className="text-gray-500 dark:text-zinc-400 text-sm">No instructions provided</p>
//                                     )}
//                                 </ol>
//                             </div>
//                         </div>

//                         {/* Footer Info */}
//                         <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-800">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-zinc-400">
//                                 <div>
//                                     <span className="font-medium">Author:</span> {recipeDetails.authorName}
//                                 </div>
//                                 <div>
//                                     <span className="font-medium">Email:</span> {recipeDetails.authorEmail}
//                                 </div>
//                                 <div className="sm:col-span-2">
//                                     <span className="font-medium">Created:</span> {formattedDate}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RecipeDetailsPage;




// import { getRecipeById } from '@/lib/actions/allGet';
// import Link from 'next/link';
// import React from 'react';
// import { notFound, redirect } from 'next/navigation';
// import Image from 'next/image';
// import { getUserSession } from '@/lib/core/session';

// export const generateMetadata = async({ params }) => {
//     try {
//         const { id } = await params;
//         const recipe = await getRecipeById(id);
        
//         if (!recipe) {
//             return {
//                 title: 'Recipe Not Found',
//                 description: 'The requested recipe could not be found'
//             };
//         }
        
//         return {
//             title: `${recipe.recipeName} - Recipe by ${recipe.authorName}`,
//             description: `${recipe.recipeName} is made by ${recipe.authorName}. ${recipe.category} dish with ${recipe.cuisineType} cuisine.`,
//         };
//     } catch (error) {
//         return {
//             title: 'Recipe Details',
//             description: 'View recipe details'
//         };
//     }
// }

// const RecipeDetailsPage = async ({ params }) => {
//     const { id } = await params;
//     // const user = await getUserSession();
//     // if (!user) {
//     //     redirect(`/signin?redirect=/recipe/${id}`);
//     // }
//     try {
//         const { id } = await params;
//         console.log('current id recipe is: ', id);
        
//         const recipeDetails = await getRecipeById(id);
        
//         if (!recipeDetails) {
//             notFound();
//         }
        
//         const formattedDate = new Date(recipeDetails.createdAt).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });

//         return (
//             <>
//                 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
//                     <div className="max-w-4xl mx-auto">
//                         {/* Back Button */}
//                         <Link 
//                             href={'/recipe'}
//                             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mb-6"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                             </svg>
//                             Back to Recipes
//                         </Link>

//                         {/* Main Card */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden transition-colors duration-200">
//                             {/* Header Section */}
//                             <div className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 px-6 py-8 sm:px-8 sm:py-10">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                                     <div>
//                                         <div className="flex flex-wrap items-center gap-2 mb-2">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
//                                                 recipeDetails.status === 'Approved' 
//                                                     ? 'bg-green-500 text-white' 
//                                                     : recipeDetails.status === 'Pending'
//                                                     ? 'bg-yellow-500 text-white'
//                                                     : 'bg-gray-500 text-white'
//                                             }`}>
//                                                 {recipeDetails.status}
//                                             </span>
//                                             <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-white/20 text-white">
//                                                 {recipeDetails.category}
//                                             </span>
//                                             {recipeDetails.isFeatured && (
//                                                 <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-yellow-400 text-gray-900">
//                                                     ★ Featured
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <h1 className="text-3xl sm:text-4xl font-bold text-white">
//                                             {recipeDetails.recipeName}
//                                         </h1>
//                                         <p className="text-blue-100 dark:text-blue-200 mt-2">
//                                             By {recipeDetails.authorName}
//                                         </p>
//                                     </div>
//                                     <div className="flex items-center gap-4 text-white/90">
//                                         <div className="flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                                             </svg>
//                                             <span>{recipeDetails.likesCount || 0}</span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                                             </svg>
//                                             <span>{formattedDate}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Image Section */}
//                             {recipeDetails.recipeImage ? (
//                                 <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-700">
//                                     <Image
//                                         src={recipeDetails.recipeImage}
//                                         alt={recipeDetails.recipeName}
//                                         fill
//                                         className="object-cover"
//                                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
//                                     />
//                                 </div>
//                             ) : (
//                                 <div className="w-full h-64 sm:h-80 md:h-96 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
//                                     <div className="text-center">
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 dark:text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                         </svg>
//                                         <p className="text-gray-500 dark:text-gray-400 mt-2">No image available</p>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Content Section */}
//                             <div className="p-6 sm:p-8">
//                                 {/* Quick Info Grid */}
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
//                                     <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-colors duration-200">
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">Cuisine</p>
//                                         <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{recipeDetails.cuisineType}</p>
//                                     </div>
//                                     <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-colors duration-200">
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
//                                         <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{recipeDetails.difficultyLevel}</p>
//                                     </div>
//                                     <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center col-span-2 sm:col-span-1 transition-colors duration-200">
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">Prep Time</p>
//                                         <p className="font-semibold text-gray-800 dark:text-gray-200">{recipeDetails.preparationTime} minutes</p>
//                                     </div>
//                                 </div>

//                                 {/* Two Column Layout for Ingredients & Instructions */}
//                                 <div className="grid md:grid-cols-2 gap-8">
//                                     {/* Ingredients */}
//                                     <div>
//                                         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                             </svg>
//                                             Ingredients
//                                         </h2>
//                                         <ul className="space-y-2">
//                                             {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
//                                                 recipeDetails.ingredients.map((ingredient, index) => (
//                                                     <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
//                                                         <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
//                                                         <span>{ingredient}</span>
//                                                     </li>
//                                                 ))
//                                             ) : (
//                                                 <p className="text-gray-500 dark:text-gray-400">No ingredients listed</p>
//                                             )}
//                                         </ul>
//                                     </div>

//                                     {/* Instructions */}
//                                     <div>
//                                         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                                             </svg>
//                                             Instructions
//                                         </h2>
//                                         <ol className="space-y-3">
//                                             {recipeDetails.instructions && recipeDetails.instructions.length > 0 ? (
//                                                 recipeDetails.instructions.map((instruction, index) => (
//                                                     <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
//                                                         <span className="shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
//                                                             {index + 1}
//                                                         </span>
//                                                         <span>{instruction}</span>
//                                                     </li>
//                                                 ))
//                                             ) : (
//                                                 <p className="text-gray-500 dark:text-gray-400">No instructions provided</p>
//                                             )}
//                                         </ol>
//                                     </div>
//                                 </div>

//                                 {/* Footer Info */}
//                                 <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
//                                         <div>
//                                             <span className="font-medium">Author:</span> {recipeDetails.authorName}
//                                         </div>
//                                         <div>
//                                             <span className="font-medium">Email:</span> {recipeDetails.authorEmail}
//                                         </div>
//                                         <div>
//                                             <span className="font-medium">Recipe ID:</span> {recipeDetails._id}
//                                         </div>
//                                     </div>
//                                     <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
//                                         <span className="font-medium">Created:</span> {formattedDate}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     } catch (error) {
//         console.error('Error rendering recipe details:', error);
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
//                 <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-8 rounded-lg shadow-lg">
//                     <div className="flex items-center gap-3 mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                         </svg>
//                         <h2 className="text-xl font-semibold">Error Loading Recipe</h2>
//                     </div>
//                     <p className="mb-4">Unable to load recipe details. Please try again later.</p>
//                     <Link 
//                         href={'/recipe'}
//                         className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//                     >
//                         Back to Recipes
//                     </Link>
//                 </div>
//             </div>
//         );
//     }
// };

// export default RecipeDetailsPage;