"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle, MessageSquare, Image as ImageIcon, Film, Package,
    ArrowRight, Zap, CheckCircle2, Clock, BarChart3, ShieldCheck, Headset,
    MousePointer2, Layout, Calendar, Video, Music, TrendingUp, Monitor, Rocket, Cpu,
    ChevronDown, HelpCircle, Phone
} from "lucide-react";
import Link from 'next/link';

// ১. সংখ্যাকে বাংলায় রূপান্তর
const toBengali = (n) => {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return n.toString().replace(/\d/g, (d) => digits[d]);
};

// ২. কাউন্টার কম্পোনেন্ট
const SmoothCounter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(1);
    const countRef = useRef(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: 0.1 });
        if (countRef.current) observer.observe(countRef.current);
        if (started) {
            let start = 1;
            const timer = setInterval(() => {
                start += target / 60;
                if (start >= target) { setCount(target); clearInterval(timer); }
                else { setCount(Math.floor(start)); }
            }, 30);
            return () => clearInterval(timer);
        }
    }, [started, target]);
    return <span ref={countRef}>{toBengali(count)}{suffix}</span>;
};

// ৩. মাউস গ্লো
const MouseGlow = () => {
    const [pos, setPos] = useState({ x: -500, y: -500 });
    useEffect(() => {
        const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);
    return <div className="fixed pointer-events-none z-0" style={{ left: pos.x, top: pos.y, width: '500px', height: '500px', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />;
};

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('comment');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openFaq, setOpenFaq] = useState(0); // প্রথম প্রশ্নটি খোলা থাকবে
    const [activeHeroBtn, setActiveHeroBtn] = useState("start");

    useEffect(() => {
        setSelectedPlan(null);
    }, [activeTab]);

    const tabs = [
        { id: 'comment', label: 'কমেন্ট অটোরিপ্লাই', icon: <MessageCircle size={18} /> },
        { id: 'message', label: 'মেসেজ অটোরিপ্লাই', icon: <MessageSquare size={18} /> },
        { id: 'image', label: 'ছবি অটোপোস্ট', icon: <ImageIcon size={18} /> },
        { id: 'reel', label: 'রিল অটোপোস্ট', icon: <Film size={18} /> },
        { id: 'combo', label: 'কম্বো প্ল্যান', icon: <Package size={18} /> },
    ];

    const contentData = {
        comment: {
            engTitle: "Comment Automation", bngTitle: "কমেন্ট অটোমেশন",
            steps: [{ title: "Get Comment", desc: "কমেন্ট পাওয়া", icon: <MessageCircle className="text-cyan-400" /> }, { title: "AI Check", desc: "AI বিশ্লেষণ", icon: <Zap className="text-yellow-400" /> }, { title: "Reply Sent", desc: "রিপ্লাই সম্পন্ন", icon: <CheckCircle2 className="text-green-400" /> }],
            mainDesc: "আপনার সোশ্যাল মিডিয়া এনগেজমেন্ট এখন হবে সম্পূর্ণ অটোমেটেড। আমাদের AI প্রতিটি কমেন্ট বিশ্লেষণ করে নিমিষেই স্মার্ট রিপ্লাই দিয়ে দিবে।",
            smallFeatures: [{ label: "রিয়েল-টাইম ট্র্যাকিং", icon: <Clock /> }, { label: "স্মার্ট অ্যানালিটিক্স", icon: <BarChart3 /> }, { label: "অটোমেটিক অ্যাকশন", icon: <Zap /> }, { label: "স্প্যাম প্রোটেকশন", icon: <ShieldCheck /> }],
            pricing: [
                { name: "Basic Plan", bng: "বেসিক প্ল্যান", price: "৩০০", perks: ["২৪/৭ মনিটরিং", "১০০ কমেন্ট রিপ্লাই", "অটো লাইক সিস্টেম"] },
                { name: "Regular Plan", bng: "রেগুলার প্ল্যান", price: "৪৫০", perks: ["১৫০০ কমেন্ট প্রসেস", "স্প্যাম ডিটেকশন ও ডিলিট", "স্মার্ট AI রিপ্লাই"], popular: true },
                { name: "Pro Plan", bng: "প্রো প্ল্যান", price: "৫৫৫", perks: ["আনলিমিটেড কমেন্ট", "অ্যাডভান্সড AI এনালাইসিস", "প্রাইসরিটি সাপোর্ট"] }
            ]
        },
        message: {
            engTitle: "Message Automation", bngTitle: "মেসেজ অটোমেশন",
            steps: [{ title: "Get Message", desc: "মেসেজ পাওয়া", icon: <MessageSquare className="text-[#00E5FF]" /> }, { title: "AI Analyze", desc: "AI বিশ্লেষণ", icon: <BarChart3 className="text-yellow-400" /> }, { title: "Smart Reply", desc: "স্মার্ট উত্তর", icon: <Zap className="text-green-400" /> }],
            mainDesc: "ইনবক্সে আসা প্রতিটি মেসেজ মানেই একেকজন সম্ভাব্য ক্রেতা। আমাদের স্মার্ট AI প্রতিটি মেসেজ বিশ্লেষণ করে সঠিক তথ্য দিয়ে কাস্টমারকে কনভার্ট করে।",
            smallFeatures: [{ label: "২৪/৭ মনিটরিং", icon: <Clock /> }, { label: "স্মার্ট রেসপন্স", icon: <Zap /> }, { label: "অর্ডার ট্র্যাকিং", icon: <MousePointer2 /> }, { label: "হিউম্যান হ্যান্ডওভার", icon: <Headset /> }],
            pricing: [
                { name: "Starter Plan", bng: "স্টার্টার প্ল্যান", price: "৬০০", perks: ["দৈনিক ৫০০টি মেসেজ", "১টি সোশ্যাল একাউন্ট", "বেসিক এআই ট্রেইন"] },
                { name: "Growth Plan", bng: "গ্রোথ প্ল্যান", price: "৯৫০", perks: ["মাসিক ৩০০০টি মেসেজ", "১০টি একাউন্ট সাপোর্ট", "অ্যাডভান্সড মার্কেটিং"], popular: true },
                { name: "Business Plan", bng: "বিজনেস প্ল্যান", price: "Contact", perks: ["আনলিমিটেড মেসেজ", "ডেডিকেটেড ম্যানেজার", "কাস্টম AI"], isContact: true }
            ]
        },
        image: {
            engTitle: "Image Automation", bngTitle: "ছবি অটোপোস্ট",
            steps: [{ title: "Select Image", desc: "ছবি নির্বাচন", icon: <ImageIcon className="text-cyan-400" /> }, { title: "Set Time", desc: "সময় নির্ধারণ", icon: <Calendar className="text-yellow-400" /> }, { title: "Auto Post", desc: "অটো পোস্ট", icon: <CheckCircle2 className="text-green-400" /> }],
            mainDesc: "আপনার পেজে নিয়মিত ছবি পোস্ট করার ঝামেলা থেকে মুক্তি পান। শিডিউল করে রাখুন এবং সঠিক সময়ে আপনার ছবিগুলো অটোমেটিক পোস্ট হয়ে যাবে।",
            smallFeatures: [{ label: "সহজ শিডিউলিং", icon: <Calendar /> }, { label: "মাল্টি-প্ল্যাটফর্ম", icon: <Layout /> }, { label: "ক্যাপশন এআই", icon: <BarChart3 /> }, { label: "বড় স্টোরেজ", icon: <ShieldCheck /> }],
            pricing: [
                { name: "Basic Post", bng: "বেসিক পোস্ট", price: "৫০০", perks: ["১০টি মাসিক পোস্ট", "ফেসবুক সাপোর্ট", "অটো ক্যাপশন"] },
                { name: "Standard Post", bng: "স্ট্যান্ডার্ড পোস্ট", price: "৮০০", perks: ["৫০টি মাসিক পোস্ট", "ফেসবুক ও ইন্সটাগ্রাম", "স্মার্ট শিডিউলার"], popular: true },
                { name: "Unlimited", bng: "আনলিমিটেড", price: "১৫০০", perks: ["আনলিমিটেড পোস্ট", "সব প্ল্যাটফর্ম", "এআই অপ্টিমাইজার"] }
            ]
        },
        reel: {
            engTitle: "Reels Automation", bngTitle: "রিল অটোপোস্ট",
            steps: [{ title: "Select Video", desc: "ভিডিও নির্বাচন", icon: <Video className="text-cyan-400" /> }, { title: "Set Audio", desc: "অডিও ও ক্যাপশন", icon: <Music className="text-yellow-400" /> }, { title: "Go Viral", desc: "অটো পাবলিশ", icon: <TrendingUp className="text-green-400" /> }],
            mainDesc: "ভিডিও এনগেজমেন্ট বাড়ানোর জন্য নিয়মিত রিলস আপলোড করা এখন পানির মতো সহজ। ট্রেন্ডিং মিউজিক এবং হ্যাশট্যাগ সহ রিলস অটোমেট করুন।",
            smallFeatures: [{ label: "অটো রিলস আপলোড", icon: <Video /> }, { label: "ট্রেন্ডিং অডিও", icon: <Music /> }, { label: "অ্যালগরিদম বুস্ট", icon: <TrendingUp /> }, { label: "স্মার্ট হ্যাশট্যাগ", icon: <BarChart3 /> }],
            pricing: [
                { name: "Basic Reels", bng: "বেসিক রিলস", price: "৯০০", perks: ["৫টি মাসিক রিলস", "ফেসবুক সাপোর্ট", "ট্রেন্ডিং অডিও"] },
                { name: "Smart Reels", bng: "স্মার্ট রিলস", price: "১২০০", perks: ["১৫টি মাসিক রিলস", "ইন্সটাগ্রাম সাপোর্ট", "স্মার্ট ক্যাপশন"], popular: true },
                { name: "Viral Reels", bng: "ভাইরাল রিলস", price: "১৮০০", perks: ["আনলিমিটেড রিলস", "সব প্ল্যাটফর্ম", "ভাইরাল অ্যানালিটিক্স"] }
            ]
        },
        combo: {
            engTitle: "Complete Solution", bngTitle: "কম্বো প্ল্যান",
            steps: [{ title: "All-in-One", desc: "সব একসাথে", icon: <Monitor className="text-cyan-400" /> }, { title: "AI Orchestration", desc: "AI প্রোসেসিং", icon: <Cpu className="text-yellow-400" /> }, { title: "Full Solution", desc: "সম্পূর্ণ সমাধান", icon: <Rocket className="text-green-400" /> }],
            mainDesc: "সব সার্ভিস একসাথে নিন এবং সময় সাশ্রয় করুন। কমেন্ট, মেসেজ, ইমেজ এবং রিল পোস্ট—সব একটি প্ল্যানে। আপনার সম্পূর্ণ সোশ্যাল মিডিয়া অটোমেশন সলিউশন।",
            smallFeatures: [{ label: "সব সার্ভিস একসাথে", icon: <Package /> }, { label: "বেশি সাশ্রয়", icon: <Zap /> }, { label: "সিঙ্গেল ড্যাশবোর্ড", icon: <Monitor /> }, { label: "প্রাইসরিটি সাপোর্ট", icon: <ShieldCheck /> }],
            pricing: [
                { name: "Starter Combo", bng: "স্টার্টার কম্বো", price: "১২৫০", perks: ["মেসেজ + কমেন্ট", "৫টি ইমেজ পোস্ট", "বেসিক সাপোর্ট"] },
                { name: "Business Plus", bng: "বিজনেস প্লাস", price: "২৫৫০", perks: ["সব ফিচার + রিলস", "৫০টি পোস্ট মাসিক", "ডেডিকেটেড সাপোর্ট"], popular: true },
                { name: "Ultimate", bng: "আল্টিমেট", price: "২৮০০", perks: ["আনলিমিটেড সব ফিচার", "১০০টি পোস্ট মাসিক", "সব বিষয়ে অগ্রাধিকার"] }
            ]
        },
    };

    const faqData = [
        { q: "কম্বো প্ল্যানে কি কি সার্ভিস অন্তর্ভুক্ত?", a: "কম্বো প্ল্যানে আপনি আমাদের সবগুলো প্রিমিয়াম সার্ভিস একসাথে পাবেন। এর মধ্যে রয়েছে ফেসবুক ও ইন্সটাগ্রামের জন্য অটোমেটিক কমেন্ট রিপ্লাই, মেসেজ রিপ্লাই, ছবি ও রিল পোস্ট শিডিউলিং। এটি মূলত বড় ব্যবসার জন্য সময় সাশ্রয়ী একটি সমাধান।" },
        { q: "আলাদা আলাদা সেকশন নেওয়ার চেয়ে কম্বো কত সাশ্রয়ী হবে?", a: "আপনি যদি প্রতিটি সার্ভিস আলাদাভাবে কিনেন তবে খরচ প্রায় ২০% বেশি হবে। কম্বো প্ল্যানটি এমনভাবে সাজানো হয়েছে যাতে গ্রাহকরা একটি নির্দিষ্ট সাশ্রয়ী মূল্যে সব ধরনের অটোমেশন সুবিধা উপভোগ করতে পারেন।" },
        { q: "আমি কি পরে প্ল্যান আপডেট করতে পারবো?", a: "জি অবশ্যই! আপনি যেকোনো সময় আপনার বর্তমান প্ল্যান থেকে উচ্চতর প্ল্যানে মাইগ্রেট করতে পারবেন। আমাদের ড্যাশবোর্ড থেকে খুব সহজেই এটি করা সম্ভব অথবা আমাদের সাপোর্ট টিমের সাহায্য নিতে পারেন।" },
        { q: "এন্টারপ্রাইজ প্ল্যানে কী কী পাওয়া যায়?", a: "এন্টারপ্রাইজ প্ল্যানটি মূলত বড় এজেন্সির জন্য। এতে আপনি আনলিমিটেড মেসেজ ও কমেন্ট প্রোসেসিং সুবিধা পাবেন। এছাড়া আপনার বিজনেসের জন্য কাস্টম এআই মডেল এবং একজন ডেডিকেটেড সাপোর্ট ম্যানেজার নিয়োগ দেওয়া হবে।" }
    ];
    const current = contentData[activeTab];

    return (
        <main className="w-full relative bg-[#020617] text-white min-h-screen overflow-hidden pb-32">
            <MouseGlow />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-10 container mx-auto px-6 text-center">
                {/* Corner decoration color */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px] pointer-events-none z-0" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none z-0" />
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">সোশ্যাল মিডিয়া <br /> <span className="text-[#00E5FF]">অটোমেশন</span></h1>
                <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-8 font-medium opacity-80">
                    AI দিয়ে আপনার ফেসবুক ও ইন্সটাগ্রাম বিজনেস অটোমেট করুন। <br className="hidden md:block" />
                    সময় বাঁচান, আপনার বিক্রি কয়েক গুণ বাড়িয়ে নিন।
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16 relative z-10">
                    <Link
                        href="/landingpagesignup"
                        onClick={() => setActiveHeroBtn("start")}
                        className={`flex items-center justify-center gap-3 px-10 py-4 font-black text-lg rounded-2xl transition-all duration-300 ${activeHeroBtn === "start"
                            ? "bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.4)] scale-105"
                            : "bg-black/40 text-white border border-white/10 hover:bg-white/5"
                            }`}
                    >
                        শুরু করুন <ArrowRight size={20} />
                    </Link>

                    <a
                        href="#features-section"
                        onClick={() => setActiveHeroBtn("demo")}
                        className={`px-10 py-4 font-bold text-lg rounded-2xl backdrop-blur-md transition-all duration-300 ${activeHeroBtn === "demo"
                            ? "bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.4)] scale-105"
                            : "bg-black/40 text-white border border-white/10 hover:bg-white/5"
                            }`}
                    >
                        ডেমো দেখুন
                    </a>
                </div>
                <div className="max-w-5xl mx-auto border-t border-white/5 pt-2 grid grid-cols-2 md:grid-cols-4 text-center">
                    <div className="py-4"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={1000} suffix="+" /></div><p className="text-gray-500 font-bold uppercase text-[10px]">ব্যবহারকারী</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={50} suffix="কে+" /></div><p className="text-gray-500 font-bold uppercase text-[10px]">অটো রেসপন্স</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={99} suffix=".9%" /></div><p className="text-gray-500 font-bold uppercase text-[10px]">আপটাইম</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={24} suffix="/7" /></div><p className="text-gray-500 font-bold uppercase text-[10px]">সাপোর্ট</p></div>
                </div>
            </section>

            {/* বাটন ট্যাব সেকশন */}
            <section id="features-section" className="relative z-20 py-6 container mx-auto flex justify-center overflow-x-auto no-scrollbar pb-10">
                <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-3 rounded-xl text-[12px] md:text-[14px] font-bold transition-colors duration-200 overflow-hidden ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'
                                }`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {/* অ্যাক্টিভ ট্যাবের ব্যাকগ্রাউন্ড এবং ঢেউ এনিমেশন */}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    // মূল ব্যাকগ্রাউন্ড কালার (সায়ান)
                                    className="absolute inset-0 bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] rounded-xl overflow-hidden"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                >
                                    {/* এই অংশটি চোখে পড়ার মতো হলুদ ঢেউ তৈরি করবে */}
                                    <motion.div
                                        // পরিবর্তন এখানে: via-white/60 এর বদলে via-yellow-300/80 ব্যবহার করা হয়েছে
                                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent skew-x-[-20deg]"
                                        initial={{ x: '-150%' }}
                                        animate={{ x: '150%' }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.3, // গতি একটু বাড়িয়ে দেওয়া হয়েছে
                                            ease: "linear",
                                            repeatDelay: 0.1
                                        }}
                                    />
                                </motion.div>
                            )}

                            {/* টেক্সট এবং আইকন */}
                            <span className="relative z-10 flex items-center gap-2">
                                {tab.icon} {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ডাইনামিক কন্টেন্ট এরিয়া */}
            <div className="container mx-auto px-6 max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                        <div className="mb-20"><h2 className="text-3xl md:text-6xl font-black text-[#00E5FF] mb-2">{current.engTitle}</h2><p className="text-xl font-bold text-white/80">{current.bngTitle}</p></div>
                        {current.steps.length > 0 && (
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
                                {current.steps.map((step, i) => (
                                    <React.Fragment key={i}><div className="flex flex-col items-center gap-4"><div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-3xl shadow-xl hover:border-[#00E5FF]/40 transition-all">{step.icon}</div><div className="text-center"><p className="text-sm font-black text-[#00E5FF]">{step.title}</p><p className="text-xs text-gray-500 font-bold">{step.desc}</p></div></div>{i < 2 && <ArrowRight className="hidden md:block text-gray-800 animate-pulse" size={28} />}</React.Fragment>
                                ))}
                            </div>
                        )}
                        <p className="max-w-4xl mx-auto text-gray-400 text-lg md:text-xl mb-20 leading-relaxed italic opacity-80">"{current.mainDesc}"</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto text-center">
                            {current.smallFeatures.map((feat, i) => (
                                <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-white/[0.06] transition-all"><div className="text-[#00E5FF] bg-[#00E5FF]/10 p-3 rounded-2xl">{React.cloneElement(feat.icon, { size: 20 })}</div><span className="text-xs md:text-sm font-black tracking-widest uppercase">{feat.label}</span></div>
                            ))}
                        </div>
                        <h3 className="text-4xl font-black text-white mb-12">আপনার পছন্দের <span className="text-[#00E5FF]">প্ল্যানটি</span> বেছে নিন</h3>
                        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto text-left">
                            {current.pricing.map((plan, i) => (
                                <div key={i} onClick={() => setSelectedPlan(i)} className={`relative p-10 rounded-[2.5rem] bg-[#050c18] border transition-all duration-500 flex flex-col cursor-pointer ${selectedPlan === i ? 'border-[#00E5FF] ring-1 ring-[#00E5FF] shadow-[0_0_50px_rgba(0,229,255,0.15)]' : 'border-white/5'} ${plan.popular ? 'scale-105 z-10' : ''}`}>
                                    {/* {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-black text-[10px] font-black px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]">জনপ্রিয়</div>} */}
                                    <div className="mb-10"><h3 className="text-2xl font-black">{plan.name}</h3><p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{plan.bng}</p></div>
                                    <div className="mb-12 flex items-baseline gap-1">{plan.isContact ? <span className="text-3xl md:text-5xl font-black text-[#00E5FF]">Contact Us</span> : <><span className="text-5xl md:text-7xl font-black text-[#00E5FF]">৳{plan.price}</span><span className="text-gray-500 font-bold text-sm">/মাস</span></>}</div>
                                    <div className="space-y-5 mb-14 flex-grow">{plan.perks.map((p, pi) => (<div key={pi} className="flex items-center gap-3 text-sm md:text-base text-gray-300 font-medium"><CheckCircle2 size={18} className="text-[#00E5FF] flex-shrink-0" /> {p}</div>))}</div>
                                    <button className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${plan.popular || selectedPlan === i ? 'bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.4)]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>{plan.isContact ? "যোগাযোগ করুন" : "অর্ডার করুন"}</button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- ৪. সচরাচর জিজ্ঞাসা (FAQ Section) --- */}
            <section id="faq" className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-[#00E5FF] mb-4">সচরাচর জিজ্ঞাসা</h2>
                    <p className="text-gray-400 text-lg">আপনার সাধারণ প্রশ্নের উত্তর</p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border border-white/5 rounded-3xl bg-white/[0.02] overflow-hidden transition-all hover:border-[#00E5FF]/20">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${openFaq === index ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                        <HelpCircle size={20} />
                                    </div>
                                    <span className={`text-base md:text-xl font-bold transition-colors ${openFaq === index ? 'text-[#00E5FF]' : 'text-gray-300'}`}>
                                        {faq.q}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                                    className="text-gray-500"
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 pt-2">
                                            <div className="w-full h-px bg-white/5 mb-6" />
                                            <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
            <section className="relative z-10 py-10 container mx-auto px-6">
                <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-[#00ffd5] via-[#00e1ff] to-[#00a2ff] p-10 md:p-20 text-center text-black overflow-hidden relative">

                    {/* কন্টেন্ট */}
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-6xl font-black mb-6 leading-tight">
                            Enterprise? আমাদের সাথে যোগাযোগ করুন
                        </h2>

                        <p className="max-w-3xl mx-auto text-sm md:text-lg font-bold mb-10 opacity-80 leading-relaxed">
                            বড় ব্যবসা বা এজেন্সির জন্য কাস্টম সলিউশন দরকার? আমাদের টিমের সাথে কথা বলুন <br className="hidden md:block" />
                            এবং আপনার প্রয়োজন অনুযায়ী প্ল্যান তৈরি করুন।
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                            {/* হোয়াটসঅ্যাপ বাটন */}
                            <button className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all shadow-xl">
                                <MessageCircle size={20} />
                                WhatsApp এ মেসেজ করুন
                            </button>

                            {/* ডেমো বা অন্য কোনো বাটন */}
                            <button className="px-10 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all shadow-xl">
                                সরাসরি কথা বলুন
                            </button>
                        </div>

                        {/* সাপোর্ট লাইন */}
                        <div className="flex items-center justify-center gap-2 font-bold opacity-70">
                            <Phone size={18} />
                            <span className="text-sm md:text-base">সাপোর্ট: ২৪/৭ উপলব্ধ</span>
                        </div>
                    </div>

                    {/* ব্যাকগ্রাউন্ড ডেকোরেশন (হালকা গ্লো) */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] -z-0" />
                </div>
            </section>
        </main>
    );
};

export default HomePage;