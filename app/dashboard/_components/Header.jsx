"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path = usePathname();
  return (
    <div className='flex p-5 items-center justify-between bg-secondary shadow-md'>
     <Image src='/logo.svg' height={100} width={160} alt='logo'/>
     <ul className=' hidden md:flex gap-6'>
        <li className={`hover:text-primary cursor-pointer hover:font-bold transition-all ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary cursor-pointer hover:font-bold transition-all ${path == '/upgrade' && 'text-primary font-bold'}`}>Updrade</li>
        <li className={`hover:text-primary cursor-pointer hover:font-bold transition-all ${path == '/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary cursor-pointer hover:font-bold transition-all ${path == '/howitwork' && 'text-primary font-bold'}`}>How it Works</li>
     </ul>
     <UserButton/>
    </div>
  )
}

export default Header
