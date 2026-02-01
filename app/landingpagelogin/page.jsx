// "use client";
// import React from 'react';
// import Link from 'next/link';

// export default function LoginPage() {
//     return (
//         <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 relative overflow-hidden">
//             {/* ব্যাকগ্রাউন্ড গ্লো */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-0" />

//             <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative z-10">
//                 <div className="text-center mb-10">
//                     <h1 className="text-3xl font-black mb-2">স্বাগতম</h1>
//                     <p className="text-gray-400 font-medium text-sm">আপনার একাউন্টে লগইন করুন</p>
//                 </div>

//                 <form className="space-y-6">
//                     <div>
//                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">ইমেইল এড্রেস</label>
//                         <input type="email" placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#00E5FF] transition-all text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">পাসওয়ার্ড</label>
//                         <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#00E5FF] transition-all text-white" />
//                     </div>
                    
//                     <button className="w-full py-4 bg-[#00E5FF] text-black font-black rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.02] transition-all active:scale-95">
//                         লগইন করুন
//                     </button>
//                 </form>

//                 <p className="mt-8 text-center text-gray-500 text-sm font-medium">
//                     একাউন্ট নেই? <Link href="/signup" className="text-[#00E5FF] hover:underline">নতুন একাউন্ট খুলুন</Link>
//                 </p>
//             </div>
//         </main>
//     );
// }