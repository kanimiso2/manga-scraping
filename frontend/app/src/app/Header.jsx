import React from 'react';
import AppBar from "../components/Signinclient"
export default function Header() {
  return (
    <header className="py-4">
      <nav className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <ul className="flex justify-between items-center md:px-6 lg:px-8">
          <li className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"><span className="text-blue-400 italic">M</span>angaga!!</li>
          <li>
            <AppBar />
      
          </li>
        </ul>
      </nav>
    </header>
  );
}



