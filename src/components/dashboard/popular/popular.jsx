// app/page.jsx
import Banner from "@/components/ui/banner";
import HomeBanner from "@/components/ui/homeBanner";

//import PopularRecipes from "@/components/ui/PopularRecipes";
import PopularRecipes from "./PopularRecipes";
import { getAllUsers, getFeatureRecipes, getPopularRecipe } from "@/lib/actions/allGet";
import { getUserSession, getUserToken } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";
import RecipeCard from "./RecipeCard";
import FeaturedRecipes from "./featureRecipes";
import FeatureRecipes from "./featureRecipes";

const Popular = async () => {
    const users = await getAllUsers();
    console.log(users, 'users');
    const user = await getUserSession();
    console.log('user session', user);
    const userToken = await getUserToken();
    console.log('user token', userToken);
    
    const popularRecipes = await getPopularRecipe();

    
    const features = await getFeatureRecipes();
    console.log(features, 'fea')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            
            {/* Explore Button Section */}
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Discover Amazing Recipes
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
                        Handpicked recipes for you to try
                    </p>
                </div>
                <Link href={'/recipe'}>
                    <Button 
                        className="rounded-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                    >
                        Explore All →
                    </Button>
                </Link>
            </div>
            <FeatureRecipes recipes={features}/>
            {/* Featured Recipes Section */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Featured Recipes
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Editor's pick of the week
                        </p>
                        
                        <div>
                            
                            {features.map(recipe => 
                                <div key={recipe._id}>
                                    <RecipeCard recipe={recipe.recipe} />
                                </div>
                            )}
                        </div>
                    </div>
                    <Link href="/recipe" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        View All →
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    
                </div>
            </div> */}

            {/* Popular Recipes Section with Animation */}
            <PopularRecipes recipes={popularRecipes} />
        </div>
    );
}

export default Popular;