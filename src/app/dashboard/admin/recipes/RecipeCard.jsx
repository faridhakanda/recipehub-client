'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { authHeader } from '@/lib/core/server';
import { recipeDeleteByAdmin } from '@/lib/actions/allDelete';

const RecipeCard = ({ recipe, onDelete, onFeature }) => {
    const [loading, setLoading] = useState(false);
    const [featureLoading, setFeatureLoading] = useState(false);

    const handleDelete = async () => {
        const result = await recipeDeleteByAdmin(recipe?._id);
        if (result?.success) {
            toast.success('Recipe Deleted successfully!');
        } else {
            toast.error('Faile to delete recipe!');
        }
        // if (!confirm(`Are you sure you want to delete "${recipe?.recipeName}"?`)) {
        //     return;
        // }

        // setLoading(true);
        // try {
        //     const response = await fetch(`/api/admin/recipes/${recipe?._id}`, {
        //         method: 'DELETE',
        //         headers: { 
        //             'Content-Type': 'application/json',
        //             ...await authHeader()
        //          },
        //     });

        //     const data = await response.json();

        //     if (data?.success) {
        //         toast.success('Recipe deleted successfully!');
        //         if (onDelete) onDelete(recipe?._id);
        //     } else {
        //         toast.error(data?.message || 'Failed to delete recipe');
        //     }
        // } catch (error) {
        //     console.error('Error deleting recipe:', error);
        //     toast.error('Failed to delete recipe');
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleFeatureToggle = async () => {
        setFeatureLoading(true);
        try {
            const response = await fetch(`/api/admin/recipes/${recipe?._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: recipe?.isFeatured ? 'unfeature' : 'feature' 
                }),
            });

            const data = await response.json();

            if (data?.success) {
                toast.success(`Recipe ${recipe?.isFeatured ? 'unfeatured' : 'featured'} successfully!`);
                if (onFeature) onFeature(recipe?._id, !recipe?.isFeatured);
            } else {
                toast.error(data?.message || 'Failed to update recipe');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            toast.error('Failed to update recipe');
        } finally {
            setFeatureLoading(false);
        }
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
            'Approved': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            'Rejected': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        };
        return colors[status] || colors.Pending;
    };

    // Get difficulty badge color
    const getDifficultyColor = (level) => {
        const colors = {
            'easy': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            'medium': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
            'hard': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        };
        return colors[level] || colors.easy;
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                {/* Recipe Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                    {recipe?.recipeImage ? (
                        <Image
                            src={recipe.recipeImage}
                            alt={recipe?.recipeName || 'Recipe'}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">
                                {recipe?.recipeName?.charAt(0)?.toUpperCase() || 'R'}
                            </span>
                        </div>
                    )}
                    
                    {/* Featured Badge */}
                    {recipe?.isFeatured && (
                        <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                ⭐ Featured
                            </span>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute bottom-2 left-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(recipe?.status)}`}>
                            {recipe?.status || 'Pending'}
                        </span>
                    </div>
                </div>

                {/* Recipe Info */}
                <div className="flex-1 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {recipe?.recipeName || 'Untitled Recipe'}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    By {recipe?.authorName || 'Unknown'}
                                </span>
                                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {recipe?.category || 'Uncategorized'}
                                </span>
                                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(recipe?.difficultyLevel)}`}>
                                    {recipe?.difficultyLevel || 'N/A'}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                                <span>🍽️ {recipe?.cuisineType || 'N/A'}</span>
                                <span>⏱️ {recipe?.preparationTime || 'N/A'} min</span>
                                <span>❤️ {recipe?.likesCount || 0} likes</span>
                                <span>📅 {recipe?.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>

                            {/* Ingredients Preview */}
                            {recipe?.ingredients?.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                                            {ing}
                                        </span>
                                    ))}
                                    {recipe.ingredients.length > 3 && (
                                        <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500">
                                            +{recipe.ingredients.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                            <button
                                onClick={handleFeatureToggle}
                                disabled={featureLoading}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1 min-w-[80px] ${
                                    recipe?.isFeatured
                                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                                } ${featureLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {featureLoading ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        {recipe?.isFeatured ? '⭐ Unfeature' : '⭐ Feature'}
                                    </>
                                )}
                            </button>

                            <Link
                                href={`/recipe/${recipe?._id}`}
                                target="_blank"
                                className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-center"
                            >
                                View
                            </Link>

                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className={`px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;