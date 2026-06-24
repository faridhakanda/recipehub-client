"use client";


import { authClient } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    //const cleanRedirectTo = redirectTo === "/" ? "/" : redirectTo;
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
        //name: user?.name,
        email: user?.email,
        password: user?.password,
        //photoUrl: user?.photoUrl
        rememberMe: true,
    })
    if (data) {
        //router.push('/');
        router.push(redirectTo);
    } 
    if (error) {
        alert('User is not recognized. Try again!');
    }

    
  };

  const handleGoogleSignIn = async() => {
    await authClient.signIn.social({
        provider: "google"
    });
  };

  return (
    <Form className="flex w-96 flex-col gap-4 border-1 rounded-md border-gray-300 p-2 mx-auto my-4" onSubmit={handleSignUp}>
    {/* Name field */}
    <h2 className="text-xl font-bold mx-auto">SignIn RecipeHub</h2>
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
      

      <div className="flex gap-2">
        <Button className={'w-full'} type="submit">
          <Check />
          SignIn
        </Button>
        </div>
      <div className="flex items-center gap-3 my-2">
                    <Separator className="flex-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                        Or
                    </span>
                    <Separator className="flex-1" />
                </div>
      <div>
      
        <Button onClick={handleGoogleSignIn} className={'w-full'}>
           <FcGoogle /> SignIn with Google 
        </Button>
      </div>
      <div className="flex gap-2 mx-auto items-center">
        <p>Don't have an account?</p>
        <Link className="text-blue-500 font-bold" href={`/signup?redirect=${redirectTo}`}>SignUp</Link>
      </div>
    </Form>
  );
}

export default SignInPage;




// "use client";

// import { authClient } from "@/lib/auth-client";
// import { Check } from "@gravity-ui/icons";
// import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const SignInPage = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const redirectTo = searchParams.get("redirect") || "/";

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const user = Object.fromEntries(formData.entries());
//         const { data, error } = await authClient.signIn.email({
//             email: user?.email,
//             password: user?.password, //as string,
//             rememberMe: true,
//         });
//         if (data) {
//             router.push(redirectTo);
//         }
//         if (error) {
//             alert('User is not recognized. Try again!');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
//             <Form 
//                 className="flex w-full max-w-md flex-col gap-4 border-1 border-gray-300 dark:border-gray-700 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 mx-auto my-auto transition-all duration-200" 
//                 onSubmit={handleSignUp}
//             >
//                 {/* Title */}
//                 <div className="text-center mb-2">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign in to your account</p>
//                 </div>

//                 {/* Email field */}
//                 <TextField
//                     isRequired
//                     name="email"
//                     type="email"
//                     className="w-full"
//                 >
//                     <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
//                     <Input 
//                         placeholder="john@example.com" 
//                         className="w-full"
//                         classNames={{
//                             input: "text-sm",
//                         }}
//                     />
//                     <FieldError />
//                 </TextField>

//                 {/* Password field */}
//                 <TextField
//                     isRequired
//                     minLength={6}
//                     name="password"
//                     type="password"
//                     className="w-full"
//                     validate={(value) => {
//                         if (value.length < 6) {
//                             return "Password must be at least 6 characters";
//                         }
//                         if (!/[A-Z]/.test(value)) {
//                             return "Password must contain at least one uppercase letter";
//                         }
//                         if (!/[a-z]/.test(value)) {
//                             return "Password must contain at least one lowercase letter";
//                         }
//                         return null;
//                     }}
//                 >
//                     <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
//                     <Input 
//                         placeholder="Enter your password" 
//                         className="w-full"
//                         classNames={{
//                             input: "text-sm",
//                         }}
//                     />
//                     <Description className="text-xs text-gray-500 dark:text-gray-400">
//                         Must be at least 6 characters with 1 uppercase and 1 lowercase letter
//                     </Description>
//                     <FieldError />
//                 </TextField>

//                 {/* Sign In Button */}
//                 <Button 
//                     className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 transition-colors duration-200" 
//                     type="submit"
//                 >
//                     <Check className="w-4 h-4" />
//                     Sign In
//                 </Button>

//                 {/* Divider */}
//                 <div className="flex items-center gap-3 my-2">
//                     <Separator className="flex-1" />
//                     <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
//                         Or
//                     </span>
//                     <Separator className="flex-1" />
//                 </div>

//                 {/* Google Sign In */}
//                 <Button 
//                     className="w-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 transition-colors duration-200"
//                     variant="bordered"
//                 >
//                     <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                         <path
//                             fill="currentColor"
//                             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                         />
//                         <path
//                             fill="currentColor"
//                             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                         />
//                         <path
//                             fill="currentColor"
//                             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                         />
//                         <path
//                             fill="currentColor"
//                             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                         />
//                     </svg>
//                     Sign In with Google
//                 </Button>

//                 {/* Sign Up Link */}
//                 <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mx-auto items-center mt-2">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Don't have an account?</p>
//                     <Link 
//                         className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 text-sm" 
//                         href={`/signup?redirect=${redirectTo}`}
//                     >
//                         Sign Up
//                     </Link>
//                 </div>
//             </Form>
//         </div>
//     );
// };

// export default SignInPage;