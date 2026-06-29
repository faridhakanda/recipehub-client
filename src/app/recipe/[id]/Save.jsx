"use client";

import { recipeSave } from "@/lib/actions/allPost";
import { getUserSession } from "@/lib/core/session";
import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { redirect } from "next/navigation";

const Save = ({ recipeDetails }) => {
    const handleSave = async() => {
            try {
                const recipe = recipeDetails;
                const user = await getUserSession();
                const userId = user?.id;
                const userName = user?.name;
                const userEmail = user?.email;
                const payloadForSave = {
                    recipe: recipe,
                    userId,
                    userName,
                    userEmail,
                }
                //const payload = await recipeLike(recipe._id, payloadForLike);
                const payload = await recipeSave(recipe._id, payloadForSave)
                if (payload.insertedId) {
                    redirect(`/recipe/${recipe._id}`);
                }
            } catch(error) {
                console.error("Error saving recipe: ", error);
            }
            
        }
  return (
    <Modal>
      {/* <Button variant="secondary">Like</Button> */}
        <Button className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800/50 text-xs sm:text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Save</span>
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
              <Button onClick={handleSave} className="w-full" slot="close">
                Conform to Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default Save;