'use client';
import RecipeCard from '@/components/ui/RecipeCard';
//import { getAllRecipe } from '@/lib/actions/allGet';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
// import { getUserSession } from '@/lib/core/session';
// import PaginationForRecipe from '@/components/ui/Pagination';
import RecipeFilter from './RecipeFilter';
import { useRouter } from 'next/navigation';
import { Pagination } from '@heroui/react';

const AllRecipe = ({ filters, recipes, total }) => {
    //const recipes =  getAllRecipe();
    console.log('all recipe: ', recipes);
    //const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    // const [page, setPage] = useState(filters.page || 1);
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [page, setPage] = useState(Number(filters.page) || 1);

    //const totalRecipe = total;
    const totalRecipe = total;
    const itemsPerPage = 2;
    const totalPage = Math.ceil(totalRecipe / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPage - 1, page+1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPage - 2) {
            pages.push("ellipsis");
        }
        pages.push(totalPage);
        console.log(pages, 'pages');
        return pages;

    };
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalRecipe);
    
    
    const router = useRouter();
    useEffect(() => {
        const sp = new URLSearchParams()
        if (searchQuery) {
            sp.set('search', searchQuery)
        }
        if(selectedCategory && selectedCategory !== 'all') {
            sp.set('category', selectedCategory)
        }
        if (page) {
            sp.set('page', page)
        }
        console.log('search params', sp.toString());
        const path = `?${sp.toString()}`
        router.push(path);
    }, [router, searchQuery, selectedCategory, page]);
    
    return (
        <div className={`styles.pageContainer my-2 `}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerInner}>
                        <div>
                            <h1 className={styles.headerTitle}>
                                <span>🍳</span>
                                Recipe Collection
                                
                            </h1>
                            
                            <p className={styles.headerSubtitle}>
                                Discover and explore delicious recipes from our community
                            </p>
                        </div>
                        <div className={styles.recipeCount}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                            <span className={styles.recipeCountText}>
                                {recipes?.length || 0} {recipes?.length === 1 ? 'Recipe' : 'Recipes'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`styles.header rounded-md`}>
                <RecipeFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    
                />
            </div>
            
            {/* Recipe Grid */}
            <div className={styles.gridContainer}>
                {recipes && recipes.length > 0 ? (
                    <>
                        <div className={styles.recipeGrid}>
                            {recipes.map((recipe) => (
                                <div key={recipe._id.toString()} className={styles.cardWrapper}>
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.footer}>
                            Showing {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
                        </div>
                        <Pagination className="w-full flex flex-col items-center text-center mx-auto justify-center">
                            
                                <Pagination.Summary className='mx-auto'>
                                    Showing {startItem}-{endItem} of {totalRecipe} results
                                </Pagination.Summary>
                         
                            
                          
                                <Pagination.Content className='mx-auto'>
                            <Pagination.Item>
                                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                <Pagination.Item key={`ellipsis-${i}`}>
                                    <Pagination.Ellipsis />
                                </Pagination.Item>
                                ) : (
                                <Pagination.Item key={i}>
                                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                    {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                                ),
                            )}
                            <Pagination.Item>
                                <Pagination.Next isDisabled={page === totalPage} onPress={() => setPage((p) => p + 1)}>
                                <span>Next</span>
                                <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                            </Pagination.Content>
                           
                        </Pagination>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className={styles.emptyTitle}>No Recipes Found</h3>
                        <p className={styles.emptyDescription}>
                            We could not find any recipes at the moment. Check back later for delicious new additions!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRecipe;


