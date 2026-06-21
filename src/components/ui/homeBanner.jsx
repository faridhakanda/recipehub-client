import Image from 'next/image';
import React from 'react';

const HomeBanner = () => {
    return (
        <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4'>
            {/* Background Image */}
            <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden'>
                <Image
                    src={'/pizza.jpg'}
                    alt="RecipeHub Banner"
                    fill
                    className='object-cover'
                    priority
                    sizes="100vw"
                />
                
                {/* Dark Overlay for better text readability */}
                <div className='absolute inset-0 bg-black/50'></div>
                
                {/* Content */}
                <div className='relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-4xl'>
                        <span className='bg-gradient-to-l from-[#9514FA] to-[#4F39F6] bg-clip-text text-transparent'>
                            RecipeHub
                        </span> 
                        <span className='text-white'>is one of the biggest catering services of Mymensingh, Bangladesh</span>
                    </h2>
                    <p className='mt-4 text-sm sm:text-base md:text-lg opacity-90 max-w-2xl'>
                        Discover authentic flavors and culinary excellence
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;