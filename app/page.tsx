"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, Lock, Server, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <div className="relative pt-20 pb-32 lg:pt-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black -z-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        Q-Day Countdown: ~4 Years
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                    >
                        Secure Your Code Before <br />
                        <span className="text-cyan-400 text-glow">It's Too Late</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
                    >
                        Identify and fix quantum-vulnerable encryption in your projects instantly.
                        The first AI-powered toolkit for the Post-Quantum era.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-black bg-white rounded-lg hover:bg-cyan-50 transition-all hover:scale-105">
                            Scan Project Free <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white border border-slate-700 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-all">
                            Read the Docs
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<ShieldAlert className="w-8 h-8 text-red-400" />}
                        title="Vulnerability Scanner"
                        desc="Detects RSA-2048, ECC, and other legacy primitives in seconds using our Fine-tuned AI models."
                    />
                    <FeatureCard
                        icon={<Lock className="w-8 h-8 text-cyan-400" />}
                        title="One-Click Migration"
                        desc="Auto-generate drop-in replacements using NIST-standard CRYSTALS-Kyber and Dilithium libraries."
                    />
                    <FeatureCard
                        icon={<Server className="w-8 h-8 text-purple-400" />}
                        title="Zero-Code Deploy"
                        desc="Redeploy your stack to Vercel with hardened quantum-safe TLS headers and wrapper APIs."
                    />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all hover:bg-slate-800/50 group">
            <div className="mb-4 p-3 bg-slate-950 rounded-xl inline-block group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{desc}</p>
        </div>
    )
}
