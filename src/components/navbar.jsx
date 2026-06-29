'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ThemeSwitch from './theme-switch';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import {Button, Dropdown, Label} from "@heroui/react";
import { ArrowRightFromSquare, Briefcase, CirclePlus, CloudCheck, House, Person, ShoppingCart, Star } from '@gravity-ui/icons';



const AdminNavigationPopoverDashboard = () => {
    const router = useRouter();
    const handleLogoutForAdmin = async() => {
        await authClient.signOut();
        router.push('/signin');
    }
    return (
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            <Dropdown.Item id="home" textValue="Home">
                
                    <Link href={'/dashboard/admin'}>
                        <Label>Home</Label>
                    </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="admin" textValue="Admin">
                
                    <Link href={'/dashboard/admin'}>
                        <Label>Admin</Label>
                    </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="saved-recipe" textValue="Saved Recipe">
                <Link href={'/dashboard/admin/saved-recipe'}>
                    <Label>Admin Saved Recipe</Label>
                </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="add-recipe" textValue="Add Recipe">
                <Link href={'/dashboard/admin'}>
                    <Label>Admin Add Features</Label>
                </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="favorite-recipe" textValue="Favorite Recipe" variant="secondary">
                
                <Link href={'/dashboard/admin/favorite'}>
                    <Label>Favorite Recipe</Label>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item id="profile" textValue="Profile" >
                
                <Link href={'/dashboard/admin/profile'}>
                    <Label>Profile</Label>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item id="logout" textValue="Logout" >
                <ArrowRightFromSquare />
                <Link onClick={handleLogoutForAdmin} href={'/signin'}>
                    <Label>Logout</Label>
                </Link>
            </Dropdown.Item>
        </Dropdown.Menu>
    )
}
 
 const UserNavigationPopoverDashboard = () => {
    const router = useRouter();
    const handleLogoutForUser = async() => {
        await authClient.signOut();
        router.push('/signin');
        //setIsMenuOpen(false);
    }
    return (
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            
            <Dropdown.Item id="home" textValue="Home">
                    <House />
                    <Link href={'/dashboard/user'}>
                        <Label>Home</Label>
                    </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="add-recipe" textValue="Post Recipe">
                <CirclePlus />
                <Link href={'/dashboard/user/post-recipe'}>
                    <Label>Post Recipe</Label>
                </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="added-recipe" textValue="Added Recipe">
                    <Briefcase />
                    <Link href={'/dashboard/user/added-recipe'}>
                        <Label>Added Recipe</Label>
                    </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="purchase-recipe" textValue="Purchase Recipe">
                    <ShoppingCart />
                    <Link href={'/dashboard/user/purchase-recipe'}>
                        <Label>Purchased Recipe</Label>
                    </Link>
                
            </Dropdown.Item>
            <Dropdown.Item id="saved-recipe" textValue="Saved Recipe">
                <CloudCheck />
                <Link href={'/dashboard/user/saved-recipe'}>
                    <Label>Saved Recipe</Label>
                </Link>
                
            </Dropdown.Item>
            

            <Dropdown.Item id="favorite-recipe" textValue="Favorite Recipe" variant="secondary">
                <Star />
                <Link href={'/dashboard/user/favorite-recipe'}>
                    <Label>Favorite Recipe</Label>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item id="profile" textValue="Profile" >
                <Person />
                <Link href={'/dashboard/user/profile'}>
                    <Label>Profile</Label>
                </Link>
            </Dropdown.Item>
            <Dropdown.Item id="logout" textValue="Logout" >
                <ArrowRightFromSquare />
                <Link onClick={handleLogoutForUser} href={'/signin'}>
                    <Label>Logout</Label>
                </Link>
            </Dropdown.Item>
        </Dropdown.Menu>
    )
}
const Navbar = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const session = authClient.useSession();
    const user = session?.data?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //const [mounted, setMounted] = useState(false);

    

    // const handleLogout = async () => {
    //     await authClient.signOut();
    //     router.push('/signin');
    //     setIsMenuOpen(false);
    // };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
   
    // Navigation links component to avoid duplication
    const NavLinks = ({ mobile = false }) => (
        <>
            <Link href={'/'} onClick={closeMenu} className={`${mobile ? 'block py-2' : ''} hover:opacity-70 transition-opacity`}>
                Home
            </Link>
            <Link href={'/recipe'} onClick={closeMenu} className={`${mobile ? 'block py-2' : ''} hover:opacity-70 transition-opacity`}>
                Browse Recipes
            </Link>
        </>
    );

    return (
        <nav suppressHydrationWarning className={`p-2 md:p-3 text-sm md:text-md font-bold ${theme === 'dark' ? 'bg-linear-to-r from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-r from-white to-gray-50 text-gray-800'} shadow-md relative z-50`}>
            <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-6'>
                {/* Desktop Navigation */}
                <div className='hidden md:flex justify-between items-center'>
                    {/* Logo */}
                    <Link href={'/'} className='text-lg md:text-xl font-bold hover:opacity-70 transition-opacity'>
                        
                        <span className='bg-linear-to-l  from-[#9514FA] to-[#4F39F6] bg-clip-text text-transparent'>RecipeHub</span>
                    </Link>

                    {/* Center Links */}
                    <div className='flex gap-4 lg:gap-6 items-center'>
                        <NavLinks />
                    </div>

                    {/* Right Section */}
                    <div className='flex gap-3 lg:gap-4 items-center'>
                        <ThemeSwitch />
                        {!user ? (
                            <>
                            <Link href={'/signin'} className='hover:opacity-70 transition-opacity'>
                                Sign In
                            </Link>
                            <Link href={'/signup'} className='hover:opacity-70 transition-opacity'>
                                Sign Up
                            </Link>
                            </>
                            
                        ) : (
                            
                            user?.role === 'user' ? (
                                <>
                                <Link href={'/dashboard/user'}>Dashboard</Link>
                                <div className='flex items-center gap-2'>
                                    
                                    <Dropdown>
                                        
                                        <Button 
                                            className="w-8 h-8 min-w-0 p-0 rounded-full overflow-hidden bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800"
                                        >
                                            <Image 
                                                //src={'/avatar.png'}
                                                src={user?.image || '/avatar.png'}
                                                alt={user?.name || 'User Avatar'}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                            
                                        </Button>
                                        
                                        <Dropdown.Popover>
                                            <UserNavigationPopoverDashboard />
                                        </Dropdown.Popover>
                                    </Dropdown>
                                </div>
                                {/* <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity'
                                >
                                    Logout
                                </button> */}
                            </>
                            ) : (
                                <>
                                <Link href={'/dashboard/admin'}>Dashboard</Link>
                                <div className='flex items-center gap-2'>
                                    
                                    <Dropdown>
                                        <Button 
                                            className="w-8 h-8 min-w-0 p-0 rounded-full overflow-hidden bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800"
                                        >
                                            <Image 
                                                //src={'/avatar.png'}
                                                src={user?.image || '/avatar.png'}
                                                alt={user?.name || 'User Avatar'}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                            
                                        </Button>
                                        <Dropdown.Popover>
                                            <AdminNavigationPopoverDashboard />
                                        </Dropdown.Popover>
                                    </Dropdown>
                                </div>
                                {/* <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity'
                                >
                                    Logout
                                </button> */}
                            </>
                            )
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className='md:hidden flex justify-between items-center'>
                    {/* Logo */}
                    <Link href={'/'} className='text-lg font-bold hover:opacity-70 transition-opacity'>
                        <span className='bg-linear-to-l  from-[#9514FA] to-[#4F39F6] bg-clip-text text-transparent'>RecipeHub</span>
                    </Link>

                    {/* Right Section */}
                    <div className='flex items-center gap-3'>
                        <ThemeSwitch />
                        {!user ? (
                            <>
                                <Link href={'/signin'} className='hover:opacity-70 transition-opacity'>
                                    Sign In
                                </Link>
                                <Link href={'/signup'} className='hover:opacity-70 transition-opacity'>
                                    Sign Up
                                </Link>
                            </>
                            
                        ) : (
                            
                                user?.role === 'user' ? (
                                   
                                <div className='flex items-center gap-2'>
                                <Link href={'/dashboard/user'}>Dashboard</Link>
                                <Dropdown>
                                        <Button 
                                            className="w-8 h-8 min-w-0 p-0 rounded-full overflow-hidden bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800"
                                        >
                                            <Image 
                                                //src={'/avatar.png'}
                                                src={user?.image || '/avatar.png'}
                                                alt={user?.name || 'User Avatar'}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        </Button>
                                        <Dropdown.Popover>
                                            <UserNavigationPopoverDashboard />
                                        </Dropdown.Popover>
                                    </Dropdown>
                                {/* <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity text-sm'
                                >
                                    Logout
                                </button> */}
                            </div>
                                ) :
                               
                                (
                                    <div className='flex items-center gap-2'>
                                    <Link href={'/dashboard/admin'}>Dashboard</Link>
                                <Dropdown>
                                        <Button 
                                            className="w-8 h-8 min-w-0 p-0 rounded-full overflow-hidden bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800"
                                        >
                                            <Image 
                                                //src={'/avatar.png'}
                                                src={user?.image || '/avatar.png'}
                                                alt={user?.name || 'User Avatar'}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        </Button>
                                        <Dropdown.Popover>
                                            <AdminNavigationPopoverDashboard />
                                        </Dropdown.Popover>
                                    </Dropdown>
                                {/* <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity text-sm'
                                >
                                    Logout
                                </button> */}
                            </div>
                                )
                            
                        )}
                        
                        {/* Hamburger Menu Button with Gravity UI Icons */}
                        <button 
                            onClick={toggleMenu}
                            className='p-1 rounded-md hover:bg-black/10 transition-colors'
                            aria-label='Toggle menu'
                        >
                            {isMenuOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
                            
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className='md:hidden absolute top-full left-0 right-0 bg-inherit shadow-lg p-4 z-50'>
                        <div className='flex flex-col space-y-3'>
                            <NavLinks mobile />
                            
                            {user && (
                                <Link href={`/dashboard/${user?.role}/profile`} onClick={closeMenu} className='block py-2 hover:opacity-70 transition-opacity'>
                                    Profile
                                </Link>
                                
                            )}
                            
                            
                            {!user && (
                                <>
                                    <Link href={'/signin'} onClick={closeMenu} className='block py-2 hover:opacity-70 transition-opacity'>
                                        Sign In
                                    </Link>
                                     <Link href={'/signup'} onClick={closeMenu} className='block py-2 hover:opacity-70 transition-opacity'>
                                    Sign Up
                                    </Link>
                                </>
                               
                                
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;