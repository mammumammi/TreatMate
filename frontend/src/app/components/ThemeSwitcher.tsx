"use client";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = Record<string, never>;

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {theme,setTheme} = useTheme();

    useEffect( ()=> {
        setMounted(true);
    },[])

    if (!mounted){
        return null;
    }
  return (
    <button onClick={()=> {
        setTheme(theme === "light" ? "dark" : "light")
    }} className='absolute top-[3vh] left-[94vw]'>
        <Image 
          src='/theme.svg' 
          width={50} 
          height={50} 
          className={`${theme === 'light' ? 'text-black' : 'text-white'}`} 
          alt="Theme toggle" 
        />
    </button>
  )
}