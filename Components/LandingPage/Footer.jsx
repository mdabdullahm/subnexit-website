"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-[#020617] text-white pt-20 pb-10 border-t border-white/5 overflow-hidden">
            {/* ব্যাকগ্রাউন্ড হালকা আভা */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/5 blur-[120px] pointer-events-none -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* কলাম ১: লোগো ও বর্ণনা */}
                    <div className="space-y-6">
                        <div className='flex'>
                            <img className='w-8 h-8' src="/navlogo/logo.png" alt="" />
                        <p className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter">
                            AI AUTOMATION
                        </p>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            আমরা আপনার সোশ্যাল মিডিয়া ম্যানেজমেন্ট এবং এনগেজমেন্টকে সহজ করতে আধুনিক এআই প্রযুক্তি ব্যবহার করি। আপনার ব্যবসার সময় বাঁচান এবং বিক্রি বাড়ান আমাদের সাথে।
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-all duration-300 shadow-lg">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-all duration-300 shadow-lg">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-all duration-300 shadow-lg">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-all duration-300 shadow-lg">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* কলাম ২: সার্ভিস সমূহ */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">সার্ভিস সমূহ</h4>
                        <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                            <li><Link href="#comment" className="hover:text-[#00E5FF] transition-colors">কমেন্ট অটোরিপ্লাই</Link></li>
                            <li><Link href="#message" className="hover:text-[#00E5FF] transition-colors">মেসেজ অটোরিপ্লাই</Link></li>
                            <li><Link href="#image" className="hover:text-[#00E5FF] transition-colors">ছবি অটোপোস্ট</Link></li>
                            <li><Link href="#reel" className="hover:text-[#00E5FF] transition-colors">রিল অটোপোস্ট</Link></li>
                            <li><Link href="#combo" className="hover:text-[#00E5FF] transition-colors">কম্বো প্ল্যান</Link></li>
                        </ul>
                    </div>

                    {/* কলাম ৩: সাপোর্ট ও পলিসি */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">সাপোর্ট</h4>
                        <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                            <li><Link href="#faq" className="hover:text-[#00E5FF] transition-colors">সচরাচর জিজ্ঞাসা (FAQ)</Link></li>
                            <li><Link href="#" className="hover:text-[#00E5FF] transition-colors">যোগাযোগ করুন</Link></li>
                            <li><Link href="#" className="hover:text-[#00E5FF] transition-colors">রিফান্ড পলিসি</Link></li>
                            <li><Link href="#" className="hover:text-[#00E5FF] transition-colors">প্রাইভেসি পলিসি</Link></li>
                            <li><Link href="#" className="hover:text-[#00E5FF] transition-colors">টার্মস এন্ড কন্ডিশন</Link></li>
                        </ul>
                    </div>

                    {/* কলাম ৪: কন্টাক্ট ইনফো */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">যোগাযোগের ঠিকানা</h4>
                        <ul className="space-y-4 text-gray-400 text-sm md:text-base">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-[#00E5FF] flex-shrink-0" />
                                <span>ঢাকা, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-[#00E5FF] flex-shrink-0" />
                                <span>+৮৮০ ১৭০০০০০০০০</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-[#00E5FF] flex-shrink-0" />
                                <span>support@aiautomation.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* কচিরাইট অংশ */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-xs md:text-sm font-medium">
                    <p>© 2026 AI Automation. সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex items-center gap-6">
                        <p>তৈরি করেছেন: <span className="text-[#00E5FF]">NeonCode</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;