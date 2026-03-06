"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MARKETPLACE_ITEMS = [
    {
        id: "item_condoms_01",
        name: "U+U Prevention Pack",
        price: 15000,
        description: "Premium Condoms + Lubricant. Arrives in discreet packaging.",
        requiresClinic: false,
        icon: "inventory_2",
        category: "Prevention"
    },
    {
        id: "item_hiv_test",
        name: "OraQuick In-Home HIV Test",
        price: 8500,
        description: "Fast, private, oral fluid test. FDA-approved.",
        requiresClinic: false,
        icon: "science",
        category: "Testing"
    },
    {
        id: "item_hygiene_kit",
        name: "Monthly Menstrual Kit",
        price: 12000,
        description: "Pads, wipes, and pain relief. Stealth delivered.",
        requiresClinic: false,
        icon: "water_drop",
        category: "Wellness"
    },
    {
        id: "item_prep_30",
        name: "PrEP 30-Day Refill",
        price: 0,
        description: "Daily HIV prevention pill. Requires clinic visit.",
        requiresClinic: true,
        icon: "medication",
        category: "Prescription"
    },
    {
        id: "item_pep_emergency",
        name: "PEP Emergency Regimen",
        price: 0,
        description: "Post-exposure prophylaxis. MUST start within 72 hours. Clinic visit mandatory.",
        requiresClinic: true,
        icon: "emergency",
        category: "Prescription"
    }
];

export default function ShopPlatform() {
    const { cart, addToCart } = useAppContext();
    const router = useRouter();

    const [addedItemId, setAddedItemId] = useState<string | null>(null);

    const handleAddToCart = (item: typeof MARKETPLACE_ITEMS[0]) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            requiresClinic: item.requiresClinic,
            quantity: 1
        });

        // Show quick success animation
        setAddedItemId(item.id);
        setTimeout(() => setAddedItemId(null), 1000);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-20 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">U+U Marketplace</h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        Discreet, stigma-free access to your health essentials. Choose from home delivery for standard items, or book priority pickups for clinical prescriptions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MARKETPLACE_ITEMS.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-primary/10 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all flex flex-col group">

                            <div className="flex justify-between items-start mb-6">
                                <div className={`size-14 rounded-2xl flex items-center justify-center ${item.requiresClinic ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                                    <p className="text-xl font-black">{item.price === 0 ? 'FREE' : `${item.price.toLocaleString()} RWF`}</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>

                                {item.requiresClinic && (
                                    <div className="mt-4 flex items-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-xs font-bold w-fit">
                                        <span className="material-symbols-outlined text-[14px]">local_hospital</span> Clinic Pickup Required
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleAddToCart(item)}
                                className={`w-full mt-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${addedItemId === item.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                                    }`}
                            >
                                {addedItemId === item.id ? (
                                    <><span className="material-symbols-outlined">check_circle</span> Added</>
                                ) : (
                                    <><span className="material-symbols-outlined">add_shopping_cart</span> Add to Cart</>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {cart.length > 0 && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10">
                        <Link href="/checkout" className="bg-slate-900 border-2 border-primary/20 shadow-2xl shadow-primary/30 text-white px-8 py-4 rounded-full font-black flex items-center gap-4 hover:scale-105 active:scale-95 transition-all">
                            <span>Proceed to Checkout</span>
                            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-slate-900">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </div>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
