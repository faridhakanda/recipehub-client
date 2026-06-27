import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const RecipeCard = ({ recipe }) => {
    const id = recipe._id?.toString() || '';

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-zinc-800 hover:shadow-lg dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden h-full flex flex-col group">
            {/* Image */}
            <div className="relative w-full h-48 sm:h-52 md:h-56 bg-gray-200 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
                {recipe.recipeImage ? (
                    <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName || 'Recipe'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center">
                        <span className="text-white text-4xl sm:text-5xl font-bold">
                            {recipe.recipeName?.charAt(0)?.toUpperCase() || 'R'}
                        </span>
                    </div>
                )}
                
                {/* Status Badge - Optional */}
                {recipe.status && (
                    <div className="absolute top-2 right-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            recipe.status === 'Approved' 
                                ? 'bg-green-500 text-white' 
                                : recipe.status === 'Pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-500 text-white'
                        }`}>
                            {recipe.status}
                        </span>
                    </div>
                )}
            </div>
            
            {/* Content */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
                {/* Category Badge */}
                {recipe.category && (
                    <div className="mb-2">
                        <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                            {recipe.category}
                        </span>
                    </div>
                )}
                
                {/* Recipe Name */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-zinc-100 mb-1.5 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {recipe.recipeName || 'Untitled Recipe'}
                </h3>

                {/* Description - Optional */}
                {recipe.description && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 mb-3 flex-1">
                        {recipe.description}
                    </p>
                )}

                {/* Author and Likes */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-zinc-400 border-t border-gray-100 dark:border-zinc-800 pt-3 mt-auto">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs font-bold">
                                {recipe.authorName?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                        <span className="font-medium truncate max-w-[80px] sm:max-w-[100px]">
                            {recipe.authorName || 'Unknown'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{recipe.likesCount || 0}</span>
                    </div>
                </div>
                
                {/* View Details Button */}
                <Link 
                    href={`/recipe/${id}`}
                    className="mt-3 w-full block text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;

// import Link from 'next/link';
// import Image from 'next/image';
// import React from 'react';

// const RecipeCard = ({ recipe }) => {
//     const id = recipe._id?.toString() || '';

//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//             {/* Image */}
//             <div className="relative w-full h-48 bg-gray-200">
//                 {recipe.recipeImage ? (
//                     <Image
//                         src={recipe.recipeImage}
//                         alt={recipe.recipeName || 'Recipe'}
//                         fill
//                         className="object-cover"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                     />
//                 ) : (
//                     <div className="w-full h-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center">
//                         <span className="text-white text-4xl font-bold">
//                             {recipe.recipeName?.charAt(0) || 'R'}
//                         </span>
//                     </div>
//                 )}
//             </div>
            
//             {/* Content */}
//             <div className="p-4">
//                 {/* Recipe Name */}
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
//                     {recipe.recipeName || 'Untitled Recipe'}
//                 </h3>
                
//                 {/* Author and Likes */}
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                         <span className="font-medium">{recipe.authorName || 'Unknown'}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                         </svg>
//                         <span>{recipe.likesCount || 0}</span>
//                     </div>
//                 </div>
                
//                 {/* View Details Button */}
//                 <Link 
//                     href={`/recipe/${id}`}
//                     className="mt-3 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
//                 >
//                     View Details
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default RecipeCard;