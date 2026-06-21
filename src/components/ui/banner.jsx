import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4'>
            <div className='flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8 lg:gap-12 py-4'>
                {/* Text Content */}
                <div className='w-full md:w-1/2 text-center md:text-left'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight'>
                        <span className='bg-gradient-to-l from-[#9514FA] to-[#4F39F6] bg-clip-text text-transparent'>
                            RecipeHub
                        </span> 
                        is one of the biggest catering services of Mymensingh, Bangladesh
                    </h2>
                </div>
                
                {/* Image */}
                <div className='w-full md:w-1/2 flex justify-center'>
                    <div className='relative w-full max-w-md md:max-w-full aspect-square md:aspect-auto'>
                        <Image 
                            className='rounded-md object-cover w-full h-auto' 
                            src={'/vegmeat.jpg'} 
                            alt="banner" 
                            width={500} 
                            height={500}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
