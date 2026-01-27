"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
// আইকন লাইব্রেরি ইমপোর্ট
import { MessageCircle, MessageSquare, Image as ImageIcon, Film, Package } from "lucide-react";

// ১. সংখ্যাকে বাংলায় রূপান্তর
const toBengali = (n) => {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return n.toString().replace(/\d/g, (d) => digits[d]);
};

// ২. কাউন্টার কম্পোনেন্ট
const SmoothCounter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(1);
    const countRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.1 }
        );
        if (countRef.current) observer.observe(countRef.current);

        if (started) {
            let start = 1;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) { setCount(target); clearInterval(timer); }
                else { setCount(Math.floor(start)); }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [started, target]);

    return <span ref={countRef}>{toBengali(count)}{suffix}</span>;
};

// ৩. মাউস গ্লো
const MouseGlow = () => {
    const [pos, setPos] = useState({ x: -500, y: -500 });
    useEffect(() => {
        const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            setPos({ x: touch.clientX, y: touch.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed pointer-events-none z-0"
            style={{
                left: pos.x, top: pos.y, width: '500px', height: '500px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, transparent 70%)',
                filter: 'blur(80px)',
            }}
        />
    );
};

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('comment');

    const tabs = [
        { id: 'comment', label: 'কমেন্ট অটোরিপ্লাই', icon: <MessageCircle size={18} /> },
        { id: 'message', label: 'মেসেজ অটোরিপ্লাই', icon: <MessageSquare size={18} /> },
        { id: 'image', label: 'ছবি অটোপোস্ট', icon: <ImageIcon size={18} /> },
        { id: 'reel', label: 'রিল অটোপোস্ট', icon: <Film size={18} /> },
        { id: 'combo', label: 'কম্বো প্ল্যান', icon: <Package size={18} /> },
    ];

    return (
        <main className="w-full relative bg-[#020617] text-white min-h-screen overflow-hidden">
            <MouseGlow />
            
            {/* কোণার ডেকোরেশন কালার */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* --- Section 1: Hero & Stats --- */}
            <section className="relative z-10 pt-32 pb-10 container mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        সোশ্যাল মিডিয়া অটোমেশন <br />
                        <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,216,255,0.4)]">এখন আরও সহজ</span>
                    </motion.h1>
                    <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-8 font-medium opacity-80">
                        AI দিয়ে আপনার ফেসবুক ও ইন্সটাগ্রাম বিজনেস অটোমেট করুন। <br className="hidden md:block" />
                        সময় বাঁচান, আপনার বিক্রি কয়েক গুণ বাড়িয়ে নিন।
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="w-full sm:w-auto px-10 py-4 bg-[#00E5FF] text-black font-black rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 transition-all">
                            শুরু করুন →
                        </button>
                        <button className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                            চেয়ে দেখুন
                        </button>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto border-t border-white/5 pt-8 mt-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                        <div className="py-4 px-2">
                            <div className="text-3xl md:text-5xl font-black text-[#00E5FF] mb-1">
                                <SmoothCounter target={1000} suffix="+" />
                            </div>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">ব্যবহারকারী</p>
                        </div>
                        <div className="py-4 px-2 border-l border-white/5">
                            <div className="text-3xl md:text-5xl font-black text-[#00E5FF] mb-1">
                                <SmoothCounter target={50} suffix="কে+" />
                            </div>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">অটো রেসপন্স</p>
                        </div>
                        <div className="py-4 px-2 border-l border-white/5">
                            <div className="text-3xl md:text-5xl font-black text-[#00E5FF] mb-1">
                                <SmoothCounter target={99} suffix=".৯%" />
                            </div>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">আপটাইম</p>
                        </div>
                        <div className="py-4 px-2 border-l border-white/5">
                            <div className="text-3xl md:text-5xl font-black text-[#00E5FF] mb-1">
                                <SmoothCounter target={24} suffix="/৭" />
                            </div>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">সাপোর্ট</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 2: হাইলাইটেড ফিচার ট্যাব --- */}
            <section className="relative z-10 py-16">
                <div className="container mx-auto px-4 flex justify-center overflow-x-auto no-scrollbar">
                    {/* মেইন কন্টেইনার উইথ গ্লাস ইফেক্ট */}
                    <div className="flex gap-2 md:gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[12px] md:text-[14px] font-bold transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab.id 
                                    ? 'bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.6)] scale-105' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ট্যাব কন্টেন্ট (ডাইনামিক টেক্সট) */}
                <div className="mt-16 container mx-auto px-6 text-center">
                   <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h2 className="text-2xl md:text-4xl font-black mb-4">
                                {tabs.find(t => t.id === activeTab).label} এর <span className="text-[#00E5FF]">পাওয়ারফুল সিস্টেম</span>
                            </h2>
                            <p className="text-gray-400 text-sm md:text-lg leading-relaxed opacity-80">
                                আমাদের এই প্রযুক্তির মাধ্যমে আপনি খুব সহজেই গ্রাহকের সাথে কানেক্টেড থাকতে পারবেন। 
                                এটি আপনার ফেসবুক পেজ বা ইন্সটাগ্রাম প্রোফাইলকে চব্বিশ ঘণ্টা সচল রাখবে।
                            </p>
                        </motion.div>
                   </AnimatePresence>
                </div>
            </section>
        </main>
    );
};

export default HomePage;