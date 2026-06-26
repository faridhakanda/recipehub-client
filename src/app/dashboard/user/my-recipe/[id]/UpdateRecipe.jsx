// "use client";

// import {ChevronDown, Rocket} from "@gravity-ui/icons";
// import {Button, Fieldset, ListBox, Modal} from "@heroui/react";
// import {Check} from "@gravity-ui/icons";
// import { Description, FieldError, Form, Input, Label, TextField, Select} from "@heroui/react";
// import { updateRecipe } from "@/lib/actions/allUpdate";
// import { useState } from "react";
// import { useRouter } from "next/navigation";


// const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
// const selectBoxClass = "w-full flex flex-col gap-1";
// const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
// const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
// const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
// const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

// const UpdateRecipe = ({recipe }) => {
//     const [errors, setErrors] = useState({});
//     const router = useRouter();
//     const handleUpdateRecipe = async(e) => {
//         e.preventDefault();
//         // const formData = new FormData(e.currentTarget);
//         // const recipeUpdate = Object.fromEntries(formData.entries());
//         const formElement = e.currentTarget;
//         const formData = new FormData(formElement);
//         const recipeUpdate = Object.fromEntries(formData.entries());
//         const result = await updateRecipe(recipe._id, recipe.authorId, recipeUpdate);
//         // if (recipePayload.insertedId) {
//         //     redirect('/dashboard/user/my-recipe');
//         // }
//         if (result.success) {
//             router.refresh();
//             router.push('/dashboard/user/my-recipe');
//         }
//     }
//   return (
//     <Modal>
//       <Button className={'rounded-md w-full'} variant="primary">Update Recipe</Button>
//       <Modal.Backdrop>
//         <Modal.Container>
//           <Modal.Dialog className="sm:max-w-[360px]">
//             <Modal.CloseTrigger />
//             <Modal.Header>
//               <Modal.Icon className="bg-default text-foreground">
//                 <Rocket className="size-5" />
//               </Modal.Icon>
//               <Modal.Heading>{recipe.recipeName}</Modal.Heading>
//             </Modal.Header>
//             <Modal.Body>
//               {/* <p>
//                 A beautiful, fast, and modern React UI library for building accessible and
//                 customizable web applications with ease.
//               </p> */}
//                 <Form className="flex w-96 flex-col gap-4 border-1 rounded-md border-gray-300 p-2 mx-auto my-4" >
//     {/* Name field */}
//     <h2 className="text-xl font-bold mx-auto">Update Recipe</h2>
//       {/* Email field */}
//       <TextField
//         defaultValue={recipe.recipeName}
//         name="recipeName"
//         type="text"
        
//       >
//         <Label>RecipeName</Label>
//         <Input placeholder={recipe.recipeName || 'e.g enter your recipe'} />
//         <FieldError />
//       </TextField>
      
      
     
//     </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleUpdateRecipe} variant="primary" className="w-full" slot="close">
//                 Confirm to Update
//               </Button>
//             </Modal.Footer>
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal>
//   );
// }

// export default UpdateRecipe;



"use client";

import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { Input, Label, TextField } from "@heroui/react";
import { updateRecipe } from "@/lib/actions/allUpdate";
import { useState } from "react";
import { useRouter } from "next/navigation";

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";

const UpdateRecipe = ({ recipe, onClose }) => {
    const [recipeName, setRecipeName] = useState(recipe.recipeName || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleUpdateRecipe = async () => {
        // Validate
        if (!recipeName.trim()) {
            setError('Recipe name is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await updateRecipe(
                recipe._id, 
                recipe.authorId, 
                { recipeName: recipeName.trim() }
            );
            
            if (result.success) {
                //router.refresh();
                router.push('/dashboard/user');
            } else {
                setError(result.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Update error:', error);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal>
            <Button className={'rounded-md w-full'} variant="primary">Update Recipe</Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Recipe</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-col gap-4 p-2">
                                <h2 className="text-xl font-bold mx-auto">Update Recipe</h2>
                                
                                <div className="flex flex-col gap-2">
                                    <Label className="text-zinc-400 font-medium text-sm">
                                        Recipe Name
                                    </Label>
                                    <Input 
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                        placeholder={recipe.recipeName || 'Enter your recipe name'} 
                                        className={textInputClass}
                                        disabled={loading}
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                                </div>

                                <Button 
                                    onClick={handleUpdateRecipe}
                                    variant="primary" 
                                    className="w-full mt-4"
                                    isLoading={loading}
                                    isDisabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Confirm to Update'}
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

export default UpdateRecipe;