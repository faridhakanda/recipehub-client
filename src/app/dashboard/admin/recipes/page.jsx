// app/dashboard/admin/recipes/page.jsx
import { getAllRecipe } from '@/lib/actions/allGet';
import RecipeCard from './RecipeCard';
import Card from './Card';

const AdminRecipesPage = async () => {
    const recipes = await getAllRecipe();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Manage Recipes
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Total Recipes: {recipes?.length || 0}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm rounded-full">
                            🟡 Pending: {recipes?.filter(r => r.status === 'Pending')?.length || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full">
                            🟢 Approved: {recipes?.filter(r => r.status === 'Approved')?.length || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm rounded-full">
                            ⭐ Featured: {recipes?.filter(r => r.isFeatured)?.length || 0}
                        </span>
                    </div>
                </div>

                {/* Recipe List */}
                {/* <div className="space-y-4">
                    {recipes?.map((recipe) => (
                        <RecipeCard 
                            key={recipe._id} 
                            recipe={recipe}
                            // onDelete={(id) => {
                            //     // Optional: handle deletion
                            //     console.log('Recipe deleted:', id);
                            // }}
                            // onFeature={(id, isFeatured) => {
                            //     // Optional: handle feature toggle
                            //     console.log('Recipe featured:', id, isFeatured);
                            // }}
                        />
                    ))}

                    {recipes?.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">No recipes found</p>
                        </div>
                    )}
                </div> */}
                <div>
                    {recipes.map(recipe => 
                        <div key={recipe?._id}>
                            <Card recipe={recipe} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminRecipesPage;