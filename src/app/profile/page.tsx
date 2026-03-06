"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfileDashboard() {
    const { isNidaVerified, activePathway, cartCount } = useAppContext();
    const [streak, setStreak] = useState(12);
    const [pillTakenToday, setPillTakenToday] = useState(false);

    // Mock 30-day calendar data
    const days = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        status: i < streak ? "taken" : (i === streak && pillTakenToday ? "taken" : (i === streak ? "today" : "upcoming")),
        date: new Date(new Date().setDate(new Date().getDate() - streak + i)).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
    }));

    const handleTakePill = () => {
        setPillTakenToday(true);
        setStreak(prev => prev + 1);
        alert("Log recorded! Keep up the great work.");
    };

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 pb-24 space-y-10">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-4xl text-primary">person</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight mb-1">My Health Profile</h1>
                            <div className="flex items-center gap-3">
                                {isNidaVerified ? (
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                                        <span className="material-symbols-outlined text-sm">verified</span> Law N° 026/2025 Authenticated
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-500/10 px-2 py-1 rounded-md">
                                        <span className="material-symbols-outlined text-sm">pending</span> Action Required: Verify Age
                                    </span>
                                )}
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest border-l border-slate-300 dark:border-slate-700 pl-3">
                                    {activePathway ? `${activePathway} Path Active` : "No Path Selected"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:border-primary/50 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">settings</span> Settings
                    </button>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Active Routine Card */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-800/80 rounded-3xl p-8 border border-primary/10 shadow-xl shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">medication</span>
                                    {activePathway === "crisis" ? "30-Day PEP Regimen" : "Daily PrEP Routine"}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Consistency is key to prevention.</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl flex flex-col items-center justify-center border border-primary/20">
                                <span className="text-2xl font-black leading-none">{streak}</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Day Streak</span>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 md:gap-3 mb-8 relative z-10">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{day}</div>
                            ))}
                            {days.map((d) => (
                                <div
                                    key={d.day}
                                    title={d.date}
                                    className={`
                                        aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all
                                        ${d.status === 'taken' ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' : ''}
                                        ${d.status === 'today' ? 'bg-background-light dark:bg-slate-900 border-2 border-primary text-primary ring-4 ring-primary/10' : ''}
                                        ${d.status === 'upcoming' ? 'bg-slate-100 dark:bg-slate-700/50 text-slate-400' : ''}
                                    `}
                                >
                                    {d.status === 'taken' ? <span className="material-symbols-outlined text-[18px]">check</span> : d.day}
                                </div>
                            ))}
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`size-12 rounded-full flex items-center justify-center ${pillTakenToday ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                                    <span className="material-symbols-outlined text-2xl">{pillTakenToday ? 'task_alt' : 'notifications_active'}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{pillTakenToday ? "You're all set for today!" : "Time for your dose."}</p>
                                    <p className="text-xs text-slate-500">{pillTakenToday ? "Next dose tomorrow at 8:00 AM" : "Scheduled for 8:00 AM"}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleTakePill}
                                disabled={pillTakenToday}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${pillTakenToday ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:shadow-lg hover:shadow-primary/30 active:scale-95'}`}
                            >
                                {pillTakenToday ? "Logged" : "Log Dose"}
                            </button>
                        </div>
                    </div>

                    {/* Side Widgets */}
                    <div className="space-y-6">
                        {/* Legal Pass Mini */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10"></div>

                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Express Pass</h3>

                            <div className="flex items-center justify-center py-4">
                                <div className="size-24 bg-white rounded-xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-slate-900 text-[5rem]">qr_code_2</span>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                {isNidaVerified ? (
                                    <>
                                        <p className="text-green-400 font-bold text-sm mb-1 flex items-center justify-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">verified</span> Validated
                                        </p>
                                        <Link href="/counselor" className="text-xs text-primary hover:underline">View Full Document</Link>
                                    </>
                                ) : (
                                    <p className="text-red-400 font-bold text-sm mb-1 flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">warning</span> Action Required
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Logistics</h3>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-slate-500">inventory_2</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">U+U Care Pack</p>
                                        <p className="text-xs text-slate-500">Delivered • 2 days ago</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/checkout" className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-bold hover:text-primary transition-colors">
                                Order Refill <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
