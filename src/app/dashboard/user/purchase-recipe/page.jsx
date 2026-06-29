import React from 'react';
import { getUserSession } from '@/lib/core/session';
import RecipeCard from './card';
import { getUserAllRecipeByUserId, myPurchaseRecipe } from '@/lib/actions/allGet';

const PurchaseRecipePage = async() => {
    const user = await getUserSession();
    //const recipes = await getUserAllRecipeByUserId(user?.id);
    const myRecipes = await myPurchaseRecipe(user?.id);
    const recipes = myRecipes.data;
    console.log('all recipe for user: ', recipes);
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white flex items-center gap-2 sm:gap-3">
                                    <span>🍳</span>
                                    My Purchased Recipe Collection
                                </h1>
                                <p className="text-blue-100 dark:text-blue-200 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                                    Discover and explore delicious recipes from our community
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                                    {recipes?.length || 0} {recipes?.length === 1 ? 'Recipe' : 'Recipes'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Recipe Grid */}
                {recipes && recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                            {recipes.map((recipe, index) => (
                                <div 
                                    key={recipe._id.toString()} 
                                    className="animate-fadeIn"
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-zinc-400 border-t border-gray-200 dark:border-zinc-800 pt-4 sm:pt-6">
                            Showing {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 sm:py-16 md:py-20 bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-none border border-gray-200 dark:border-zinc-800">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-zinc-100">No Recipes Found</h3>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 mt-2 max-w-sm mx-auto">
                            We could not find any recipes at the moment. Check back later for delicious new additions!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseRecipePage;


// import React from 'react';
// import styles from './page.module.css';
// import { getUserSession } from '@/lib/core/session';
// import PaginationForRecipe from '@/components/ui/Pagination';
// import RecipeCard from './card';
// import { getUserAllRecipeByUserId } from '@/lib/actions/allGet';

// const RecipePage = async() => {
//     const user = await getUserSession();
//     const recipes = await getUserAllRecipeByUserId(user?.id);
//     //const recipes = await getAllRecipe();
//     console.log('all recipe for user: ', recipes);
    
//     // const totalRecipe = recipes.length;
//     // const totalPage = totalRecipe / 2;
//     // const itemsPerPage = totalRecipe / totalPage;
//     return (
//         <div className=''>
//             <div className={`styles.pageContainer my-2`}>
//             {/* Header */}
//             <div className={`styles.header`}>
//                 <div className={styles.headerContent}>
//                     <div className={styles.headerInner}>
//                         <div>
//                             <h1 className={styles.headerTitle}>
//                                 <span>🍳</span>
//                                 My Added Recipe Collection
                                
//                             </h1>
                            
//                             <p className={styles.headerSubtitle}>
//                                 Discover and explore delicious recipes from our community
//                             </p>
//                         </div>
//                         <div className={styles.recipeCount}>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
//                                 <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
//                                 <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
//                             </svg>
//                             <span className={styles.recipeCountText}>
//                                 {recipes?.length || 0} {recipes?.length === 1 ? 'Recipe' : 'Recipes'}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Recipe Grid */}
//             <div className={styles.gridContainer}>
//                 {recipes && recipes.length > 0 ? (
//                     <>
//                         <div className={styles.recipeGrid}>
//                             {recipes.map((recipe) => (
//                                 <div key={recipe._id.toString()} className={styles.cardWrapper}>
//                                     {/* <RecipeCard recipe={recipe} /> */}
//                                     <RecipeCard recipe={recipe} />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className={styles.footer}>
//                             Showing {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
//                         </div>
//                         {/* <PaginationForRecipe totalItems={totalRecipe} totalPages={totalPage} itemsPerPage={itemsPerPage}/> */}
//                     </>
//                 ) : (
//                     <div className={styles.emptyState}>
//                         <div className={styles.emptyIcon}>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                             </svg>
//                         </div>
//                         <h3 className={styles.emptyTitle}>No Recipes Found</h3>
//                         <p className={styles.emptyDescription}>
//                             We could not find any recipes at the moment. Check back later for delicious new additions!
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//         </div>

//     );
// };

// export default RecipePage;


