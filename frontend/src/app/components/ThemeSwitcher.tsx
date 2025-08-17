"use client";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import ThemeIcon from  '/public/theme.svg'
type Props = {}

export const ThemeSwitcher = (props: Props) => {
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
        <img src='/theme.svg' className={`h-[50px] w-[50px] ${theme === 'light' ? 'text-black' : 'text-white'}`} alt="" />
    </button>
  )
}