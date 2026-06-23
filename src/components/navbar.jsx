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
const Navbar = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const session = authClient.useSession();
    const user = session?.data?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //const [mounted, setMounted] = useState(false);

    

    const handleLogout = async () => {
        await authClient.signOut();
        router.push('/signin');
        setIsMenuOpen(false);
    };

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
            {/* <Link href={'/recipe-details'} onClick={closeMenu} className={`${mobile ? 'block py-2' : ''} hover:opacity-70 transition-opacity`}>
                Recipe Details
            </Link> */}
            <Link href={'/plans'} onClick={closeMenu} className={`${mobile ? 'block py-2' : ''} hover:opacity-70 transition-opacity`}>
                Plans
            </Link>
            {user && (
                <Link href={'/dashboard'} onClick={closeMenu} className={`${mobile ? 'block py-2' : ''} hover:opacity-70 transition-opacity`}>
                    Dashboard
                </Link>
            )}
        </>
    );

    return (
        <nav suppressHydrationWarning className={`p-2 md:p-3 text-sm md:text-md font-bold ${theme === 'dark' ? 'bg-linear-to-r from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-r from-white to-gray-50 text-gray-800'} shadow-md relative z-50`}>
            <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-6'>
                {/* Desktop Navigation */}
                <div className='hidden md:flex justify-between items-center'>
                    {/* Logo */}
                    <Link href={'/'} className='text-lg md:text-xl font-bold hover:opacity-70 transition-opacity'>
                        RecipeHub
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
                            <>
                                <div className='flex items-center gap-2'>
                                    <Image 
                                        //src={'/avatar.png'}
                                        src={user?.image || '/avatar.png'}
                                        alt={user?.name || 'User Avatar'}
                                        width={32}
                                        height={32}
                                        className='rounded-full border-2 border-white'
                                    />
                                    <Link href={'/profile'} className='hover:opacity-70 transition-opacity hidden lg:inline'>
                                        {user?.name}
                                    </Link>
                                    <Dropdown>
                                        <Button aria-label="Menu" variant="secondary">
                                            {user?.name}
                                        </Button>
                                        <Dropdown.Popover>
                                            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                            <Dropdown.Item id="new-file" textValue="New file">
                                                
                                                    <Link href={'/new-file'}>
                                                        <Label>Profile</Label>
                                                    </Link>
                                               
                                            </Dropdown.Item>
                                            <Dropdown.Item id="copy-link" textValue="Copy link">
                                                <Link href={'/copylin'}>
                                                    <Label>Copy link</Label>
                                                </Link>
                                                
                                            </Dropdown.Item>
                                            <Dropdown.Item id="edit-file" textValue="Edit file">
                                                <Label>Edit file</Label>
                                            </Dropdown.Item>
                                            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
                                                <Label>Delete file</Label>
                                            </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown>
                                </div>
                                <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity'
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className='md:hidden flex justify-between items-center'>
                    {/* Logo */}
                    <Link href={'/'} className='text-lg font-bold hover:opacity-70 transition-opacity'>
                        RecipeHub
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
                            <div className='flex items-center gap-2'>
                                <Image 
                                    //src={'/avatar.png'}
                                    src={user?.image || '/avatar.png'}
                                    alt={user?.name || 'User Avatar'}
                                    width={28}
                                    height={28}
                                    className='rounded-full border-2 border-white'
                                />
                                <button 
                                    onClick={handleLogout} 
                                    className='hover:opacity-70 transition-opacity text-sm'
                                >
                                    Logout
                                </button>
                            </div>
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
                                <Link href={'/profile'} onClick={closeMenu} className='block py-2 hover:opacity-70 transition-opacity'>
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