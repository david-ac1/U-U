import React from "react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-primary/5 bg-slate-50 dark:bg-slate-900/30 px-6 lg:px-20 py-10">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2 grayscale opacity-50">
                    <span className="material-symbols-outlined">all_inclusive</span>
                    <span className="font-bold tracking-tighter">U+U HEALTH</span>
                </div>
                <div className="flex gap-8 text-sm text-slate-500 font-medium">
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <a className="hover:text-primary transition-colors" href="#">Accessibility</a>
                </div>
                <p className="text-xs text-slate-400">© 2026 U+U Health-Tech. Clinical-Cool since 2025.</p>
            </div>
        </footer>
    );
}
