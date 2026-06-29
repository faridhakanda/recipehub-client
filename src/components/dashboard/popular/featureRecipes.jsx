// src/components/ui/PopularRecipes.jsx
'use client';

import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const FeatureRecipes = ({ recipes }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { 
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.03,
            y: -5,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
            },
        },
    };

    // Floating animation for section header
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.6,
            },
        },
    };

    if (!recipes || recipes.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No Feature recipes available</p>
                </div>
            </div>
        );
    }

    // Get top 6 recipes
    const popularRecipes = recipes.slice(0, 6);
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            {/* Header with animation */}
            <motion.div
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={headerVariants}
                className="flex justify-between items-center mb-8 md:mb-12"
            >
                <div>
                    <motion.h2 
                        className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        🔥 Features Recipes
                    </motion.h2>
                    <motion.p 
                        className="text-gray-500 dark:text-gray-400 text-sm mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Most loved recipes by our community
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {popularRecipes.length} Recipes
                    </span>
                </motion.div>
            </motion.div>

            {/* Grid with staggered animation */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                {popularRecipes.map((recipe, index) => (
                    <motion.div
                        key={recipe._id?.toString() || index}
                        variants={itemVariants}
                        whileHover="hover"
                        className="h-full"
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        <RecipeCard recipe={recipe.recipe} />
                    </motion.div>
                ))}
            </motion.div>
            
            {/* Decorative bottom element */}
            {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 text-center"
            >
                <Link
                    href="/recipe"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                >
                    <span>View all popular recipes</span>
                    <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </motion.div> */}
        </div>
    );
};

export default FeatureRecipes;