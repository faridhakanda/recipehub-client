"use client";

import { recipeLike } from "@/lib/actions/allPost";
import { getUserSession } from "@/lib/core/session";
import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { redirect } from "next/navigation";

const Like = ({ recipeDetails}) => {

    const handleLike = async() => {
        try {
            const recipe = recipeDetails;
            const user = await getUserSession();
            const userId = user?.id;
            const userName = user?.name;
            const userEmail = user?.email;
            const payloadForLike = {
                recipe: recipe,
                userId,
                userName,
                userEmail,
            }
            const payload = await recipeLike(recipe._id, payloadForLike);
            if (payload.insertedId) {
                redirect(`/recipe/${recipe._id}`);
            }
        } catch(error) {
            console.error("Error liking recipe: ", error);
        }
        
    }
    
  return (
    <Modal>
      {/* <Button variant="secondary">Like</Button> */}
      <Button className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-200 dark:border-red-800/50 text-xs sm:text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>Like</span>
            
            <span className="text-[10px] bg-red-100 dark:bg-red-800/50 px-1.5 py-0.5 rounded-full">{recipeDetails.likesCount || 0}</span>
        </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to {recipeDetails.recipeName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleLike} className="w-full" slot="close">
                Conform to Like
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default Like;