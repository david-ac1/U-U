import React from "react";
import Link from "next/link";

export default function MusaCounselor() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased h-screen flex flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-3 z-50">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-primary">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">health_metrics</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Musa Health</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/counselor" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Counselor</Link>
                        <Link href="#" className="text-primary text-sm font-semibold border-b-2 border-primary pb-1">Legal Pass</Link>
                        <Link href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Clinics</Link>
                        <Link href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Profile</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </button>
                    <button className="bg-primary text-slate-900 px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        Emergency Help
                    </button>
                    <div className="size-10 rounded-full border-2 border-primary/20 p-0.5">
                        <div className="w-full h-full rounded-full bg-cover bg-center bg-slate-300" title="User profile avatar photo"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Chat Section */}
                <section className="flex-1 flex flex-col bg-white dark:bg-slate-900/50 border-r border-primary/10">
                    <div className="p-6 border-b border-primary/5 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Musa Counselor</h1>
                            <p className="text-xs text-primary font-medium uppercase tracking-wider">Active Chat Session</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors"><span className="material-symbols-outlined text-slate-500">more_vert</span></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="flex items-end gap-3 max-w-[85%]">
                            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-primary ml-1 uppercase">Musa (Your U+U Guide)</span>
                                <div className="bg-background-light dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-primary/5 shadow-sm">
                                    <p className="text-sm leading-relaxed">
                                        Under Rwanda Law N° 026/2025, you have the legal right to these services. I've found 3 Youth-Friendly Clinics near Kimisagara.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 items-end ml-auto max-w-[85%]">
                            <div className="bg-primary text-slate-900 p-4 rounded-2xl rounded-br-none shadow-md">
                                <p className="text-sm font-medium">Thank you, Musa. Can you show me my digital pass for the visit?</p>
                            </div>
                            <span className="text-[10px] text-slate-400 mr-1">Read 14:02</span>
                        </div>

                        <div className="flex items-end gap-3 max-w-[85%]">
                            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-primary ml-1 uppercase">Musa (Your U+U Guide)</span>
                                <div className="bg-background-light dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-primary/5 shadow-sm">
                                    <p className="text-sm leading-relaxed">
                                        Of course! I've generated your encrypted Digital Health Access Card. It's visible on the right panel. This is valid for all youth-friendly health centers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-background-dark border-t border-primary/10">
                        <div className="relative flex items-center gap-3 bg-background-light dark:bg-slate-800 rounded-xl p-2 px-4 border border-primary/10">
                            <button className="text-primary hover:text-primary/70"><span className="material-symbols-outlined">add_circle</span></button>
                            <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 outline-none placeholder:text-slate-400" placeholder="Ask Musa anything..." type="text" />
                            <div className="flex items-center gap-2">
                                <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">sentiment_satisfied</span></button>
                                <button className="bg-primary text-slate-900 p-2 rounded-lg hover:brightness-105 transition-all">
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pass Section */}
                <section className="flex-1 flex flex-col bg-background-light dark:bg-background-dark p-6 lg:p-12 items-center justify-center relative overflow-hidden">
                    {/* Background Glows */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 size-96 bg-primary rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-24 -left-24 size-96 bg-primary rounded-full blur-[100px]"></div>
                    </div>

                    <div className="w-full max-w-md space-y-8 z-10">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Digital Legal Pass</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Validated Digital Access Credential</p>
                        </div>

                        <div className="pass-gradient rounded-3xl p-8 text-white shadow-2xl glow-effect relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between group cursor-default">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-xl"></div>

                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="size-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white font-bold">shield</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none">U+U Pass</h3>
                                        <p className="text-[10px] opacity-80 uppercase tracking-widest mt-1">Universal Health Auth</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">
                                    ID: 2026-X892-RWA
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold tracking-tighter">Status</p>
                                        <p className="text-sm font-bold flex items-center gap-1">
                                            <span className="size-2 bg-green-400 rounded-full animate-pulse"></span> VALIDATED ACCESS: 15+
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold tracking-tighter">Valid Until</p>
                                        <p className="text-sm font-bold">31 DEC 2026</p>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-2xl shadow-inner">
                                    <div className="size-24 bg-slate-900 flex items-center justify-center rounded-lg" title="Dynamic QR Code">
                                        <span className="material-symbols-outlined text-white text-5xl">qr_code_2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-4 mt-2">
                                <p className="text-[9px] opacity-80 leading-tight">
                                    This document serves as legal proof of age and service eligibility under the Rwandan health framework.
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-medium italic">
                                "Reference: Article 2(o), Law N° 026/2025 (Official Gazette). Possession of this digital pass grants immediate access to youth-friendly SRH services."
                            </p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                                <span className="material-symbols-outlined text-sm">download</span> Save to Device
                            </button>
                            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                                <span className="material-symbols-outlined text-sm">share</span> Share encrypted
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-background-dark border-t border-primary/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="text-slate-900 dark:text-slate-200 uppercase tracking-widest text-[10px] font-bold">Local Support</span>
                        <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">location_on</span> Isange One Stop Center
                        </a>
                        <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">call</span> Helpline: 3029
                        </a>
                        <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">description</span> Legal Aid Rwanda
                        </a>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        <span>© 2026 Musa Health</span>
                        <span className="size-1 bg-primary/30 rounded-full"></span>
                        <span>Privacy First Architecture</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
