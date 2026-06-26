//import RecipeCard from '@/components/ui/RecipeCard';
import { getAllRecipe } from '@/lib/actions/allGet';
import React from 'react';
// import styles from './page.module.css';
// import { getUserSession } from '@/lib/core/session';
// import PaginationForRecipe from '@/components/ui/Pagination';
// import RecipeFilter from './RecipeFilter';
// import { useRouter } from 'next/navigation';
import AllRecipe from './AllRecipe';

const RecipePage = async({ searchParams }) => {
    // const recipes = await getAllRecipe();
    // console.log('all recipe: ', recipes);
    const filters = await searchParams;
    const filterObject = {
        ...filters,
        //page: filters.page || 1,
    }
    const querySearch = new URLSearchParams(filters);
    const queryString = querySearch.toString()
    console.log('search Query: ', filters, queryString);

    const recipes = await getAllRecipe(queryString);
    //const router = useRouter();
    const totalRecipe = recipes.length;
    // const totalPage = totalRecipe / 2;
    // const itemsPerPage = totalRecipe / totalPage;
    
    const total = totalRecipe;
    
    return (
        <div>
            <AllRecipe filters={filterObject} recipes={recipes || []} total={total}/>
        </div>
       
    );
};

export default RecipePage;



// import RecipeCard from '@/components/ui/RecipeCard';
// import { getAllRecipe } from '@/lib/actions/allGet';
// import React from 'react';
// import styles from './page.module.css';
// import { getUserSession } from '@/lib/core/session';
// import PaginationForRecipe from '@/components/ui/Pagination';
// import RecipeFilter from './RecipeFilter';
// import { useRouter } from 'next/navigation';

// const RecipePage = async({ searchParams }) => {
//     const recipes = await getAllRecipe();
//     console.log('all recipe: ', recipes);
//     //const router = useRouter();
//     const totalRecipe = recipes.length;
//     const totalPage = totalRecipe / 2;
//     const itemsPerPage = totalRecipe / totalPage;
    
    
//     return (
//         <div className={`styles.pageContainer my-2`}>
//             {/* Header */}
//             <div className={styles.header}>
//                 <div className={styles.headerContent}>
//                     <div className={styles.headerInner}>
//                         <div>
//                             <h1 className={styles.headerTitle}>
//                                 <span>🍳</span>
//                                 Recipe Collection
                                
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
//             <div className={styles.header}>
//                 <RecipeFilter 
                    
//                 />
//             </div>
            
//             {/* Recipe Grid */}
//             <div className={styles.gridContainer}>
//                 {recipes && recipes.length > 0 ? (
//                     <>
//                         <div className={styles.recipeGrid}>
//                             {recipes.map((recipe) => (
//                                 <div key={recipe._id.toString()} className={styles.cardWrapper}>
//                                     <RecipeCard recipe={recipe} />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className={styles.footer}>
//                             Showing {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
//                         </div>
//                         <PaginationForRecipe totalItems={totalRecipe} totalPages={totalPage} itemsPerPage={itemsPerPage}/>
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
//     );
// };

// export default RecipePage;


