
import React from "react";
import { Select, ListBox } from "@heroui/react";
import { ChevronDown, Magnifier, Xmark } from "@gravity-ui/icons";

const listItemClasses =
  "text-gray-700 dark:text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white outline-none data-[focused=true]:bg-gray-100 dark:data-[focused=true]:bg-zinc-900";

const RecipeFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Handle category change
  const handleCategoryChange = (key) => {
    setSelectedCategory(key === "all" ? "" : key);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
      <div className="w-full bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-5 md:p-6 shadow-sm dark:shadow-none transition-all">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Search Field */}
          <div className="w-full md:flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1.5">
              Search Recipe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Magnifier className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by recipe name..."
                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                  aria-label="Clear search"
                >
                  <Xmark className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48 lg:w-56">
            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1.5">
              Category
            </label>
            <Select
              selectedKey={selectedCategory || "all"}
              onSelectionChange={handleCategoryChange}
              aria-label="Filter by category"
              classNames={{
                trigger: "w-full flex items-center justify-between bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent",
                popover: "bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl mt-1 overflow-hidden z-50",
                value: "text-gray-900 dark:text-white",
              }}
            >
              <Select.Trigger>
                <Select.Value>
                  {selectedCategory === "" || selectedCategory === "all" 
                    ? "All Categories" 
                    : selectedCategory}
                </Select.Value>
                <Select.Indicator>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover>
                <ListBox className="outline-none p-1">
                  <ListBox.Item id="all" className={listItemClasses} textValue="All Categories">
                    <span className="flex items-center gap-2">
                      <span>📋</span> All Categories
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="appetizer" className={listItemClasses} textValue="Appetizer">
                    <span className="flex items-center gap-2">
                      <span>🍢</span> Appetizer
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="main-course" className={listItemClasses} textValue="Main Course">
                    <span className="flex items-center gap-2">
                      <span>🍽️</span> Main Course
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="dessert" className={listItemClasses} textValue="Dessert">
                    <span className="flex items-center gap-2">
                      <span>🍰</span> Dessert
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="breakfast" className={listItemClasses} textValue="Breakfast">
                    <span className="flex items-center gap-2">
                      <span>🍳</span> Breakfast
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="lunch" className={listItemClasses} textValue="Lunch">
                    <span className="flex items-center gap-2">
                      <span>🥗</span> Lunch
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="dinner" className={listItemClasses} textValue="Dinner">
                    <span className="flex items-center gap-2">
                      <span>🍝</span> Dinner
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="snack" className={listItemClasses} textValue="Snack">
                    <span className="flex items-center gap-2">
                      <span>🍿</span> Snack
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="soup" className={listItemClasses} textValue="Soup">
                    <span className="flex items-center gap-2">
                      <span>🍜</span> Soup
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="salad" className={listItemClasses} textValue="Salad">
                    <span className="flex items-center gap-2">
                      <span>🥗</span> Salad
                    </span>
                  </ListBox.Item>
                  <ListBox.Item id="beverage" className={listItemClasses} textValue="Beverage">
                    <span className="flex items-center gap-2">
                      <span>🥤</span> Beverage
                    </span>
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Clear All Button - Desktop */}
          {hasActiveFilters && (
            <div className="hidden md:flex items-end">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors flex items-center gap-1 px-2 py-2.5"
              >
                <Xmark className="h-4 w-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <span className="text-xs text-gray-500 dark:text-zinc-400 mr-1">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                  aria-label="Remove search filter"
                >
                  <Xmark className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory && selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs px-2.5 py-1 rounded-full">
                {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors"
                  aria-label="Remove category filter"
                >
                  <Xmark className="h-3 w-3" />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors ml-auto"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFilter;

// import React from "react";
// import {
//   TextField,
//   InputGroup,
//   Select,
//   ListBox,
//   Checkbox,
// } from "@heroui/react";
// import { Magnifier, ChevronDown } from "@gravity-ui/icons";

// const textInputClass =
//   "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
// const selectBoxClass = "w-full flex flex-col gap-1";
// const triggerClasses =
//   "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
// const popoverClasses =
//   "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
// const listItemClasses =
//   "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
// const textAreaClass =
//   "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

// const RecipeFilter = ({
//   searchQuery,
//   setSearchQuery,
//   selectedCategory,
//   setSelectedCategory,
// }) => {
//   return (
//     <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-[24px] border border-zinc-800/80 max-w-7xl mx-auto mb-10">
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
//         {/* 1. Search Text Field - Span 5 columns */}
//         <div className="md:col-span-5">
//           <TextField
//             value={searchQuery}
//             onChange={(value) => setSearchQuery(value)}
//             className="w-full"
//             aria-label="Search recipes"
//             label="Search Recipe"
//             labelPlacement="outside"
//           >
//             <span className="text-sm font-medium text-zinc-100 block mb-2">
//               Search Recipe
//             </span>
//             <InputGroup className="bg-zinc-800 border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all w-full">
//               <InputGroup.Prefix className="pl-3 text-white">
//                 <Magnifier className="w-4 h-4" />
//               </InputGroup.Prefix>
//               <InputGroup.Input
//                 placeholder="Recipe Name..."
//                 className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
//               />
//             </InputGroup>
//           </TextField>

//           {/* 3. Category Select Filter - Span 3 columns */}
//           <div className="md:col-span-3">
//             <span className="text-sm font-medium text-zinc-400 block mb-2">
//               Category
//             </span>
//             <Select
//               selectedKey={selectedCategory}
//               onSelectionChange={(key) => setSelectedCategory(key)}
//             >
//               <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
//                 <Select.Value>
//                   {selectedCategory === ""
//                     ? "All Categories"
//                     : selectedCategory}
//                 </Select.Value>
//                 <Select.Indicator>
//                   <ChevronDown className="w-4 h-4 text-zinc-400" />
//                 </Select.Indicator>
//               </Select.Trigger>

//               <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
//                 <ListBox className="outline-none">
//                   <ListBox.Item
//                     label="all"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="all"
//                     className={listItemClasses}
//                     textValue="AllCategory"
//                   >
//                     All Category
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="appetizer"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="appetizer"
//                     className={listItemClasses}
//                     textValue="Appetizer"
//                   >
//                     Appetizer
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="main-course"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="main-course"
//                     className={listItemClasses}
//                     textValue="Main Course"
//                   >
//                     Main Course
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="dessert"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="dessert"
//                     className={listItemClasses}
//                     textValue="Dessert"
//                   >
//                     Dessert
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="breakfast"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="breakfast"
//                     className={listItemClasses}
//                     textValue="Breakfast"
//                   >
//                     Breakfast
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="lunch"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="lunch"
//                     className={listItemClasses}
//                     textValue="Lunch"
//                   >
//                     Lunch
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="dinner"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="dinner"
//                     className={listItemClasses}
//                     textValue="Dinner"
//                   >
//                     Dinner
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="snack"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="snack"
//                     className={listItemClasses}
//                     textValue="Snack"
//                   >
//                     Snack
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="soup"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="soup"
//                     className={listItemClasses}
//                     textValue="Soup"
//                   >
//                     Soup
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="salad"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="salad"
//                     className={listItemClasses}
//                     textValue="Salad"
//                   >
//                     Salad
//                   </ListBox.Item>
//                   <ListBox.Item
//                     label="beverage"
//                     aria-label="search category"
//                     labelPlacement="outside"
//                     id="beverage"
//                     className={listItemClasses}
//                     textValue="Beverage"
//                   >
//                     Beverage
//                   </ListBox.Item>
//                 </ListBox>
//               </Select.Popover>
//             </Select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeFilter;
