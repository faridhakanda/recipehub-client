'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaYoutube, 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope 
} from 'react-icons/fa';

const Footer = () => {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} w-full`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10'>
                    
                    {/* Logo & Description */}
                    <div className='space-y-4'>
                        <Link href={'/'} className='text-2xl md:text-3xl font-bold inline-block'>
                            <span className='bg-linear-to-l from-[#9514FA] to-[#4F39F6] bg-clip-text text-transparent'>
                                RecipeHub
                            </span>
                        </Link>
                        <p className='text-sm opacity-80 leading-relaxed'>
                            Your ultimate destination for delicious recipes, 
                            catering services, and culinary experiences in Mymensingh, Bangladesh.
                        </p>
                        <div className='flex gap-3 pt-2'>
                            <a 
                                href='https://facebook.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300'
                                aria-label='Facebook'
                            >
                                <FaFacebook size={20} />
                            </a>
                            <a 
                                href='https://twitter.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300'
                                aria-label='Twitter'
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a 
                                href='https://instagram.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300'
                                aria-label='Instagram'
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a 
                                href='https://youtube.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300'
                                aria-label='YouTube'
                            >
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-lg font-bold mb-4 relative'>
                            Quick Links
                            <span className='absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#9514FA] to-[#4F39F6] mt-1'></span>
                        </h3>
                        <ul className='space-y-2.5'>
                            <li>
                                <Link href={'/'} className='hover:text-[#4F39F6] transition-colors duration-300 text-sm'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={'/recipe'} className='hover:text-[#4F39F6] transition-colors duration-300 text-sm'>
                                    Browse Recipes
                                </Link>
                            </li>
                            <li>
                                <Link href={'/dashboard'} className='hover:text-[#4F39F6] transition-colors duration-300 text-sm'>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={'/plans'} className='hover:text-[#4F39F6] transition-colors duration-300 text-sm'>
                                    Plans & Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href={'/profile'} className='hover:text-[#4F39F6] transition-colors duration-300 text-sm'>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className='text-lg font-bold mb-4 relative'>
                            Contact Us
                            <span className='absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#9514FA] to-[#4F39F6] mt-1'></span>
                        </h3>
                        <ul className='space-y-3'>
                            <li className='flex items-start gap-3 text-sm'>
                                <FaMapMarkerAlt className='mt-0.5 text-[#4F39F6] flex-shrink-0' size={16} />
                                <span className='opacity-80'>
                                    Mymensingh City,<br />
                                    Bangladesh
                                </span>
                            </li>
                            <li className='flex items-center gap-3 text-sm'>
                                <FaPhone className='text-[#4F39F6] flex-shrink-0' size={16} />
                                <a href='tel:+8801234567890' className='opacity-80 hover:opacity-100 transition-opacity'>
                                    +880 1234 567890
                                </a>
                            </li>
                            <li className='flex items-center gap-3 text-sm'>
                                <FaEnvelope className='text-[#4F39F6] flex-shrink-0' size={16} />
                                <a href='mailto:info@recipehub.com' className='opacity-80 hover:opacity-100 transition-opacity'>
                                    info@recipehub.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links (Alternative Layout) */}
                    <div>
                        <h3 className='text-lg font-bold mb-4 relative'>
                            Follow Us
                            <span className='absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#9514FA] to-[#4F39F6] mt-1'></span>
                        </h3>
                        <p className='text-sm opacity-80 mb-4'>
                            Stay connected with us on social media for daily recipes and updates!
                        </p>
                        <div className='flex flex-wrap gap-3'>
                            <a 
                                href='https://facebook.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-3 py-2 bg-[#1877F2] text-white rounded-md hover:opacity-80 transition-opacity text-sm'
                            >
                                <FaFacebook size={16} />
                                Facebook
                            </a>
                            <a 
                                href='https://twitter.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-3 py-2 bg-[#1DA1F2] text-white rounded-md hover:opacity-80 transition-opacity text-sm'
                            >
                                <FaTwitter size={16} />
                                Twitter
                            </a>
                            <a 
                                href='https://instagram.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-3 py-2 bg-[#E4405F] text-white rounded-md hover:opacity-80 transition-opacity text-sm'
                            >
                                <FaInstagram size={16} />
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className='border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 text-center'>
                    <p className='text-sm opacity-70'>
                        &copy; {currentYear} <span className='font-bold text-[#4F39F6]'>RecipeHub</span>. 
                        All rights reserved. Made with ❤️ in Bangladesh
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;