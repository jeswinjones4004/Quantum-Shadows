"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#020617] relative overflow-hidden">
            {/* Background decorations - similar to landing page */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/10 blur-[100px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Invest in <span className="text-cyan-400">Future-Proof</span> Security
                    </motion.h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Choose a plan that fits your migration timeline. From individual developers to nation-scale infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Starter Plan */}
                    <PricingCard
                        title="Developer"
                        price="$0"
                        period="/mo"
                        description="Perfect for open-source maintainers and individuals."
                        features={[
                            "Unlimited Public Repo Scans",
                            "Basic Vulnerability Detection",
                            "Community Support",
                            "Access to Migration Docs"
                        ]}
                        icon={<Zap className="w-6 h-6 text-white" />}
                        buttonText="Start Free"
                        link="/dashboard"
                        delay={0.1}
                    />

                    {/* Pro Plan */}
                    <PricingCard
                        title="Business"
                        price="$499"
                        period="/mo"
                        description="Automated protection for startups and growing teams."
                        features={[
                            "Private Repository Support",
                            "CI/CD Pipeline Integration",
                            "1-Click Auto-Migration (Beta)",
                            "Priority Email Support",
                            "Compliance Reports (PDF)"
                        ]}
                        icon={<Shield className="w-6 h-6 text-white" />}
                        buttonText="Start Trial"
                        featured={true}
                        link="/dashboard"
                        delay={0.2}
                    />

                    {/* Enterprise Plan */}
                    <PricingCard
                        title="Enterprise"
                        price="Custom"
                        period=""
                        description="For governments and critical infrastructure."
                        features={[
                            "On-Premise / Air-Gapped Deploy",
                            "Dedicated Cryptographer Support",
                            "Custom PQC Implementation",
                            "SLA guarantees",
                            "24/7 Response Team"
                        ]}
                        icon={<Building className="w-6 h-6 text-white" />}
                        buttonText="Contact Sales"
                        link="mailto:sales@quantumshadows.io"
                        delay={0.3}
                    />
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, period, description, features, icon, buttonText, featured = false, delay, link = "#" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`relative p-8 rounded-2xl border flex flex-col ${featured ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-900/20' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'}`}
        >
            {featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                </div>
            )}

            <div className={`p-3 rounded-xl w-fit mb-6 ${featured ? 'bg-cyan-500' : 'bg-slate-800'}`}>
                {icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-baseline mb-4">
                <span className="text-4xl font-extrabold text-white">{price}</span>
                <span className="text-slate-500 ml-2">{period}</span>
            </div>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">{description}</p>

            <ul className="space-y-4 mb-8 flex-grow">
                {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 ${featured ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link href={link} className={`w-full py-3 rounded-lg font-bold transition-all text-center block ${featured ? 'bg-white text-black hover:bg-cyan-50' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                {buttonText}
            </Link>
        </motion.div>
    )
}
