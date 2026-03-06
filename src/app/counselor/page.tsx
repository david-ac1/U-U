"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

type ChatMessage = {
    id: string;
    role: "user" | "musa";
    text: string;
    timestamp: string;
};

export default function MusaCounselor() {
    const { isNidaVerified, nidaAge, activePathway, clearState } = useAppContext();
    const router = useRouter();

    const [rightPanel, setRightPanel] = useState<"pass" | "map">("pass");
    const [selectedClinic, setSelectedClinic] = useState<string | null>(null);

    const clinics = [
        { id: "isange", name: "Isange One Stop Center", area: "Kimihurura", service: "24/7 Emergency & PEP", top: "45%", left: "60%" },
        { id: "kigali", name: "Kigali YF Clinic", area: "Nyamirambo", service: "PrEP & STI Testing", top: "70%", left: "30%" },
        { id: "remera", name: "Remera Health Center", area: "Remera", service: "General Wellness", top: "35%", left: "80%" },
    ];

    const initialMessage = activePathway === "crisis"
        ? "I see you are on the Emergency Path. Under Rwanda Law N° 026/2025, you have the legal right to immediate, confidential emergency care (PEP & Contraception). Please describe your situation so I can help."
        : "I see you are exploring Wellness block. Under Rwanda Law N° 026/2025, you have the legal right to these services. How can I guide you today?";

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            role: "musa",
            text: initialMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            text: input.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await response.json();

            if (response.ok) {
                const musaMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "musa",
                    text: data.text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages((prev) => [...prev, musaMessage]);
            } else {
                throw new Error(data.error || "Failed to fetch");
            }
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "musa",
                text: "I am having trouble connecting to my knowledge base right now. Please try again in a moment.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

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
                        <Link href="/shop" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Shop</Link>
                        <button onClick={() => setRightPanel("pass")} className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${rightPanel === "pass" ? "text-primary border-primary" : "text-slate-600 dark:text-slate-400 border-transparent hover:text-primary"}`}>Legal Pass</button>
                        <button onClick={() => setRightPanel("map")} className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${rightPanel === "map" ? "text-primary border-primary" : "text-slate-600 dark:text-slate-400 border-transparent hover:text-primary"}`}>Clinics Map</button>
                        <Link href="/profile" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Profile</Link>
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
                <section className="flex-1 flex flex-col bg-white dark:bg-slate-900/50 border-r border-primary/10 relative">
                    <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-white dark:bg-slate-900/50 z-10 w-full">
                        <div>
                            <h1 className="text-xl font-bold">Musa Counselor</h1>
                            <p className="text-xs text-primary font-medium uppercase tracking-wider flex items-center gap-2">
                                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> Active Chat Session
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors"><span className="material-symbols-outlined text-slate-500">more_vert</span></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {messages.map((msg) => (
                            msg.role === "musa" ? (
                                <div key={msg.id} className="flex items-end gap-3 max-w-[85%]">
                                    <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-semibold text-primary ml-1 uppercase">Musa (Your U+U Guide)</span>
                                        <div className="bg-background-light dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-primary/5 shadow-sm">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={msg.id} className="flex flex-col gap-2 items-end ml-auto max-w-[85%]">
                                    <div className="bg-primary text-slate-900 p-4 rounded-2xl rounded-br-none shadow-md">
                                        <p className="text-sm font-medium">{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mr-1">Read {msg.timestamp}</span>
                                </div>
                            )
                        ))}

                        {isLoading && (
                            <div className="flex items-end gap-3 max-w-[85%]">
                                <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 animate-pulse">
                                    <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                                </div>
                                <div className="bg-background-light dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-primary/5 shadow-sm flex gap-1">
                                    <div className="size-2 bg-primary/50 rounded-full animate-bounce"></div>
                                    <div className="size-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="size-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white dark:bg-background-dark border-t border-primary/10">
                        <div className="relative flex items-center gap-3 bg-background-light dark:bg-slate-800 rounded-xl p-2 px-4 border border-primary/10 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <button className="text-primary hover:text-primary/70"><span className="material-symbols-outlined">add_circle</span></button>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 outline-none placeholder:text-slate-400"
                                placeholder="Ask Musa anything..."
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                            <div className="flex items-center gap-2">
                                <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">sentiment_satisfied</span></button>
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-primary text-slate-900 p-2 rounded-lg hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Panel (Toggleable between Pass and Map) */}
                <section className="flex-1 flex flex-col bg-background-light dark:bg-background-dark p-6 lg:p-12 items-center justify-center relative overflow-hidden">
                    {rightPanel === "pass" ? (
                        <>
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

                                <div className="pass-gradient rounded-3xl p-8 text-white shadow-2xl glow-effect relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between group cursor-default transition-all hover:scale-[1.02]">
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
                                                    {isNidaVerified ? (
                                                        <>
                                                            <span className="size-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]"></span> VALIDATED ACCESS: {nidaAge}+
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="size-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,1)]"></span> UNAUTHENTICATED
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] opacity-70 uppercase font-bold tracking-tighter">Valid Until</p>
                                                <p className="text-sm font-bold max-w-[80px]">31 DEC 2026</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl shadow-inner mt-4">
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

                                <div className="flex justify-center gap-4 mt-8 flex-wrap">
                                    <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline transition-all">
                                        <span className="material-symbols-outlined text-sm">download</span> Save to Device
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline transition-all">
                                        <span className="material-symbols-outlined text-sm">share</span> Share encrypted
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm("DANGER: This will purge all local session data, chat history, and verification status. Proceed?")) {
                                                clearState();
                                                router.push("/");
                                            }
                                        }}
                                        className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-full transition-all border border-red-500/20"
                                    >
                                        <span className="material-symbols-outlined text-sm">bomb</span> Self-Destruct
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full max-w-md h-full flex flex-col items-center justify-center space-y-6 z-10 animate-in fade-in duration-500 relative">
                            <div className="text-center space-y-2 mb-4 w-full">
                                <h2 className="text-2xl font-bold tracking-tight">Health Facilities Map</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Discreet, youth-friendly clinics in Kigali</p>
                            </div>

                            {/* Interactive Map UI */}
                            <div className="w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-[2rem] relative overflow-hidden shadow-xl border border-primary/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 to-slate-200 dark:from-slate-700 dark:to-slate-900">
                                {/* Map Grid Lines */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
                                <div className="absolute inset-0 dark:hidden" style={{ backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
                                <div className="hidden dark:block absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>

                                {/* Map Pins */}
                                {clinics.map(clinic => (
                                    <button
                                        key={clinic.id}
                                        onClick={() => setSelectedClinic(clinic.id)}
                                        className={`absolute flex flex-col items-center group transition-all duration-300 ${selectedClinic === clinic.id ? 'scale-110 z-20' : 'hover:scale-105 z-10'}`}
                                        style={{ top: clinic.top, left: clinic.left, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className={`size-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${selectedClinic === clinic.id ? 'bg-primary text-white ring-4 ring-primary/30 border-2 border-white' : 'bg-white text-primary border-2 border-primary/20 group-hover:bg-primary/10'}`}>
                                            <span className="material-symbols-outlined text-[20px]">{clinic.id === 'isange' ? 'local_hospital' : clinic.id === 'kigali' ? 'healing' : 'spa'}</span>
                                        </div>
                                        <div className={`mt-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-md transition-all duration-300 whitespace-nowrap ${selectedClinic === clinic.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 opacity-0 group-hover:opacity-100'}`}>
                                            {clinic.name}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Info Card */}
                            {selectedClinic ? (
                                <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in slide-in-from-bottom-8 duration-300">
                                    <div>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1"><span className="size-1.5 bg-primary rounded-full"></span> {clinics.find(c => c.id === selectedClinic)?.service}</p>
                                        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mt-1">{clinics.find(c => c.id === selectedClinic)?.name}</h3>
                                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span> {clinics.find(c => c.id === selectedClinic)?.area}
                                        </p>
                                    </div>
                                    <button className="bg-primary/10 text-primary w-full sm:w-auto hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
                                        Route
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center animate-in fade-in">
                                    <p className="text-sm font-medium text-slate-500">Select a clinic on the map to view details.</p>
                                </div>
                            )}
                        </div>
                    )}
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
