"use client";


import { authClient } from "@/lib/auth-client";
import {ArrowUpToLine, Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    //const cleanRedirect = redirectTo === "/" ? "/" : redirectTo;
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
        name: user?.name,
        email: user?.email,
        password: user?.password,
        image: user?.imageUrl,
        role: "user",
        plan: "free",
    })
    if (data) {
        //router.push('/signin');
        router.push(redirectTo);
    } 
    if (error) {
        alert('User is not signup. Try again!');
    }

    
  };

  const handleGoogleSignIn = async() => {
    await authClient.signIn.social({
        provider: "google"
    });
  };

  return (
    <Form className="flex w-96 flex-col gap-4 rounded-md border-1 border-gray-300 p-2 mx-auto my-4" onSubmit={handleSignUp}>
    {/* Name field */}
    <h2 className="text-xl font-bold mx-auto">Create your account in RecipeHub</h2>
    <TextField
        isRequired
        name="name"
        type="text"
      >
        <Label>Name</Label>
        <Input placeholder="Farid Akanda" />
        <FieldError />
      </TextField>
      {/* Email field */}
      <TextField
        isRequired
        name="email"
        type="email"
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
      <TextField
        isRequired
        name="imageUrl"
        type="url"
      >
        <Label>Image Url</Label>
        <Input placeholder="http://imgbb.co/profilePic.png" />
        <FieldError />
      </TextField> 
      <div className="flex gap-2">
        <Button className={'w-full'} type="submit">
          <Check />
          SignUp
        </Button>
        
      </div>
      <div className="flex items-center gap-3 my-2">
                          <Separator className="flex-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                              Or
                          </span>
                          <Separator className="flex-1" />
                      </div>
            <div></div>
      <div>
        <Button onClick={handleGoogleSignIn} className={'w-full'}>
           <FcGoogle  /> SignIn with Google
        </Button>
      </div>
      <div className="flex gap-2 mx-auto items-center">
        <p>Already have an account?</p>
        <Link className="text-blue-500 font-bold" href={`/signin?redirect=${redirectTo}`}>SignIn</Link>
      </div>
    </Form>
  );
}

export default SignUpPage;