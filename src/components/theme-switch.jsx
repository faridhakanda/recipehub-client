'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <button className='items-center p-2 rounded-full'>
                <div className='w-6 h-6' />
            </button>
        )
    }
    return (
        <button className={`theme === 'dark' ? "" : "" items-center`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {/* Toggle { theme === "dark" ? "Light" : "Dark"} */}
            {
                theme === "dark" ? 
                
                    
                <Image className="brightness-0 invert" src="/light.png" alt="Light Icon" width={24} height={24} />
                
                
                :
                <Image className="brightness-0" src="/dark.png" alt="Dark Icon" width={24} height={24} />
            }
        </button>
    );
};

export default ThemeSwitch;