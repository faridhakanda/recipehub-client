import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import DeleteRecipe from './DeleteRecipe';


const RecipeCard = ({ recipe }) => {
    const id = recipe._id?.toString() || '';

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-zinc-800 hover:shadow-md dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden h-full flex flex-col">
            {/* Image */}
            <div className="relative w-full h-48 sm:h-52 md:h-56 bg-gray-200 dark:bg-zinc-800 flex-shrink-0">
                {recipe.recipeImage ? (
                    <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName || 'Recipe'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center">
                        <span className="text-white text-4xl sm:text-5xl font-bold">
                            {recipe.recipeName?.charAt(0)?.toUpperCase() || 'R'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
                {/* Recipe Name */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-zinc-100 mb-2 line-clamp-1">
                    {recipe.recipeName || 'Untitled Recipe'}
                </h3>
                
                {/* Author and Likes */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="font-medium truncate max-w-[120px] sm:max-w-[150px]">
                            {recipe.authorName || 'Unknown'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{recipe.likesCount || 0}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto space-y-2">
                    <Link 
                        href={`/dashboard/user/saved-recipe/${id}`}
                        className="w-full block text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                        View Details
                    </Link>
                    {/* <div className="grid grid-cols-1 gap-2">
                        <DeleteRecipe recipe={recipe} />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;


// import Link from 'next/link';
// import Image from 'next/image';
// import React from 'react';
// import DeleteRecipe from './[id]/DeleteRecipe';
// import UpdateRecipe from './[id]/UpdateRecipe';

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
//                     {/* <span>{recipe.authorId}</span>
//                      */}
//                 </h3>
//                 {/* <span>Recipe Id: {recipe._id}</span>
//                 <hr />
//                 <span>Author Id: {recipe.authorId}</span> */}
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
//                     href={`/dashboard/user/my-recipe/${id}`}
//                     className="mt-3 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
//                 >
//                     View Details
//                 </Link>
//                 {/* Update Recipe */}
//                 <div className='py-2'>
//                     <UpdateRecipe recipe={recipe}/>
//                 </div>
//                 {/* Delete Recipe */}
//                 <div className=''>
//                     <DeleteRecipe recipe={recipe}/>
//                 </div>
               
//             </div>
//         </div>
//     );
// };

// export default RecipeCard;