"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter">
              AI AUTOMATION
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-300 font-medium">
            <Link href="#home" className="hover:text-cyan-400 transition-colors">হোম</Link>
            <Link href="#services" className="hover:text-cyan-400 transition-colors">সার্ভিস</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">প্রাইসিং</Link>
            <Link href="#faq" className="hover:text-cyan-400 transition-colors">প্রশ্নাবলী</Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/landingpagelogin" className="text-white hover:text-cyan-400 font-medium px-4 py-2 transition">
              লগইন
            </Link>
            <Link href="/landingpagesignup" className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105">
              শুরু করুন
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          <Link href="/" className="block text-gray-300 hover:text-cyan-400 text-lg">হোম</Link>
          <Link href="#services" className="block text-gray-300 hover:text-cyan-400 text-lg">সার্ভিস</Link>
          <Link href="#pricing" className="block text-gray-300 hover:text-cyan-400 text-lg">প্রাইসিং</Link>
          <button className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl mt-4">শুরু করুন</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;