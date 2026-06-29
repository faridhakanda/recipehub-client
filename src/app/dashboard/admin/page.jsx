// app/dashboard/admin/page.jsx
import { getAllRecipe, getAllUsers } from '@/lib/actions/allGet';
import Link from 'next/link';

const AdminPage = async () => {
    const users = await getAllUsers();
    const recipes = await getAllRecipe();

    // Stats data
    const stats = [
        {
            title: 'Total Users',
            count: users?.length || 0,
            icon: '👥',
            color: 'blue',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            iconBg: 'bg-blue-100 dark:bg-blue-900/40',
            textColor: 'text-blue-600 dark:text-blue-400',
            borderColor: 'border-blue-200 dark:border-blue-800',
            href: '/dashboard/admin/users',
            description: 'Registered users on platform',
        },
        {
            title: 'Total Recipes',
            count: recipes?.length || 0,
            icon: '📝',
            color: 'green',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            iconBg: 'bg-green-100 dark:bg-green-900/40',
            textColor: 'text-green-600 dark:text-green-400',
            borderColor: 'border-green-200 dark:border-green-800',
            href: '/dashboard/admin/recipes',
            description: 'Recipes shared by users',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Page Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                        Overview of platform statistics
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <Link 
                            key={stat.title}
                            href={stat.href}
                            className="block group"
                        >
                            <div 
                                className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border ${stat.borderColor} p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Title */}
                                        <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">
                                            {stat.title}
                                        </p>
                                        
                                        {/* Count */}
                                        <div className="mt-2 flex items-baseline gap-2">
                                            <span className={`text-3xl sm:text-4xl md:text-5xl font-bold ${stat.textColor}`}>
                                                {stat.count}
                                            </span>
                                            <span className="text-sm text-gray-400 dark:text-gray-500">
                                                total
                                            </span>
                                        </div>
                                        
                                        {/* Description */}
                                        <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            {stat.description}
                                        </p>
                                    </div>
                                    
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center text-2xl sm:text-3xl md:text-4xl`}>
                                        {stat.icon}
                                    </div>
                                </div>

                                {/* Bottom indicator */}
                                <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <span>View details</span>
                                    <svg 
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions / Additional Info */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            📊 Quick Stats
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>• {users?.length || 0} total users</p>
                            <p>• {recipes?.length || 0} total recipes</p>
                            <p>• {recipes?.filter(r => r.status === 'Pending')?.length || 0} pending recipes</p>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ⚡ Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <Link 
                                href="/dashboard/admin/users" 
                                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Manage Users →
                            </Link>
                            <Link 
                                href="/dashboard/admin/recipes" 
                                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Manage Recipes →
                            </Link>
                            <Link 
                                href="/dashboard/admin" 
                                className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Review Users and Recipes →
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            📈 Recent Activity
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>• Latest user joined: {users?.length > 0 ? new Date(users[users.length - 1]?.createdAt).toLocaleDateString() : 'N/A'}</p>
                            <p>• Latest recipe added: {recipes?.length > 0 ? new Date(recipes[recipes.length - 1]?.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Decorative footer */}
                <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-zinc-800 pt-6">
                    <p>Admin Dashboard • {new Date().getFullYear()}</p>
                </div>

            </div>
        </div>
    );
};

export default AdminPage;
// import { getAllRecipe, getAllUsers } from '@/lib/actions/allGet';

// import UserCard from './ui/UserCard';

// const AdminPage = async () => {
//     const users = await getAllUsers();
//     const recipes = await getAllRecipe();
//     // Convert users to plain objects for client component
    

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 md:py-12">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2>Total User: {users.length}</h2>
//             <h2>Total Recipes: {recipes.length}</h2>
                
//             </div>
//         </div>
//     );
// };

// export default AdminPage;