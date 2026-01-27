"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, MessageSquare, Image as ImageIcon, Film, Package, 
  ArrowRight, Zap, CheckCircle2, Clock, BarChart3, ShieldCheck 
} from "lucide-react";

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
            engTitle: "Comment Automation",
            bngTitle: "কমেন্ট অটোমেশন",
            steps: [
                { title: "Get Comment", desc: "কমেন্ট পাওয়া", icon: <MessageCircle className="text-cyan-400" /> },
                { title: "AI Check", desc: "AI বিশ্লেষণ", icon: <Zap className="text-yellow-400" /> },
                { title: "Reply Sent", desc: "রিপ্লাই সম্পন্ন", icon: <CheckCircle2 className="text-green-400" /> }
            ],
            mainDesc: "আপনার সোশ্যাল মিডিয়া এনগেজমেন্ট এখন হবে সম্পূর্ণ অটোমেটেড। আমাদের AI প্রতিটি কমেন্ট বিশ্লেষণ করে নিমিষেই স্মার্ট রিপ্লাই দিয়ে দিবে।",
            smallFeatures: [
                { label: "রিয়েল-টাইম ট্র্যাকিং", icon: <Clock size={20} /> },
                { label: "স্মার্ট অ্যানালিটিক্স", icon: <BarChart3 size={20} /> },
                { label: "অটোমেটিক অ্যাকশন", icon: <Zap size={20} /> },
                { label: "স্প্যাম প্রোটেকশন", icon: <ShieldCheck size={20} /> }
            ],
            pricing: [
                { name: "Basic", bng: "বেসিক", price: "৩০০", perks: ["২৪/৭ মনিটরিং", "১০০ কমেন্ট রিপ্লাই"] },
                { name: "Regular", bng: "রেগুলার", price: "৪৫০", perks: ["১৫০০ কমেন্ট প্রসেস", "স্প্যাম ডিলিট"], popular: true },
                { name: "Pro", bng: "প্রো", price: "৫৫৫", perks: ["আনলিমিটেড কমেন্ট", "AI এনালাইসিস"] }
            ]
        },
        message: {
            engTitle: "Message Automation",
            bngTitle: "মেসেজ অটোমেশন",
            steps: [
                { title: "Get Message", desc: "মেসেজ পাওয়া", icon: <MessageSquare className="text-blue-400" /> },
                { title: "NLP Check", desc: "ভাষা বিশ্লেষণ", icon: <Zap className="text-yellow-400" /> },
                { title: "Smart Reply", desc: "স্মার্ট উত্তর", icon: <CheckCircle2 className="text-green-400" /> }
            ],
            mainDesc: "গ্রাহক মেসেজ দেওয়া মাত্রই তাদের সাথে ইন্টারেকশন শুরু হবে। সময় বাঁচান এবং কাস্টমার সার্ভিসে পান ১০০% অ্যাকুরেসি।",
            smallFeatures: [
                { label: "ইনস্ট্যান্ট রেসপন্স", icon: <Zap size={20} /> },
                { label: "লিড জেনারেশন", icon: <CheckCircle2 size={20} /> },
                { label: "কাস্টম বোট", icon: <BarChart3 size={20} /> },
                { label: "২৪/৭ একটিভ", icon: <Clock size={20} /> }
            ],
            pricing: [
                { name: "Lite", bng: "লাইট", price: "৪০০", perks: ["৫০০ মেসেজ", "অটো গ্রিটিং"] },
                { name: "Business", bng: "বিজনেস", price: "৭০০", perks: ["৩০০০ মেসেজ", "স্মার্ট রিপ্লাই"], popular: true },
                { name: "Enterprise", bng: "এন্টারপ্রাইজ", price: "১২০০", perks: ["আনলিমিটেড", "ভিআইপি সাপোর্ট"] }
            ]
        }
    };

    const current = contentData[activeTab] || contentData['comment'];

    return (
        <main className="w-full relative bg-[#020617] text-white min-h-screen overflow-hidden pb-32">
            <MouseGlow />
            
            {/* --- Hero Section --- */}
            <section className="relative z-10 pt-32 pb-10 container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
                   সোশ্যাল মিডিয়া <br /> <span className="text-[#00E5FF]">অটোমেশন</span>
                </h1>
                <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-medium opacity-80">
                        AI দিয়ে আপনার ফেসবুক ও ইন্সটাগ্রাম বিজনেস অটোমেট করুন। <br className="hidden md:block" />
                        সময় বাঁচান, আপনার বিক্রি কয়েক গুণ বাড়িয়ে নিন।
                </p>

                {/* --- নতুন বাটন দুটো এখানে (ছবি অনুযায়ী) --- */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16">
                    <button className="flex items-center justify-center gap-3 px-10 py-4 bg-[#00E5FF] text-black font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-105 transition-all active:scale-95">
                        শুরু করুন <ArrowRight size={20} />
                    </button>
                    <button className="px-10 py-4 bg-black/40 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/5 backdrop-blur-md transition-all">
                        ডেমো দেখুন
                    </button>
                </div>

                {/* Stats Section */}
                <div className="max-w-5xl mx-auto border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-4">
                    <div className="py-4"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={1000} suffix="+" /></div><p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">ব্যবহারকারী</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={50} suffix="কে+" /></div><p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">অটো রেসপন্স</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={99} suffix=".৯%" /></div><p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">আপটাইম</p></div>
                    <div className="py-4 border-l border-white/5"><div className="text-3xl md:text-5xl font-black text-[#00E5FF]"><SmoothCounter target={24} suffix="/৭" /></div><p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">সাপোর্ট</p></div>
                </div>
            </section>

            {/* ৫টি ট্যাব বাটন */}
            <section className="relative z-20 py-6">
                <div className="container mx-auto px-4 flex justify-center overflow-x-auto no-scrollbar pb-10">
                    <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[12px] md:text-[14px] font-bold transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab.id ? 'bg-[#00E5FF] text-black shadow-[0_0_30px_rgba(0,229,255,0.6)] scale-105' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ডাইনামিক কন্টেন্ট এরিয়া */}
                <div className="container mx-auto px-6 max-w-6xl mt-10">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                            
                            <h2 className="text-3xl md:text-6xl font-black text-[#00E5FF] mb-2">{current.engTitle}</h2>
                            <p className="text-xl md:text-2xl font-bold text-white/80 mb-16">{current.bngTitle}</p>

                            {/* প্রসেস ফ্লো (৩টি বক্স) */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
                                {current.steps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-4 group">
                                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl transition-all hover:border-[#00E5FF]/40">
                                                {step.icon}
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-black text-[#00E5FF]">{step.title}</p>
                                                <p className="text-xs text-gray-500 font-bold">{step.desc}</p>
                                            </div>
                                        </div>
                                        {i < 2 && <ArrowRight className="hidden md:block text-gray-700 animate-pulse" size={32} />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* ৪টি ফিচার কার্ড গ্রিড */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 text-left">
                                {current.smallFeatures.map((feat, i) => (
                                    <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-white/[0.06] transition-all">
                                        <div className="text-[#00E5FF] bg-[#00E5FF]/10 p-3 rounded-2xl">{feat.icon}</div>
                                        <span className="text-xs md:text-sm font-black tracking-widest uppercase text-center">{feat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* প্রাইসিং প্ল্যানস (ক্লিক লজিক সহ) */}
                            <h3 className="text-4xl font-black text-white mb-12">আপনার পছন্দের <span className="text-[#00E5FF]">প্ল্যানটি</span> বেছে নিন</h3>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                {current.pricing.map((p, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedPlan(i)}
                                        className={`relative p-8 rounded-[2.5rem] bg-white/[0.02] border backdrop-blur-3xl flex flex-col cursor-pointer transition-all duration-300 
                                            ${selectedPlan === i ? 'border-[#00E5FF] ring-1 ring-[#00E5FF]/50 shadow-[0_0_40px_rgba(0,229,255,0.2)]' : 'border-white/5'}
                                            ${p.popular ? 'scale-105 z-10' : ''}`}
                                    >
                                        {p.popular && <div className="absolute -top-4 right-8 bg-[#00E5FF] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]">জনপ্রিয়</div>}
                                        <div className="mb-8 text-left"><h4 className="text-2xl font-black">{p.name}</h4><p className="text-gray-500 font-bold text-xs uppercase">{p.bng}</p></div>
                                        <div className="mb-10 flex items-baseline gap-1"><span className="text-4xl md:text-6xl font-black text-[#00E5FF]">৳{p.price}</span><span className="text-gray-500 font-bold text-sm">/মাস</span></div>
                                        <div className="space-y-4 mb-12 flex-grow">
                                            {p.perks.map((feat, fi) => (
                                                <div key={fi} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                                                    <CheckCircle2 size={16} className="text-[#00E5FF]" /> {feat}
                                                </div>
                                            ))}
                                        </div>
                                        <button className={`w-full py-4 rounded-2xl font-black transition-all ${p.popular || selectedPlan === i ? 'bg-[#00E5FF] text-black' : 'bg-white/5 border border-white/10'}`}>অর্ডার করুন</button>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
};

export default HomePage;