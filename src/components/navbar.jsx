'use client';
import Link from 'next/link';
import React from 'react';
import ThemeSwitch from './theme-switch';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';


const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const session = authClient.useSession();
    console.log(session?.data?.user, 'session');
    //const user = session?.user;
    const user = session?.data?.user;

    const handleLogout = async()=>{
        await authClient.signOut();
    }
    return (
        <div className={`flex justify-around items-center shadow-sm  p-1 text-md font-bold ${theme === 'dark' ? 'bg-blue-300' : 'bg-lime-300'}`}>
            
            {!user ? (
                <div className='flex justify-around items-center shadow-sm p-1 text-md font-bold'>
                    <Link href={'/'}>RecipeHub</Link>
                    <div className='flex gap-2'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/recipe'}>BrowseRecipe</Link>
                        
                        <Link href={'/plans'}>Plan</Link>
                        {/* <h2>{theme} value</h2> */}
                    </div>
                    <div>
                        <ThemeSwitch />
                        <Link href={'/signin'}>SignIn</Link>
                    </div>
                </div>
            ) : user?.role === 'user' ? (
                <div>
                    <h2>user</h2>
                </div>
            ) :  (
                <div className='flex justify-around'>
                    <Link href={'/'}>RecipeHub</Link>
                    <div className='flex gap-2'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/recipe'}>BrowseRecipe</Link>
                        <Link href={'/dashboard'}>Dashboard</Link>
                        {/* <Link href={'/plans'}>Plan</Link> */}
                        {/* <h2>{theme} value</h2> */}
                    </div>
                    <div className='flex gap-2'>
                        <ThemeSwitch />
                        <Link href={'/profile'}>{user?.name}</Link>
                        <Link onClick={handleLogout} href={'/signin'}>Logout</Link>
                    </div>
                </div>
            )}
            {/* {user ? 
                <div>
                    <div>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </div>
                    <div className='gap-2 flex'>
                        <ThemeSwitch />
                        <Link href={'/profile'}>{user?.name}</Link>
                        <Link onClick={handleLogout}  href={'/signin'}>Logout</Link>
                    </div>
                </div>
                
            :
                <div>
                    <div>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </div>
                    <div className='gap-2 flex'>
                        <ThemeSwitch />
                        <Link href={'/signin'}>SignIn</Link>
                        <Link className='bg-black text-white px-2 rounded-md' href={'/'}>Get Started</Link>
                    </div>
                </div>
                
            } */}
            
        </div>
    );
};

export default Navbar;