// app/user/page.jsx
import { getUserAllRecipeByUserId, myPurchaseRecipe, recipeFavoriteByUser, recipeLikeByUser, recipeSaveByUser } from '@/lib/actions/allGet';
import { getUserSession } from '@/lib/core/session';
import UserDashboard from './UserDashboard';
import Link from 'next/link';

const UserDashBoardHomePage = async () => {
    const user = await getUserSession();
    
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Please Login</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">You need to be logged in to view your dashboard</p>
                    <Link 
                        href={`/signin?redirect=dashboard/user`} 
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    // Fetch all data in parallel
    const [recipeLike, recipeSave, recipeFavorite, myPurchaseRecipes, myAddedRecipe] = await Promise.all([
        recipeLikeByUser(user?.id),
        recipeSaveByUser(user?.id),
        recipeFavoriteByUser(user?.id),
        myPurchaseRecipe(user?.id),
        getUserAllRecipeByUserId(user?.id),
    ]);

    const dashboardData = {
        user: {
            id: user.id,
            name: user.name || 'User',
            email: user.email || '',
        },
        stats: {
            totalRecipes: myAddedRecipe?.length || 0,
            purchased: myPurchaseRecipes?.data?.length || 0,
            saved: recipeSave?.data?.length || 0,
            favorites: recipeFavorite?.data?.length || 0,
        },
    };

    return <UserDashboard data={dashboardData} />;
};

export default UserDashBoardHomePage;