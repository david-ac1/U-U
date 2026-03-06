"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function StealthCheckout() {
    const { cartCount, addToCart } = useAppContext();
    const [localCount, setLocalCount] = useState(1);
    const [incognito, setIncognito] = useState(true);
    const [silentDrop, setSilentDrop] = useState(false);

    // Map States
    const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
    const [pinLocation, setPinLocation] = useState<{ x: number, y: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleIncrement = () => setLocalCount(prev => prev + 1);
    const handleDecrement = () => setLocalCount(prev => prev > 1 ? prev - 1 : 1);
    const handleCheckout = () => {
        addToCart(localCount);
        // Additional mock checkout logic would go here
        alert(`Order placed securely with ${incognito ? 'Incognito' : 'Standard'} packaging and ${silentDrop ? 'Silent' : 'Standard'} delivery.`);
    };

    const handleMoMoPayment = () => {
        alert("Processing MoMo Payment...\nRedirecting to secure gateway.");
        setTimeout(() => {
            alert("Payment Successful!\nSafe-Drop tracking initiated.");
            // Reset state or redirect in a real app
        }, 1500);
    };

    const basePrice = 15000;
    const delivery = 2500;
    const total = (basePrice * localCount) + delivery;
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">

            {/* Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 bg-background-light/80 backdrop-blur-md px-6 md:px-10 py-4 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xl">health_metrics</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">U+U <span className="text-primary">Health</span></h2>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors">Prevention</Link>
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#">PrEP</a>
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#">Testing</a>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="relative flex items-center justify-center rounded-full size-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="flex items-center justify-center rounded-full size-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-73px)] overflow-hidden">
                {/* Left Column: Cart & Summary */}
                <section className="w-full md:w-[450px] border-r border-primary/10 flex flex-col bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm z-10 overflow-y-auto">
                    <div className="p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black tracking-tight mb-2">Stealth Checkout</h1>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                                Secure • Private • Incognito
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Order</h3>

                            {/* Product Item */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-primary/5">
                                <div className="size-20 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary text-3xl">medical_services</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100">U+U Prevention Pack</h4>
                                        <span className="font-bold text-primary">{(basePrice * localCount).toLocaleString()} RWF</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1 italic">Condoms + PrEP Starter Kit + Discreet Testing Strip</p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button onClick={handleDecrement} className="size-7 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                                            <span className="material-symbols-outlined text-sm">remove</span>
                                        </button>
                                        <span className="text-sm font-bold w-6 text-center text-slate-900 dark:text-slate-100">{localCount}</span>
                                        <button onClick={handleIncrement} className="size-7 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="mt-12 space-y-4">
                            <div className="flex justify-between text-sm text-slate-500 font-medium">
                                <span>Subtotal</span>
                                <span>{(basePrice * localCount).toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500 font-medium">
                                <span>Packaging (Incognito)</span>
                                <span className="text-primary">{incognito ? "FREE" : "-"}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500 font-medium border-b border-primary/10 pb-4">
                                <span>Delivery</span>
                                <span>{delivery.toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-xl font-black text-slate-900 dark:text-slate-100 pt-2">
                                <span>Total</span>
                                <span>{total.toLocaleString()} RWF</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="w-full mt-10 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            Complete Order <span className="material-symbols-outlined">lock</span>
                        </button>
                    </div>
                </section>

                {/* Right Column: Map & Stealth Controls */}
                <section className="flex-1 relative bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-crosshair">
                    {/* Map Layer (Placeholder base with styling) */}
                    <div
                        className="absolute inset-0 z-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-transform duration-1000 ease-out"
                        style={{ transform: `scale(1.5) translate(${(50 - mapCenter.x)}%, ${(50 - mapCenter.y)}%)` }}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            setPinLocation({ x, y });
                        }}
                    >
                        {/* Using a placeholder gradient pattern since we don't have the external map image strictly reliable, but we'll simulate the look */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#00c2cc 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                        <div className="absolute inset-0 map-gradient-overlay hidden md:block"></div>

                        {/* Floating Map Controls */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                            <button className="size-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <button className="size-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMapCenter({ x: 50, y: 50 });
                                    setPinLocation({ x: 50, y: 50 });
                                }}
                                className="size-10 bg-primary text-white shadow-xl rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                            >
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>

                        {/* Delivery Tracker Visual */}
                        <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center pointer-events-none transition-all duration-[3000ms]" style={{ transform: pinLocation ? `translate(${(50 - pinLocation.x) * 2}px, ${(50 - pinLocation.y) * 2}px)` : 'none' }}>
                            <div className="relative">
                                <div className="size-12 bg-primary/20 rounded-full animate-ping absolute -inset-0"></div>
                                <div className="size-12 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white relative">
                                    <span className="material-symbols-outlined">delivery_dining</span>
                                </div>
                            </div>
                            <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-lg border border-primary/20">
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest whitespace-nowrap">Live: 4 mins away</p>
                            </div>
                        </div>

                        {/* Pinned Drop Zone */}
                        {pinLocation && (
                            <div
                                className="absolute flex flex-col items-center pointer-events-none transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                                style={{ top: `${pinLocation.y}%`, left: `${pinLocation.x}%` }}
                            >
                                <div className="size-6 border-4 border-white bg-red-500 rounded-full shadow-xl animate-bounce"></div>
                                <div className="mt-2 bg-slate-900 text-white px-3 py-1 rounded-full shadow-lg">
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Safe-Drop Zone</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Protocol Overlays */}
                    <div className="absolute bottom-10 left-10 right-10 md:left-auto md:w-[480px] space-y-4 z-10">
                        {/* Incognito Protocol Panel */}
                        <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-primary/10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">security</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Incognito Protocol</h3>
                            </div>
                            <div className="space-y-4">
                                {/* Toggle 1 */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-slate-600">inventory_2</span>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Brown Bag Packaging</p>
                                            <p className="text-xs text-slate-500">Unlabeled, neutral packaging only.</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setIncognito(!incognito)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${incognito ? 'bg-primary' : 'bg-slate-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${incognito ? 'translate-x-6' : 'translate-x-1'}`}></span>
                                    </div>
                                </div>

                                {/* Toggle 2 */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-slate-600">do_not_disturb_on</span>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Silent Drop-off</p>
                                            <p className="text-xs text-slate-500">Driver will pin & drop. No phone calls.</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setSilentDrop(!silentDrop)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${silentDrop ? 'bg-primary' : 'bg-slate-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${silentDrop ? 'translate-x-6' : 'translate-x-1'}`}></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Integration Panel */}
                        <div className="bg-[#ffcc00] p-6 rounded-2xl shadow-2xl flex items-center justify-between border border-black/5">
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-white rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
                                    <div className="font-black text-xs text-blue-800">MoMo</div>
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 uppercase tracking-tighter">MTN Mobile Money</h3>
                                    <p className="text-xs font-bold text-slate-800/60">One-tap Encrypted Payment</p>
                                </div>
                            </div>
                            <button
                                onClick={handleMoMoPayment}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-[0.98]"
                            >
                                Pay
                            </button>
                        </div>
                    </div>

                    {/* Search/Pin Overlay */}
                    <div className="absolute top-10 left-10 right-10 md:right-auto md:w-96 z-10">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/95 backdrop-blur-md border border-primary/10 rounded-xl h-14 pl-12 pr-4 shadow-xl focus:ring-2 focus:ring-primary text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all"
                                placeholder="Pin your Safe-Drop Zone..."
                                type="text"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("Kigali Heights Area");
                                        setPinLocation({ x: 55, y: 45 });
                                        setMapCenter({ x: 55, y: 45 });
                                    }}
                                    className="absolute right-2 top-2 bottom-2 bg-primary/10 text-primary px-4 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                                >
                                    Locate
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Stats / Status */}
            <footer className="bg-background-light dark:bg-background-dark border-t border-primary/10 px-10 py-3 flex justify-between items-center z-20">
                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        256 Secure Nodes Active
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="size-2 bg-primary rounded-full"></span>
                        Kigali Hub Online
                    </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Protocol v4.0.2 - 2026 Ready
                </div>
            </footer>
        </div>
    );
}
