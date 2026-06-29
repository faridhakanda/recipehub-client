import Popular from "@/components/dashboard/popular/popular";
import Banner from "@/components/ui/banner";
import HomeBanner from "@/components/ui/homeBanner";
import RecipeCard from "@/components/ui/RecipeCard";
import { getAllUsers, getPopularRecipe } from "@/lib/actions/allGet";
import { getUserSession, getUserToken } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const users = await getAllUsers();
    console.log(users, 'users');
    const user = await getUserSession();
    console.log('user session', user);
    const userToken = await getUserToken();
    console.log('user token', userToken);
    const url = false;
    const remoteUrl = "https://i.ibb.co.com/gMkB12xv/google.png";

    const popularRecipes = await getPopularRecipe();
  return (
    <div>
        <HomeBanner />
        <Banner />
        {/* <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            
            <Link href={'/recipe'}>
                <Button className={'rounded-md font-bold'}>Explore Recipe</Button>
            </Link>
            
        </div> */}
        {/* Features recipe  */}
        {/* <div className="justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-xl md:text-4xl font-bold">Featured Recipes</h2>
            <div>
                <h2>All features recipe</h2>
            </div>
        </div> */}
        {/* Popular recipe */}
        {/* <div className=" justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-xl md:text-4xl font-bold">Popular Recipes</h2>
            <div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {popularRecipes.map((recipe, index) => (
                        <div 
                            key={recipe._id.toString()} 
                            className="animate-fadeIn"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))}
                </div>
            </div>
        </div> */}
        
        <Popular />
    </div>
  );
}
