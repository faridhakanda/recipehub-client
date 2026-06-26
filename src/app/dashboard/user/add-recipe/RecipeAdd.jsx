'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { postRecipe } from '@/lib/actions/allPost';
import { Button, FieldError, Fieldset, Form, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import { ArrowUpToLine, Check, CheckShape, ChevronDown, Clock } from '@gravity-ui/icons';

// Layout Shared Style Constants - Dark/Light Mode Compatible
const textInputClass = "w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-blue-500 dark:focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-gray-400 dark:data-[hover=true]:border-zinc-700 [&>span]:text-gray-900 dark:[&>span]:text-white";
const popoverClasses = "bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-gray-700 dark:text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white outline-none data-[focused=true]:bg-gray-100 dark:data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-white rounded-lg p-3 outline-none placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-blue-500 dark:focus:border-zinc-700 transition resize-none";

// Custom Select Value style
const selectValueClass = "text-gray-900 dark:text-white";

const RecipePost = ({ user }) => {
    const [recipe, setRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, image: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setImageUrl(data.data.url);
                setErrors(prev => ({ ...prev, image: null }));
            } else {
                setErrors(prev => ({ ...prev, image: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, image: "Network error during image upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const recipeName = formData.get('recipeName');
        const category = formData.get('category');
        const cuisineType = formData.get('cuisineType');
        const difficultyLevel = formData.get('difficultyLevel');
        const preparationTime = formData.get('preparationTime');
        const ingredients = formData.get('ingredients');
        const instructions = formData.get('instructions');

        const newErrors = {};
        if (!recipeName) newErrors.recipeName = "Recipe name is required";
        if (!category) newErrors.category = "Category is required";
        if (!cuisineType) newErrors.cuisineType = "Cuisine type is required";
        if (!difficultyLevel) newErrors.difficultyLevel = "Difficulty level is required";
        if (!preparationTime) newErrors.preparationTime = "Preparation time is required";
        if (!ingredients) newErrors.ingredients = "Ingredients are required";
        if (!instructions) newErrors.instructions = "Instructions are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newRecipeData = {
            recipeName,
            recipeImage: imageUrl || '',
            category,
            cuisineType,
            difficultyLevel,
            preparationTime,
            ingredients: ingredients.split('\n').filter(item => item.trim() !== ''),
            instructions: instructions.split('\n').filter(item => item.trim() !== ''),
            authorId: user?.id,
            authorName: user?.name,
            authorEmail: user?.email,
            likesCount: 0,
            isFeatured: false,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        setRecipe(newRecipeData);
        console.log("Submitted Recipe Data:", newRecipeData);

        const payload = await postRecipe(newRecipeData);
        
        if(payload.insertedId) {
            const savedRecipe = {...newRecipeData, _id: payload.insertedId};
            redirect('/recipe');
            setRecipe(savedRecipe);
        }

        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 md:p-8 shadow-sm dark:shadow-none">
            <Form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-5 sm:space-y-6 w-full">
                    <legend className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-zinc-100 border-b border-gray-200 dark:border-zinc-800 w-full pb-3 mb-2 flex items-center gap-2">
                        <Check size={20} className="text-gray-500 dark:text-zinc-400" />
                        <span>{recipe ? 'Update Recipe' : 'Create New Recipe'}</span>
                    </legend>
                    
                    {/* ROW 1: Recipe Name + Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <TextField 
                            name="recipeName" 
                            defaultValue={recipe?.recipeName || ''} 
                            isInvalid={!!errors.recipeName} 
                            className="flex flex-col gap-1 w-full"
                        >
                            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm">Recipe Name</Label>
                            <Input placeholder="e.g. Spaghetti Carbonara" className={textInputClass} />
                            {errors.recipeName && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.recipeName}</FieldError>}
                        </TextField>

                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm mb-1 block">Category</Label>
                            <Select 
                                className="w-full" 
                                name="category" 
                                defaultSelectedKeys={[recipe?.category || '']}
                                isInvalid={!!errors.category}
                                aria-label="Category"
                            >
                                <Select.Trigger className={`${triggerClasses} text-gray-900 dark:text-white`}>
                                    <Select.Value className="text-gray-900 dark:text-white" />
                                    <Select.Indicator><ChevronDown size={16} className="text-gray-500 dark:text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="appetizer" className={listItemClasses} textValue="Appetizer">Appetizer</ListBox.Item>
                                        <ListBox.Item id="main-course" className={listItemClasses} textValue="Main Course">Main Course</ListBox.Item>
                                        <ListBox.Item id="dessert" className={listItemClasses} textValue="Dessert">Dessert</ListBox.Item>
                                        <ListBox.Item id="breakfast" className={listItemClasses} textValue="Breakfast">Breakfast</ListBox.Item>
                                        <ListBox.Item id="lunch" className={listItemClasses} textValue="Lunch">Lunch</ListBox.Item>
                                        <ListBox.Item id="dinner" className={listItemClasses} textValue="Dinner">Dinner</ListBox.Item>
                                        <ListBox.Item id="snack" className={listItemClasses} textValue="Snack">Snack</ListBox.Item>
                                        <ListBox.Item id="soup" className={listItemClasses} textValue="Soup">Soup</ListBox.Item>
                                        <ListBox.Item id="salad" className={listItemClasses} textValue="Salad">Salad</ListBox.Item>
                                        <ListBox.Item id="beverage" className={listItemClasses} textValue="Beverage">Beverage</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            {errors.category && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.category}</FieldError>}
                        </div>
                    </div>

                    {/* ROW 2: Cuisine Type + Difficulty Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm mb-1 block">Cuisine Type</Label>
                            <Select 
                                className="w-full" 
                                name="cuisineType" 
                                defaultSelectedKeys={[recipe?.cuisineType || '']}
                                isInvalid={!!errors.cuisineType}
                                aria-label="Cuisine Type"
                            >
                                <Select.Trigger className={`${triggerClasses} text-gray-900 dark:text-white`}>
                                    <Select.Value className="text-gray-900 dark:text-white" />
                                    <Select.Indicator><ChevronDown size={16} className="text-gray-500 dark:text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="italian" className={listItemClasses} textValue="Italian">Italian</ListBox.Item>
                                        <ListBox.Item id="chinese" className={listItemClasses} textValue="Chinese">Chinese</ListBox.Item>
                                        <ListBox.Item id="mexican" className={listItemClasses} textValue="Mexican">Mexican</ListBox.Item>
                                        <ListBox.Item id="indian" className={listItemClasses} textValue="Indian">Indian</ListBox.Item>
                                        <ListBox.Item id="japanese" className={listItemClasses} textValue="Japanese">Japanese</ListBox.Item>
                                        <ListBox.Item id="thai" className={listItemClasses} textValue="Thai">Thai</ListBox.Item>
                                        <ListBox.Item id="french" className={listItemClasses} textValue="French">French</ListBox.Item>
                                        <ListBox.Item id="mediterranean" className={listItemClasses} textValue="Mediterranean">Mediterranean</ListBox.Item>
                                        <ListBox.Item id="american" className={listItemClasses} textValue="American">American</ListBox.Item>
                                        <ListBox.Item id="other" className={listItemClasses} textValue="Other">Other</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            {errors.cuisineType && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.cuisineType}</FieldError>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm mb-1 block">Difficulty Level</Label>
                            <Select
                                className="w-full" 
                                name="difficultyLevel" 
                                defaultSelectedKeys={[recipe?.difficultyLevel || '']}
                                isInvalid={!!errors.difficultyLevel}
                                aria-label="Difficulty Level"
                            >
                                <Select.Trigger className={`${triggerClasses} text-gray-900 dark:text-white`}>
                                    <Select.Value className="text-gray-900 dark:text-white" />
                                    <Select.Indicator><ChevronDown size={16} className="text-gray-500 dark:text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="easy" className={listItemClasses} textValue="Easy">Easy</ListBox.Item>
                                        <ListBox.Item id="medium" className={listItemClasses} textValue="Medium">Medium</ListBox.Item>
                                        <ListBox.Item id="hard" className={listItemClasses} textValue="Hard">Hard</ListBox.Item>
                                        <ListBox.Item id="expert" className={listItemClasses} textValue="Expert">Expert</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            {errors.difficultyLevel && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.difficultyLevel}</FieldError>}
                        </div>
                    </div>

                    {/* ROW 3: Preparation Time + Recipe Image Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
                        <TextField 
                            name="preparationTime" 
                            defaultValue={recipe?.preparationTime || ''} 
                            isInvalid={!!errors.preparationTime} 
                            className="flex flex-col gap-1 w-full"
                        >
                            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm">Preparation Time</Label>
                            <div className="relative flex items-center">
                                <Clock size={16} className="absolute left-3 text-gray-500 dark:text-zinc-500 pointer-events-none z-10" />
                                <Input placeholder="e.g. 30 minutes" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.preparationTime && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.preparationTime}</FieldError>}
                        </TextField>

                        {/* Recipe Image Upload Block */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-gray-700 dark:text-zinc-300 font-medium text-sm">Recipe Image</span>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-1">
                                <label className="w-12 h-12 sm:w-14 sm:h-14 border border-dashed border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 bg-gray-50 dark:bg-zinc-800/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/webp" 
                                        onChange={handleImageUpload} 
                                        className="hidden" 
                                    />
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Recipe Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-gray-400 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-300 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                        {isUploading ? 'Uploading image...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                                    {errors.image && <span className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.image}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Ingredients TextArea */}
                    <TextField 
                        name="ingredients" 
                        defaultValue={recipe?.ingredients?.join('\n') || ''} 
                        isInvalid={!!errors.ingredients}
                        className="flex flex-col gap-1 w-full"
                    >
                        <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm">Ingredients</Label>
                        <TextArea
                            placeholder="List each ingredient on a new line&#10;e.g.&#10;200g Pasta&#10;2 Eggs&#10;100g Parmesan Cheese&#10;4 slices Bacon"
                            rows={5}
                            className={textAreaClass}
                        />
                        <span className="text-xs text-gray-500 dark:text-zinc-500">Separate each ingredient with a new line</span>
                        {errors.ingredients && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.ingredients}</FieldError>}
                    </TextField>

                    {/* ROW 5: Instructions TextArea */}
                    <TextField 
                        name="instructions" 
                        defaultValue={recipe?.instructions?.join('\n') || ''} 
                        isInvalid={!!errors.instructions}
                        className="flex flex-col gap-1 w-full"
                    >
                        <Label className="text-gray-700 dark:text-zinc-300 font-medium text-sm">Instructions</Label>
                        <TextArea
                            placeholder="List each step on a new line&#10;e.g.&#10;1. Boil water in a large pot&#10;2. Cook pasta according to package directions&#10;3. Fry bacon until crispy&#10;4. Mix eggs and cheese in a bowl"
                            rows={6}
                            className={textAreaClass}
                        />
                        <span className="text-xs text-gray-500 dark:text-zinc-500">Separate each step with a new line</span>
                        {errors.instructions && <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.instructions}</FieldError>}
                    </TextField>
                </Fieldset>

                {/* Form Navigation Action Area controls */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-gray-200 dark:border-zinc-800 w-full">
                    {recipe && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg px-5 font-medium h-11 order-2 sm:order-1"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg px-6 transition-colors h-11 flex items-center justify-center gap-2 order-1 sm:order-2"
                    >
                        <CheckShape size={18} />
                        {recipe ? 'Update Recipe' : 'Publish Recipe'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default RecipePost;


// 'use client';

// import React, { useState } from 'react';

// import Image from 'next/image';
// import { redirect } from 'next/navigation';
// import { postRecipe } from '@/lib/actions/allPost';
// import { Button, FieldError, Fieldset, Form, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
// import { ArrowUpToLine, Check, CheckShape, ChevronDown, Clock } from '@gravity-ui/icons';

// // Layout Shared Style Constants matching your design image
// const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
// const selectBoxClass = "w-full flex flex-col gap-1";
// const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
// const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
// const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
// const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

// const RecipePost = ({ user }) => {
//     // 1. Core State
//     const [recipe, setRecipe] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [errors, setErrors] = useState({});
    
//     // Auxiliary Upload States
//     const [imageUrl, setImageUrl] = useState('');
//     const [isUploading, setIsUploading] = useState(false);

//     // 2. Client side Imgbb Upload Handler
//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // Simple Validation
//         if (file.size > 5 * 1024 * 1024) {
//             setErrors(prev => ({ ...prev, image: "File size exceeds 5MB limit" }));
//             return;
//         }

//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
//             const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//                 method: 'POST',
//                 body: formData
//             });
//             const data = await response.json();
            
//             if (data.success) {
//                 setImageUrl(data.data.url);
//                 setErrors(prev => ({ ...prev, image: null }));
//             } else {
//                 setErrors(prev => ({ ...prev, image: "Upload failed. Try again." }));
//             }
//         } catch (err) {
//             setErrors(prev => ({ ...prev, image: "Network error during image upload" }));
//         } finally {
//             setIsUploading(false);
//         }
//     };
//     console.log('user information in recipe post page: ', user, user?.id, user?.name, user?.email);
//     // 3. Submit Recipe Form Data
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
        
//         const recipeName = formData.get('recipeName');
//         const category = formData.get('category');
//         const cuisineType = formData.get('cuisineType');
//         const difficultyLevel = formData.get('difficultyLevel');
//         const preparationTime = formData.get('preparationTime');
//         const ingredients = formData.get('ingredients');
//         const instructions = formData.get('instructions');

//         // Simple validation checks
//         const newErrors = {};
//         if (!recipeName) newErrors.recipeName = "Recipe name is required";
//         if (!category) newErrors.category = "Category is required";
//         if (!cuisineType) newErrors.cuisineType = "Cuisine type is required";
//         if (!difficultyLevel) newErrors.difficultyLevel = "Difficulty level is required";
//         if (!preparationTime) newErrors.preparationTime = "Preparation time is required";
//         if (!ingredients) newErrors.ingredients = "Ingredients are required";
//         if (!instructions) newErrors.instructions = "Instructions are required";

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         // Prepare recipe data
//         const newRecipeData = {
//             recipeName,
//             recipeImage: imageUrl || '',
//             category,
//             cuisineType,
//             difficultyLevel,
//             preparationTime,
//             ingredients: ingredients.split('\n').filter(item => item.trim() !== ''),
//             instructions: instructions.split('\n').filter(item => item.trim() !== ''),
//             authorId: user?.id,
//             authorName: user?.name,
//             authorEmail: user?.email,
//             likesCount: 0,
//             isFeatured: false,
//             status: 'Pending',
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//         };
        
//         setRecipe(newRecipeData);
        
//         console.log("Submitted Recipe Data:", newRecipeData);

//         const payload = await postRecipe(newRecipeData);
        
//         if(payload.insertedId) {
//             const savedRecipe = {...newRecipeData, _id: payload.insertedId};
//             redirect('/recipe');
//             setRecipe(savedRecipe);
//         }

//         setErrors({});
//         setIsEditing(false);
//     };

//     // 4. State Toggle helper triggers
//     const startEditing = () => {
//         setImageUrl(recipe?.recipeImage || '');
//         setIsEditing(true);
//     };
    
//     // --- Main View Structure ---
//     return (
//         <div className="max-w-4xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
//             <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
//                 <Fieldset className="space-y-6 w-full">
//                     <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2 flex items-center gap-2">
//                         <Check size={20} className="text-zinc-400" />
//                         {recipe ? 'Update Recipe' : 'Create New Recipe'}
//                     </legend>
                    
//                     {/* ROW 1: Recipe Name + Category */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <TextField 
//                             name="recipeName" 
//                             defaultValue={recipe?.recipeName || ''} 
//                             isInvalid={!!errors.recipeName} 
//                             className="flex flex-col gap-1 w-full"
//                         >
//                             <Label className="text-zinc-400 font-medium text-sm">Recipe Name</Label>
//                             <Input placeholder="e.g. Spaghetti Carbonara" className={textInputClass} />
//                             {errors.recipeName && <FieldError className="text-xs text-danger mt-1">{errors.recipeName}</FieldError>}
//                         </TextField>

//                         <Select 
//                             className={selectBoxClass} 
//                             name="category" 
//                             defaultSelectedKeys={[recipe?.category || '']}
//                             isInvalid={!!errors.category}
//                         >
//                             <Label className="text-zinc-400 font-medium text-sm mb-1 block">Category</Label>
//                             <Select.Trigger className={triggerClasses}>
//                                 <Select.Value className="text-white placeholder:text-zinc-600" />
//                                 <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
//                             </Select.Trigger>
//                             <Select.Popover className={popoverClasses}>
//                                 <ListBox className="outline-none">
//                                     <ListBox.Item id="appetizer" className={listItemClasses} textValue="Appetizer">Appetizer</ListBox.Item>
//                                     <ListBox.Item id="main-course" className={listItemClasses} textValue="Main Course">Main Course</ListBox.Item>
//                                     <ListBox.Item id="dessert" className={listItemClasses} textValue="Dessert">Dessert</ListBox.Item>
//                                     <ListBox.Item id="breakfast" className={listItemClasses} textValue="Breakfast">Breakfast</ListBox.Item>
//                                     <ListBox.Item id="lunch" className={listItemClasses} textValue="Lunch">Lunch</ListBox.Item>
//                                     <ListBox.Item id="dinner" className={listItemClasses} textValue="Dinner">Dinner</ListBox.Item>
//                                     <ListBox.Item id="snack" className={listItemClasses} textValue="Snack">Snack</ListBox.Item>
//                                     <ListBox.Item id="soup" className={listItemClasses} textValue="Soup">Soup</ListBox.Item>
//                                     <ListBox.Item id="salad" className={listItemClasses} textValue="Salad">Salad</ListBox.Item>
//                                     <ListBox.Item id="beverage" className={listItemClasses} textValue="Beverage">Beverage</ListBox.Item>
//                                 </ListBox>
//                             </Select.Popover>
//                             {errors.category && <FieldError className="text-xs text-danger mt-1">{errors.category}</FieldError>}
//                         </Select>
//                     </div>

//                     {/* ROW 2: Cuisine Type + Difficulty Level */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <Select 
//                             className={selectBoxClass} 
//                             name="cuisineType" 
//                             defaultSelectedKeys={[recipe?.cuisineType || '']}
//                             isInvalid={!!errors.cuisineType}
//                         >
//                             <Label className="text-zinc-400 font-medium text-sm mb-1 block">Cuisine Type</Label>
//                             <Select.Trigger className={triggerClasses}>
//                                 <Select.Value className="text-white" />
//                                 <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
//                             </Select.Trigger>
//                             <Select.Popover className={popoverClasses}>
//                                 <ListBox className="outline-none">
//                                     <ListBox.Item id="italian" className={listItemClasses} textValue="Italian">Italian</ListBox.Item>
//                                     <ListBox.Item id="chinese" className={listItemClasses} textValue="Chinese">Chinese</ListBox.Item>
//                                     <ListBox.Item id="mexican" className={listItemClasses} textValue="Mexican">Mexican</ListBox.Item>
//                                     <ListBox.Item id="indian" className={listItemClasses} textValue="Indian">Indian</ListBox.Item>
//                                     <ListBox.Item id="japanese" className={listItemClasses} textValue="Japanese">Japanese</ListBox.Item>
//                                     <ListBox.Item id="thai" className={listItemClasses} textValue="Thai">Thai</ListBox.Item>
//                                     <ListBox.Item id="french" className={listItemClasses} textValue="French">French</ListBox.Item>
//                                     <ListBox.Item id="mediterranean" className={listItemClasses} textValue="Mediterranean">Mediterranean</ListBox.Item>
//                                     <ListBox.Item id="american" className={listItemClasses} textValue="American">American</ListBox.Item>
//                                     <ListBox.Item id="other" className={listItemClasses} textValue="Other">Other</ListBox.Item>
//                                 </ListBox>
//                             </Select.Popover>
//                             {errors.cuisineType && <FieldError className="text-xs text-danger mt-1">{errors.cuisineType}</FieldError>}
//                         </Select>

//                         <Select
//                             className={selectBoxClass} 
//                             name="difficultyLevel" 
//                             defaultSelectedKeys={[recipe?.difficultyLevel || '']}
//                             isInvalid={!!errors.difficultyLevel}
//                         >
//                             <Label className="text-zinc-400 font-medium text-sm mb-1 block">Difficulty Level</Label>
//                             <Select.Trigger className={triggerClasses}>
//                                 <Select.Value className="text-white" />
//                                 <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
//                             </Select.Trigger>
//                             <Select.Popover className={popoverClasses}>
//                                 <ListBox className="outline-none">
//                                     <ListBox.Item id="easy" className={listItemClasses} textValue="Easy">Easy</ListBox.Item>
//                                     <ListBox.Item id="medium" className={listItemClasses} textValue="Medium">Medium</ListBox.Item>
//                                     <ListBox.Item id="hard" className={listItemClasses} textValue="Hard">Hard</ListBox.Item>
//                                     <ListBox.Item id="expert" className={listItemClasses} textValue="Expert">Expert</ListBox.Item>
//                                 </ListBox>
//                             </Select.Popover>
//                             {errors.difficultyLevel && <FieldError className="text-xs text-danger mt-1">{errors.difficultyLevel}</FieldError>}
//                         </Select>
//                     </div>

//                     {/* ROW 3: Preparation Time + Recipe Image Upload */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//                         <TextField 
//                             name="preparationTime" 
//                             defaultValue={recipe?.preparationTime || ''} 
//                             isInvalid={!!errors.preparationTime} 
//                             className="flex flex-col gap-1 w-full"
//                         >
//                             <Label className="text-zinc-400 font-medium text-sm">Preparation Time</Label>
//                             <div className="relative flex items-center">
//                                 <Clock size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
//                                 <Input placeholder="e.g. 30 minutes" className={`${textInputClass} pl-10`} />
//                             </div>
//                             {errors.preparationTime && <FieldError className="text-xs text-danger mt-1">{errors.preparationTime}</FieldError>}
//                         </TextField>

//                         {/* Recipe Image Upload Block */}
//                         <div className="flex flex-col gap-1 w-full">
//                             <span className="text-zinc-400 font-medium text-sm">Recipe Image</span>
//                             <div className="flex items-center gap-4 mt-1">
//                                 <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
//                                     <input 
//                                         type="file" 
//                                         accept="image/png, image/jpeg, image/webp" 
//                                         onChange={handleImageUpload} 
//                                         className="hidden" 
//                                     />
//                                     {imageUrl ? (
//                                         <img src={imageUrl} alt="Recipe Preview" className="w-full h-full object-cover" />
//                                     ) : (
//                                         <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
//                                     )}
//                                 </label>
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-medium text-zinc-300">
//                                         {isUploading ? 'Uploading image...' : 'Upload image'}
//                                     </span>
//                                     <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
//                                     {errors.image && <span className="text-xs text-danger mt-1">{errors.image}</span>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ROW 4: Ingredients TextArea */}
//                     <TextField 
//                         name="ingredients" 
//                         defaultValue={recipe?.ingredients?.join('\n') || ''} 
//                         isInvalid={!!errors.ingredients}
//                         className="flex flex-col gap-1 w-full"
//                     >
//                         <Label className="text-zinc-400 font-medium text-sm">Ingredients</Label>
//                         <TextArea
//                             placeholder="List each ingredient on a new line&#10;e.g.&#10;200g Pasta&#10;2 Eggs&#10;100g Parmesan Cheese&#10;4 slices Bacon"
//                             rows={5}
//                             className={textAreaClass}
//                         />
//                         <span className="text-xs text-zinc-500">Separate each ingredient with a new line</span>
//                         {errors.ingredients && <FieldError className="text-xs text-danger mt-1">{errors.ingredients}</FieldError>}
//                     </TextField>

//                     {/* ROW 5: Instructions TextArea */}
//                     <TextField 
//                         name="instructions" 
//                         defaultValue={recipe?.instructions?.join('\n') || ''} 
//                         isInvalid={!!errors.instructions}
//                         className="flex flex-col gap-1 w-full"
//                     >
//                         <Label className="text-zinc-400 font-medium text-sm">Instructions</Label>
//                         <TextArea
//                             placeholder="List each step on a new line&#10;e.g.&#10;1. Boil water in a large pot&#10;2. Cook pasta according to package directions&#10;3. Fry bacon until crispy&#10;4. Mix eggs and cheese in a bowl"
//                             rows={6}
//                             className={textAreaClass}
//                         />
//                         <span className="text-xs text-zinc-500">Separate each step with a new line</span>
//                         {errors.instructions && <FieldError className="text-xs text-danger mt-1">{errors.instructions}</FieldError>}
//                     </TextField>
//                 </Fieldset>

//                 {/* Form Navigation Action Area controls */}
//                 <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
//                     {recipe && (
//                         <Button
//                             type="button"
//                             variant="bordered"
//                             onPress={() => setIsEditing(false)}
//                             className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
//                         >
//                             Cancel
//                         </Button>
//                     )}
//                     <Button
//                         type="submit"
//                         className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11 flex items-center gap-2"
//                     >
//                         <CheckShape size={18} />
//                         {recipe ? 'Update Recipe' : 'Publish Recipe'}
//                     </Button>
//                 </div>
//             </Form>
//         </div>
//     );
// }

// export default RecipePost;