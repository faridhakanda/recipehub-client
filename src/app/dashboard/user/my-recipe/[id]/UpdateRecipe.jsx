"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import {Check} from "@gravity-ui/icons";
import { Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

const UpdateRecipe = ({recipe }) => {
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
              <Modal.Heading>{recipe.recipeName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              {/* <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p> */}
                <Form
                    className="flex w-96 flex-col gap-4"
                    // render={(props) => <form {...props} data-custom="foo" />}
                    // onSubmit={onSubmit}
                    >
                    <TextField
                        isRequired
                        name="recipeName"
                        type="text"
                        defaultValue={recipe.recipeName}
                    >
                        <Label>Recipe Name</Label>
                        <Input placeholder={recipe.recipeName} />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        
                        name="category"
                        type="text"
                        
                    >
                        <Label>Category</Label>
                        <Input placeholder={recipe.category} />
                        
                        <FieldError />
                    </TextField>
                    {/* <div className="flex gap-2">
                        <Button type="submit">
                        <Check />
                        Submit
                        </Button>
                        <Button type="reset" variant="secondary">
                        Reset
                        </Button>
                    </div> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="w-full" slot="close">
                Confirm to Update
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default UpdateRecipe;