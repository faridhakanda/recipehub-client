// "use client";

// import {Pagination} from "@heroui/react";
// import {useState} from "react";

// const PaginationForRecipe = () => {
//   const [page, setPage] = useState(1);
//   const totalPages = 12;
  
//   const getPageNumbers = () => {
//     const pages = [];

//     pages.push(1);
    
//     if (page > 3) {
//       pages.push("ellipsis");
//     }

//     const start = Math.max(2, page - 1);
//     const end = Math.min(totalPages - 1, page + 1);

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     if (page < totalPages - 2) {
//       pages.push("ellipsis");
//     }

//     pages.push(totalPages);
    
//     return pages;
//   };

//   return (
//     <div className="w-full mx-auto max-w-2xs  sm:max-w-full">
//       <Pagination className="justify-center">
//         <Pagination.Content>
//           <Pagination.Item>
//             <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
//               <Pagination.PreviousIcon />
//               <span>Previous</span>
//             </Pagination.Previous>
//           </Pagination.Item>
//           {getPageNumbers().map((p, i) =>
//             p === "ellipsis" ? (
//               <Pagination.Item key={`ellipsis-${i}`}>
//                 <Pagination.Ellipsis />
//               </Pagination.Item>
//             ) : (
//               <Pagination.Item key={p}>
//                 <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
//                   {p}
//                 </Pagination.Link>
//               </Pagination.Item>
//             ),
//           )}
//           <Pagination.Item>
//             <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
//               <span>Next</span>
//               <Pagination.NextIcon />
//             </Pagination.Next>
//           </Pagination.Item>
//         </Pagination.Content>
//       </Pagination>
//     </div>
//   );
// }

// export default PaginationForRecipe;



"use client";

import { Pagination } from "@heroui/react";
import { useState } from "react";

const PaginationForRecipe = ({ 
    currentPage = 1, 
    totalPages = 1, 
    onPageChange,
    itemsPerPage = 6,
    totalItems = 0
}) => {
    const [page, setPage] = useState(currentPage);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    const getPageNumbers = () => {
        const pages = [];

        // Always show first page
        pages.push(1);

        // Add ellipsis if current page is far from first
        if (page > 3) {
            pages.push("ellipsis");
        }

        // Show pages around current page
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        // Add ellipsis if current page is far from last
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    // Don't render pagination if only one page
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="w-full mx-auto mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow-sm px-4 py-3 sm:px-6">
                {/* Items info */}
                <div className="text-sm text-gray-600 order-2 sm:order-1">
                    <span className="font-medium">
                        {totalItems > 0 ? (
                            <>
                                Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} recipes
                            </>
                        ) : (
                            'No recipes found'
                        )}
                    </span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-1 order-1 sm:order-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            page === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((p, index) =>
                            p === "ellipsis" ? (
                                <span 
                                    key={`ellipsis-${index}`} 
                                    className="px-2 py-1 text-gray-400"
                                >
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => handlePageChange(p)}
                                    className={`min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        p === page
                                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                >
                                    {p}
                                </button>
                            )
                        )}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            page === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                    >
                        <span className="hidden sm:inline">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationForRecipe;