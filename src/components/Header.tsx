"use client";
import React from 'react'
import Image from 'next/image';
import logo from "../../public/logo.png"

export default function Header() {
  return (
    <header className="m-0 bg-amber-400 h-16 flex items-center px-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image 
          src={logo} 
          alt="Logo" 
          width={40}
          height={40}
          className="object-cover" />
        </div>
    </header>
  )
}
