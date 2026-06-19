'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button className={`theme === 'dark' ? "" : "" items-center`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {/* Toggle { theme === "dark" ? "Light" : "Dark"} */}
            {
                theme === "dark" ? 
                <Image  src="/light.png" alt="Light Icon" width={24} height={24} />
                :
                <Image src="/dark.png" alt="Dark Icon" width={24} height={24} />
            }
        </button>
    );
};

export default ThemeSwitch;