"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";

interface NidaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function NidaModal({ isOpen, onClose, onSuccess }: NidaModalProps) {
    const [nidaNumber, setNidaNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { verifyNida } = useAppContext();

    if (!isOpen) return null;

    const handleVerify = () => {
        setError("");

        // Simple validation mock
        if (nidaNumber.length !== 16) {
            setError("NIDA number must be 16 digits.");
            return;
        }

        setIsLoading(true);

        // Mock network request
        setTimeout(() => {
            setIsLoading(false);

            // Simulate age based on last digit (just a mock logic)
            const lastDigit = parseInt(nidaNumber.slice(-1));

            if (lastDigit < 2) {
                setError("Age verification failed. You must be 15 or older under Law N° 026/2025.");
                return;
            }

            // Verification Successful
            let mockAge = 15 + lastDigit; // 15 to 24 age logic for demo
            verifyNida(mockAge);
            onSuccess();
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-primary/20">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <span className="material-symbols-outlined">fingerprint</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Verify Age</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Secure connection to Mock-NIDA registry to verify your age under the 2025 Privacy Health Framework.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                            National ID Number
                        </label>
                        <input
                            type="text"
                            placeholder="1 1999 8 0000 000 00"
                            maxLength={16}
                            value={nidaNumber}
                            onChange={(e) => setNidaNumber(e.target.value.replace(/\D/g, ""))}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-lg font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>

                    {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

                    <button
                        onClick={handleVerify}
                        disabled={isLoading || nidaNumber.length === 0}
                        className="w-full rounded-xl bg-primary py-3.5 font-bold text-slate-900 shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                Verifying...
                            </>
                        ) : (
                            "Secure Verify"
                        )}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 items-center flex justify-center gap-1">
                        <span className="material-symbols-outlined !text-[12px]">lock</span> Zero Knowledge Proof. Your ID is not stored.
                    </p>
                </div>
            </div>
        </div>
    );
}
