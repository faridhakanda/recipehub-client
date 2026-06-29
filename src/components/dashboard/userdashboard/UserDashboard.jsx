// src/components/ui/UserDashboard.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const UserDashboard = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { user, stats } = data;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Stats configuration
    const statsData = [
        {
            label: 'Total Recipes',
            value: stats.totalRecipes,
            icon: '📝',
            color: 'blue',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            iconBg: 'bg-blue-100 dark:bg-blue-900/40',
            textColor: 'text-blue-600 dark:text-blue-400',
            href: '/dashboard/user/added-recipe',
        },
        {
            label: 'Purchased',
            value: stats.purchased,
            icon: '🛍️',
            color: 'green',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            iconBg: 'bg-green-100 dark:bg-green-900/40',
            textColor: 'text-green-600 dark:text-green-400',
            href: '/dashboard/user/purchase-recipe',
        },
        {
            label: 'Saved',
            value: stats.saved,
            icon: '🔖',
            color: 'purple',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            iconBg: 'bg-purple-100 dark:bg-purple-900/40',
            textColor: 'text-purple-600 dark:text-purple-400',
            href: '/dashboard/user/saved-recipe',
        },
        {
            label: 'Favorites',
            value: stats.favorites,
            icon: '❤️',
            color: 'red',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            iconBg: 'bg-red-100 dark:bg-red-900/40',
            textColor: 'text-red-600 dark:text-red-400',
            href: '/dashboard/user/favorite-recipe',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Welcome back, {user.name || 'User'}! 👋
                    </p>
                </motion.div>

                {/* User Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {user.name || 'User'}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email || 'user@example.com'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 p-5 hover:shadow-md transition-all"
                        >
                            <Link href={stat.href} className="block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center text-xl`}>
                                        {stat.icon}
                                    </div>
                                    <span className={`text-2xl font-bold text-gray-900 dark:text-white`}>
                                        {stat.value}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    <Link
                        href="/dashboard/user/post-recipe"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium px-4 py-3 rounded-xl transition-colors"
                    >
                        + New Recipe
                    </Link>
                    <Link
                        href="/dashboard/user/added-recipe"
                        className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-center font-medium px-4 py-3 rounded-xl transition-colors"
                    >
                        My Recipes
                    </Link>
                    <Link
                        href="/dashboard/user/favorite-recipe"
                        className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-center font-medium px-4 py-3 rounded-xl transition-colors"
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/dashboard/user/profile"
                        className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-center font-medium px-4 py-3 rounded-xl transition-colors"
                    >
                        Settings
                    </Link>
                </motion.div>

                {/* Bottom Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-8 p-5 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl text-white"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold">{stats.totalRecipes}</div>
                            <div className="text-xs opacity-80 mt-0.5">Recipes</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats.purchased}</div>
                            <div className="text-xs opacity-80 mt-0.5">Purchased</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats.saved}</div>
                            <div className="text-xs opacity-80 mt-0.5">Saved</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats.favorites}</div>
                            <div className="text-xs opacity-80 mt-0.5">Favorites</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default UserDashboard;