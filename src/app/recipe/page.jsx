
import RecipeCard from '@/components/ui/RecipeCard';
import { getAllRecipe } from '@/lib/actions/allGet';
import React from 'react';

const RecipePage = async() => {
    const recipes = await getAllRecipe();
    console.log('all recipe: ', recipes);
    return (
        <div>
            <h2>Recipe Page!</h2>
            <h2>Here to be add card for recipe!</h2>
            <p>All card pass a props id for recipe details for meta data!</p>
            <div className='w-6xl mx-auto bg-blue-200'>
                <div className='grid grid-cols-3'>
                    {recipes.map(recipe => 
                        <div key={recipe._id.toString()}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    )}
                </div>
            </div>
            
            
        </div>
    );
};

export default RecipePage;


// import RecipeCard from '@/components/ui/RecipeCard';
// import { getAllRecipe } from '@/lib/actions/allGet';
// import React from 'react';

// const RecipePage = async() => {
//     const recipes = await getAllRecipe();
//     console.log('all recipe: ', recipes);
    
//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//             {/* Page Header */}
//             <div className="max-w-7xl mx-auto mb-8">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 shadow-lg">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div>
//                             <h1 className="text-3xl sm:text-4xl font-bold text-white">
//                                 Recipe Collection
//                             </h1>
//                             <p className="text-blue-100 mt-2">
//                                 Discover delicious recipes from our community
//                             </p>
//                         </div>
//                         <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                             </svg>
//                             <span className="text-white font-medium">{recipes?.length || 0} Recipes</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Recipe Grid */}
//             <div className="max-w-7xl mx-auto">
//                 {recipes && recipes.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {recipes.map((recipe, index) => (
//                             <div 
//                                 key={recipe._id.toString()} 
//                                 className="opacity-0 animate-fadeIn"
//                                 style={{ 
//                                     animationDelay: `${index * 100}ms`,
//                                     animationFillMode: 'forwards'
//                                 }}
//                             >
//                                 <RecipeCard recipe={recipe} />
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                         </svg>
//                         <h3 className="text-xl font-semibold text-gray-700">No Recipes Found</h3>
//                         <p className="text-gray-500 mt-2">Check back later for new recipes!</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RecipePage;


