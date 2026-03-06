"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Pathway = "crisis" | "wellness" | null;

export type CartItem = {
    id: string;
    name: string;
    price: number;
    description: string;
    requiresClinic: boolean;
    quantity: number;
};

interface AppState {
    isNidaVerified: boolean;
    nidaAge: number | null;
    activePathway: Pathway;
    cart: CartItem[];
}

interface AppContextType extends AppState {
    verifyNida: (age: number) => void;
    setPathway: (pathway: Pathway) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearState: () => void;
}

const initialState: AppState = {
    isNidaVerified: false,
    nidaAge: null,
    activePathway: null,
    cart: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>(initialState);

    const verifyNida = (age: number) => {
        setState((prev) => ({ ...prev, isNidaVerified: true, nidaAge: age }));
    };

    const setPathway = (pathway: Pathway) => {
        setState((prev) => ({ ...prev, activePathway: pathway }));
    };

    const addToCart = (item: CartItem) => {
        setState((prev) => {
            const existing = prev.cart.find((i) => i.id === item.id);
            if (existing) {
                return {
                    ...prev,
                    cart: prev.cart.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            }
            return { ...prev, cart: [...prev.cart, item] };
        });
    };

    const removeFromCart = (itemId: string) => {
        setState((prev) => ({
            ...prev,
            cart: prev.cart.filter((i) => i.id !== itemId),
        }));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        setState((prev) => ({
            ...prev,
            cart: prev.cart.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        }));
    };

    const clearState = () => {
        setState(initialState);
    };

    return (
        <AppContext.Provider value={{ ...state, verifyNida, setPathway, addToCart, removeFromCart, updateQuantity, clearState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
