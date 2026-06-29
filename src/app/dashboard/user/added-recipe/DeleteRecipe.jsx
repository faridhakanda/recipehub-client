


"use client";

import { deleteRecipe } from "@/lib/actions/allDelete";
import { TrashBin} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { redirect } from "next/navigation";

const DeleteRecipe = ({ recipe }) => {
    const handleRecipeDelete = async() => {
        await deleteRecipe(recipe._id, recipe.authorId);
        redirect('/dashboard/user/added-recipe');
    }
  return (
    <Modal className="">
      <Button className={'w-full rounded-md'} variant="danger">Delete Recipe</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <TrashBin className="size-5" />
              </Modal.Icon>
              <Modal.Heading>{recipe.recipeName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                {recipe.instructions}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleRecipeDelete} className="w-full" slot="close">
                Confirm to Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default DeleteRecipe;