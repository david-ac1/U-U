"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function ProviderDashboard() {
    const { isNidaVerified, nidaAge } = useAppContext();
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<"idle" | "scanning" | "success" | "invalid">("idle");
    const [scannedData, setScannedData] = useState<{ age: number | null, status: string, id: string } | null>(null);

    // Mock the camera scanning effect
    const handleScanTrigger = () => {
        setIsScanning(true);
        setScanResult("scanning");

        setTimeout(() => {
            setIsScanning(false);
            if (isNidaVerified && nidaAge) {
                setScanResult("success");
                setScannedData({
                    age: nidaAge,
                    status: "VALIDATED ACCESS",
                    id: "2026-X892-RWA"
                });
            } else {
                setScanResult("invalid");
                setScannedData(null);
            }
        }, 2500);
    };

    const resetScanner = () => {
        setScanResult("idle");
        setScannedData(null);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-900 text-slate-100 font-display transition-colors duration-300 selection:bg-primary/30">
            {/* Minimalist Provider Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 bg-slate-900/80 backdrop-blur-md px-6 md:px-10 py-4 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </div>
                    <h2 className="text-white text-xl font-bold tracking-tight">U+U <span className="text-blue-500 text-sm uppercase tracking-widest ml-1 opacity-80">Provider Hub</span></h2>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                        <span className="size-2 bg-green-400 rounded-full animate-pulse"></span> Terminal 04 Online
                    </div>
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-semibold ml-4">Exit</Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Ambient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-md space-y-8 z-10">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-black tracking-tight text-white">Digital Pass Scanner</h1>
                        <p className="text-slate-400 text-sm">Verify Law N° 026/2025 eligibility instantly. No PII stored.</p>
                    </div>

                    {/* Scanner Interface Viewbox */}
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-center group">

                        {/* Corner Reticle Brackets */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20 group-hover:border-blue-500/50 transition-colors rounded-tl-xl"></div>
                        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/20 group-hover:border-blue-500/50 transition-colors rounded-tr-xl"></div>
                        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/20 group-hover:border-blue-500/50 transition-colors rounded-bl-xl"></div>
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/20 group-hover:border-blue-500/50 transition-colors rounded-br-xl"></div>

                        {scanResult === "idle" && (
                            <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="size-24 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-blue-500">qr_code_scanner</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Ready to Scan</h3>
                                    <p className="text-slate-400 text-xs mt-1 px-4">Aim camera at the Patient's Digital Legal Pass QR code.</p>
                                </div>
                                <button
                                    onClick={handleScanTrigger}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                >
                                    Simulate Scan
                                </button>
                            </div>
                        )}

                        {scanResult === "scanning" && (
                            <div className="flex flex-col items-center w-full relative h-full justify-center">
                                {/* Simulated QR grid */}
                                <div className="size-48 bg-slate-900/50 rounded-lg border border-blue-500/30 overflow-hidden relative">
                                    <div className="absolute top-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] animate-[scan_1.5s_ease-in-out_infinite_alternate]"></div>
                                    <span className="material-symbols-outlined text-blue-500/20 text-[10rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">qr_code_2</span>
                                </div>
                                <p className="text-blue-400 font-bold tracking-widest uppercase text-xs mt-8 animate-pulse">Decrypting ZKP Token...</p>
                            </div>
                        )}

                        {scanResult === "success" && scannedData && (
                            <div className="flex flex-col items-center w-full h-full justify-between py-4 animate-in slide-in-from-bottom-8 duration-500">
                                <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center ring-4 ring-green-500/20">
                                    <span className="material-symbols-outlined text-4xl text-green-400">verified</span>
                                </div>

                                <div className="w-full bg-slate-900/80 rounded-2xl p-6 border border-green-500/30 text-center space-y-2 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                                    <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-4">Patient Authenticated</p>

                                    <h2 className="text-4xl font-black text-white">{scannedData.age}+ <span className="text-lg text-slate-400 font-medium">Years Old</span></h2>
                                    <p className="text-sm font-bold text-slate-300 tracking-tight">{scannedData.status}</p>
                                    <div className="text-[10px] text-slate-500 font-mono mt-4 opacity-50">{scannedData.id} • HASH_OK</div>
                                </div>

                                <button
                                    onClick={resetScanner}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all text-sm mt-4 border border-white/10"
                                >
                                    Log Encrypted Fulfillment & Reset
                                </button>
                            </div>
                        )}

                        {scanResult === "invalid" && (
                            <div className="flex flex-col items-center w-full text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                <div className="size-24 rounded-full bg-red-500/20 flex items-center justify-center ring-4 ring-red-500/20">
                                    <span className="material-symbols-outlined text-5xl text-red-500">error</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl">Invalid or Unregistered</h3>
                                    <p className="text-slate-400 text-sm mt-2 px-4 leading-relaxed">
                                        This pass is empty or the patient has not completed NIDA Auth. They must verify age on their device first.
                                    </p>
                                </div>
                                <button
                                    onClick={resetScanner}
                                    className="bg-transparent border-2 border-red-500/50 hover:bg-red-500/10 text-red-400 px-8 py-3 rounded-xl font-bold transition-all w-full mt-4"
                                >
                                    Reset Scanner
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
                        <span className="material-symbols-outlined text-blue-400 shrink-0">info</span>
                        <div>
                            <p className="text-xs text-blue-200 font-medium leading-relaxed">
                                Under Law N° 026/2025, verified patients aged 15 and above are legally permitted to access youth-friendly SRH services. Do not request secondary physical ID if the ZKP token clears.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
