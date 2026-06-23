"use client";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <button className="items-center p-2 rounded-full">
        <div className="w-6 h-6" />
      </button>
    );
  }
  return (
    <button
      className={`${theme === "dark" ? "text-white" : "text-black"}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Toggle { theme === "dark" ? "Light" : "Dark"} */}
      {/* {
                theme === "dark" ? 
                
                    
                <Image className='text-white dark:text-white'  src="/light.png" alt="Light Icon" width={24} height={24} />
                
                
                :
                <Image src="/dark.png" alt="Dark Icon" width={24} height={24} />
            } */}
      {/* {
                theme === 'dark' ? 
                <h2>Light</h2>
                :
                <h2>Dark</h2>
            } */}
      {/* {theme === 'dark' ?
                <div>
                    Light
                    <Image src={'/light.png'} alt="light" width={24} height={24} />
                </div>
                :
                <div>
                    Dark
                    <Image src={'/light.png'} alt="light" width={24} height={24} />
                </div>
                
            } */}
      {theme === "dark" ? (
        <div className="flex items-center gap-2 text-white">
          {/* <span>Switch to Light</span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-800">
          {/* <span>Switch to Dark</span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default ThemeSwitch;
