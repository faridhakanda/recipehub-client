'use client';
import { postRecipe } from '@/lib/actions/allPost';
// import { ArrowUpToLine, Globe } from '@gravity-ui/icons';
// import { Button, FieldError, Input, Label, TextArea, TextField } from '@heroui/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox, 
    Button, 
    toast
} from '@heroui/react';
import { ArrowUpToLine, Globe, Factory, ArrowRight, Pencil, ChevronDown } from '@gravity-ui/icons';
const PostRecipeForm = ({ user }) => {
    console.log('user in add-recipe file: ', user);
    // const [errors, setErrors] = useState({});
    // const [ logoUrl, setLogoUrl ] = useState('');
    // const [isUploading, setIsUploading] = useState(false);
    // // for recipe image upload
    // const handleLogoUpload = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     // Simple Validation
    //     if (file.size > 5 * 1024 * 1024) {
    //         setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
    //         return;
    //     }

    //     setIsUploading(true);
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     try {
    //         // Replace with your real IMGBB API key environmental variable injection
    //         const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
    //         const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    //             method: 'POST',
    //             body: formData
    //         });
    //         const data = await response.json();
            
    //         if (data.success) {
    //             setLogoUrl(data.data.url);
    //             setErrors(prev => ({ ...prev, logo: null }));
    //         } else {
    //             setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
    //         }
    //     } catch (err) {
    //         setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
    //     } finally {
    //         setIsUploading(false);
    //     }
    // };

    const handleSubmitRecipe = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const recipe = Object.fromEntries(formData.entries());

        const payload = {
            ...recipe,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            
        }
        const res = await postRecipe(payload);
        if (res.insertedId) {
            //e.target.reset();
            redirect('/dashboard/user/recipe');
        }
    }
    return (
        <div>
            <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
            <Form onSubmit={handleSubmitRecipe} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                    <TextField name="recipeTitle">
                        <Label>Recipe Title</Label>
                        <Input placeholder='Enter your recipe title' />
                    </TextField>
                        {/* Custom Styled Upload Block matching attachment blueprint exactly */}
                        {/* <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleLogoUpload} 
                                        className="hidden" 
                                    />
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div> */}
            

                    <Button
                        type="submit"
                    >
                        Save Recipe
                    </Button>
            </Form>
        </div>
        </div>
        
    );
};

export default PostRecipeForm;




{/* <div>
            <form onSubmit={handleSubmitRecipe}>
                <h2>Post A REcipe</h2>

                
                <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleLogoUpload} 
                                        className="hidden" 
                                    />
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div>
            </form>
        </div> */}