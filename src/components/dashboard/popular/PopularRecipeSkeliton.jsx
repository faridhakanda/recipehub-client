// src/components/ui/PopularRecipesSkeleton.jsx
const PopularRecipesSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-32 mt-2 animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-full w-32 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                        <div className="w-full h-56 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
                        <div className="p-4">
                            <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse mb-3"></div>
                            <div className="flex justify-between items-center">
                                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};