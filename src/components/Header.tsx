"use client";

import React from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
    const { isNidaVerified, nidaAge } = useAppContext();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/70 backdrop-blur-md dark:bg-background-dark/70 px-6 lg:px-20 py-4">
            <nav className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-primary rounded-lg p-1.5 text-white">
                        <span className="material-symbols-outlined !text-3xl">all_inclusive</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                        U<span className="text-primary">+</span>U
                    </h1>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <Link href="/checkout" className="text-sm font-semibold hover:text-primary transition-colors">Shop</Link>
                    <Link href="/counselor" className="text-sm font-semibold hover:text-primary transition-colors">Directives</Link>
                    <Link href="#" className="text-sm font-semibold hover:text-primary transition-colors">Legal</Link>
                </div>
                <div className="flex items-center gap-4">
                    {!isNidaVerified ? (
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20">
                            Login
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:block">
                                Verified: <span className="text-primary">{nidaAge}yrs</span>
                            </span>
                            <div className="flex items-center justify-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                                <span className="material-symbols-outlined !text-[14px] mr-1">verified</span> ID Active
                            </div>
                        </div>
                    )}
                    <Link href="/profile" className="size-10 rounded-full border-2 border-primary/20 bg-slate-200 flex items-center justify-center hover:bg-primary/20 transition-colors" title="User profile pointer">
                        <span className="material-symbols-outlined text-slate-500 hover:text-primary">person</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
