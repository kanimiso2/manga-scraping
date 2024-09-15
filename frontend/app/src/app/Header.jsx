import React from 'react';

export default function Header() {
  return (
    <header className="py-4">
      <nav className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <ul className="flex justify-between items-center md:px-6 lg:px-8">
          <li className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"><span className="text-blue-400 italic">M</span>angaga!!</li>
          <li className="bg-sky-400 hover:bg-sky-500 rounded-full px-6 py-2 text-sm sm:text-base">
            <a href="/contact" className="text-white ">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}



