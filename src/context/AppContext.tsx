"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Pathway = "crisis" | "wellness" | null;

interface AppState {
    isNidaVerified: boolean;
    nidaAge: number | null;
    activePathway: Pathway;
    cartCount: number;
}

interface AppContextType extends AppState {
    verifyNida: (age: number) => void;
    setPathway: (pathway: Pathway) => void;
    addToCart: (count?: number) => void;
    clearState: () => void;
}

const initialState: AppState = {
    isNidaVerified: false,
    nidaAge: null,
    activePathway: null,
    cartCount: 0,
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

    const addToCart = (count: number = 1) => {
        setState((prev) => ({ ...prev, cartCount: prev.cartCount + count }));
    };

    const clearState = () => {
        setState(initialState);
    };

    return (
        <AppContext.Provider value={{ ...state, verifyNida, setPathway, addToCart, clearState }}>
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
