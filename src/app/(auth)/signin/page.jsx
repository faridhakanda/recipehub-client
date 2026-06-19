"use client";


import { authClient } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
        //name: user?.name,
        email: user?.email,
        password: user?.password,
        //photoUrl: user?.photoUrl
    })
    if (data) {
        router.push('/');
    } 
    if (error) {
        alert('User is not recognized. Try again!');
    }

    
  };

  return (
    <Form className="flex w-96 flex-col gap-4 border-1 border-gray-300 p-2 mx-auto my-auto" onSubmit={handleSignUp}>
    {/* Name field */}
    
      {/* Email field */}
      <TextField
        isRequired
        name="email"
        type="email"
        // validate={(value) => {
        //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        //     return "Please enter a valid email address";
        //   }

        //   return null;
        // }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      
      {/* Password field */}
      <TextField
        isRequired
        minLength={6}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 6) {
            return "Password must be at least 6 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 6 characters with 1 uppercase and 1 lowercase letter</Description>
        <FieldError />
      </TextField>

      {/* Photo Url field */}
      

      <div className="flex gap-2">
        <Button className={'w-full'} type="submit">
          <Check />
          SignIn
        </Button>
        {/* <Button type="reset" variant="secondary">
          Reset
        </Button> */}
      </div>
      <div>or</div>
      <div>
        <Button className={'w-full'}>
            SignIn with Google
        </Button>
      </div>
      <div className="flex gap-2 mx-auto items-center">
        <p>Don't have an account?</p>
        <Link className="text-blue-500 font-bold" href={'/signup'}>SignUp</Link>
      </div>
    </Form>
  );
}

export default SignInPage;