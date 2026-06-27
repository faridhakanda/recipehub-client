import Link from 'next/link';
import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-lg w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 text-center">
                {/* 401 Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 flex items-center justify-center animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* Decorative rings */}
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-200 dark:border-yellow-900/50 animate-ping opacity-75"></div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-3">
                    Authentication Required
                </h1>
                <div className="w-20 h-1 bg-linear-to-r from-yellow-500 to-orange-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mb-6">
                    Oops! You need to be logged in to access this page. Please sign in to continue.
                </p>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    <Link 
                        href="/signin"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sign In
                    </Link>
                    <Link 
                        href="/signup"
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        Create Account
                    </Link>
                </div>

                {/* Additional Help */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-4">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mb-3">
                        Don't have an account? Create one in minutes.
                    </p>
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm sm:text-base font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Return to Home
                    </Link>
                </div>

                {/* Status Code */}
                <div className="mt-4 text-xs text-gray-400 dark:text-zinc-600">
                    Error 401 - Unauthorized
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;