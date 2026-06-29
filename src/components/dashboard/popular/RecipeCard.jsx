// src/components/ui/RecipeCard.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RecipeCard = ({ recipe }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const id = recipe._id?.toString() || recipe.recipeId || '';

    return (
        <motion.div 
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm dark:shadow-none border border-gray-200 dark:border-zinc-800 hover:shadow-xl dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden h-full flex flex-col group"
            whileHover={{ 
                y: -8,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
        >
            {/* Image Container with zoom effect */}
            <div className="relative w-full h-48 sm:h-52 md:h-56 bg-gray-200 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
                {recipe.recipeImage ? (
                    <>
                        <motion.div
                            className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName || 'Recipe'}
                            fill
                            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                                isImageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onLoad={() => setIsImageLoaded(true)}
                        />
                        {!isImageLoaded && (
                            <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center">
                        <span className="text-white text-5xl sm:text-6xl font-bold">
                            {recipe.recipeName?.charAt(0)?.toUpperCase() || 'R'}
                        </span>
                    </div>
                )}
                
                {/* Popular badge */}
                {recipe.likesCount > 10 && (
                    <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center gap-1 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Popular
                        </span>
                    </div>
                )}
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                {/* Recipe Name */}
                <motion.h3 
                    className="text-base sm:text-lg font-semibold text-gray-800 dark:text-zinc-100 mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                    {recipe.recipeName || 'Untitled Recipe'}
                </motion.h3>

                {/* Category and Cuisine tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {recipe.category && (
                        <span className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                            {recipe.category}
                        </span>
                    )}
                    {recipe.cuisineType && (
                        <span className="inline-block px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full font-medium">
                            {recipe.cuisineType}
                        </span>
                    )}
                    {recipe.difficultyLevel && (
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium
                            ${recipe.difficultyLevel === 'easy' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                              recipe.difficultyLevel === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                              'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}
                        >
                            {recipe.difficultyLevel}
                        </span>
                    )}
                </div>

                {/* Author and Likes */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {recipe.authorName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium truncate max-w-[120px] sm:max-w-[150px]">
                            {recipe.authorName || 'Unknown'}
                        </span>
                    </div>
                    <motion.div 
                        className="flex items-center gap-1 flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{recipe.likesCount || 0}</span>
                    </motion.div>
                </div>

                {/* View Details Button */}
                <div className="mt-auto">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link 
                            href={`/recipe/${id}`}
                            className="w-full block text-center bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            View Details
                            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default RecipeCard;