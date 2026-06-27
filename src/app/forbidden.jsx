import Link from 'next/link';
import React from 'react';

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-lg w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 text-center">
                {/* 403 Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 flex items-center justify-center animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* Decorative rings */}
                        <div className="absolute inset-0 rounded-full border-4 border-red-200 dark:border-red-900/50 animate-ping opacity-75"></div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-3">
                    Access Forbidden
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mb-6">
                    Oops! You do not have permission to access this page. Please contact your administrator if you believe this is a mistake.
                </p>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Go Home
                    </Link>
                    <Link 
                        href="/recipe"
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Browse Recipes
                    </Link>
                </div>

                

                {/* Status Code */}
                <div className="mt-4 text-xs text-gray-400 dark:text-zinc-600">
                    Error 403 - Forbidden
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;