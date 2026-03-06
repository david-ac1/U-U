"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NidaModal from "@/components/NidaModal";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { setPathway, isNidaVerified } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPathway, setPendingPathway] = useState<"crisis" | "wellness" | null>(null);

  const handleStartPathway = (pathway: "crisis" | "wellness") => {
    setPathway(pathway);
    if (!isNidaVerified) {
      setPendingPathway(pathway);
      setIsModalOpen(true);
    } else {
      router.push("/counselor");
    }
  };

  const onNidaSuccess = () => {
    setIsModalOpen(false);
    if (pendingPathway) {
      router.push("/counselor");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 lg:px-20 py-10 gap-12">
        {/* Hero Header */}
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black leading-tight tracking-tight lg:text-6xl">
            Health tech <span className="text-primary">refined.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Your destination for clinical-grade care, delivered with modern discretion. Choose your path to wellness.
          </p>
        </div>

        {/* Dual-Path Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Crisis Path Card */}
          <div className="group relative overflow-hidden rounded-lg bg-coral-accent p-8 lg:p-12 text-white shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="material-symbols-outlined !text-sm">priority_high</span> Urgent Care
                </span>
                <h3 className="mt-6 text-4xl font-extrabold lg:text-5xl">I need Emergency Help</h3>
                <p className="mt-4 text-lg font-medium text-white/80">PEP, Emergency Contraception, Crisis Support</p>
              </div>

              {/* Countdown Timer */}
              <div className="glass-card rounded-xl p-6">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white/60">Time remaining for PEP efficacy</p>
                <div className="flex gap-4">
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-black">71</div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Hours</div>
                  </div>
                  <div className="text-4xl font-light opacity-30">:</div>
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-black">48</div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Minutes</div>
                  </div>
                  <div className="text-4xl font-light opacity-30">:</div>
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-black">22</div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Seconds</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartPathway("crisis")}
                className="w-full bg-white text-coral-accent py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-slate-50 transition-colors"
              >
                Start Crisis Path
              </button>
            </div>
          </div>

          {/* Care Path Card */}
          <div className="group relative overflow-hidden rounded-lg bg-primary p-8 lg:p-12 text-white shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-black/5 blur-3xl"></div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="material-symbols-outlined !text-sm">favorite</span> Wellness
                </span>
                <h3 className="mt-6 text-4xl font-extrabold lg:text-5xl">I want to stay Healthy</h3>
                <p className="mt-4 text-lg font-medium text-white/90">Discreet Delivery of Condoms, PrEP, HIV Tests, Pads</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-4">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <span className="text-sm font-semibold">Same-day delivery available in most cities</span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-4">
                  <span className="material-symbols-outlined">shield_person</span>
                  <span className="text-sm font-semibold">100% Confidential Clinical Support</span>
                </div>
              </div>

              <button
                onClick={() => handleStartPathway("wellness")}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-colors"
              >
                Explore Care Path
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Trending Knowledge Bar */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-2xl font-bold">Trending Knowledge</h4>
            <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
              View all <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-6 p-6 rounded-lg bg-white dark:bg-slate-800/50 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="size-20 flex-shrink-0 rounded-lg bg-primary/10 overflow-hidden" title="Illustration of medical concept U=U">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary !text-3xl">science</span>
                </div>
              </div>
              <div>
                <h5 className="text-xl font-bold mb-1">U=U: What it means for you</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Undetectable equals Untransmittable. Learn the science behind the modern standard of care.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 rounded-lg bg-white dark:bg-slate-800/50 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="size-20 flex-shrink-0 rounded-lg bg-coral-accent/10 overflow-hidden" title="Legal scales of justice illustration">
                <div className="w-full h-full bg-gradient-to-br from-coral-accent/20 to-coral-accent/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-coral-accent !text-3xl">gavel</span>
                </div>
              </div>
              <div>
                <h5 className="text-xl font-bold mb-1">The 2025 Health Law: Know your Rights</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Everything you need to know about new privacy protections and access to preventative care.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <NidaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onNidaSuccess}
      />
    </div>
  );
}
