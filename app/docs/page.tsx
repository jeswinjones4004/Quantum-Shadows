"use client";
import React, { useState } from 'react';
import { FileText, ChevronRight, Book, Key, Shield, Code, Server } from 'lucide-react';

// Mock list of documentation pages based on the project docs
const DOCS_NAV = [
    { title: 'Introduction', id: 'intro', icon: <Book className="w-4 h-4" /> },
    { title: 'The Q-Day Threat', id: 'threat', icon: <Shield className="w-4 h-4" /> },
    { title: 'Installation', id: 'install', icon: <Server className="w-4 h-4" /> },
    { title: 'Core Concepts', id: 'concepts', icon: <Key className="w-4 h-4" /> },
    { title: 'API Reference', id: 'api', icon: <Code className="w-4 h-4" /> },
];

const CONTENT = {
    intro: {
        title: "Introduction",
        content: "Quantum Shadows is an open-source initiative designed to secure the post-quantum world. As we approach 'Q-Day', the point where quantum computers can break traditional RSA/ECC encryption, the need for a robust migration toolkit becomes critical. This platform provides developers with an AI-driven scanner and automated migration tools to adopt NIST-approved Post-Quantum Cryptography (PQC)."
    },
    threat: {
        title: "The Post-Quantum Threat",
        content: "By 2030, experts predict that quantum computers will be sufficiently powerful to run Shor's Algorithm effectively. This jeopardizes the foundation of global digital security. 'Harvest Now, Decrypt Later' attacks are already in progress, where encrypted data is intercepted today to be decrypted in the future. Immediate action is required to secure long-term secrets."
    },
    install: {
        title: "Installation & Setup",
        content: "To get started with Quantum Shadows, simply clone the repository and install the dependencies:\n\n`git clone https://github.com/quantum-shadows/core`\n`npm install`\n\nRun the local scanner using:\n`npm run scan:local`"
    },
    concepts: {
        title: "Core Concepts",
        content: "Our toolkit leverages Hybrid Cryptography, combining classical algorithms with quantum-resistant candidates like CRYSTALS-Kyber (for Key Encapsulation) and CRYSTALS-Dilithium (for Digital Signatures). This detailed approach ensures that you remain compliant with current standards while future-proofing your application."
    },
    api: {
        title: "API Reference",
        content: "The Scanner API accepts a GitHub repository URL and returns a JSON report containing a 'Risk Score' and a list of 'Vulnerabilities'.\n\nEndpoint: `POST /api/scan`\nBody: `{ repoUrl: string }`"
    }
};

export default function Docs() {
    const [activeTab, setActiveTab] = useState('intro');

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="lg:w-64 border-r border-slate-800 bg-slate-950/50 p-6 lg:h-screen lg:sticky lg:top-16">
                    <h2 className="font-bold text-white mb-6 flex items-center gap-2">
                        <FileText className="text-cyan-500" /> Documentation
                    </h2>
                    <nav className="space-y-1">
                        {DOCS_NAV.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                            >
                                {item.icon}
                                {item.title}
                                {activeTab === item.id && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 lg:p-12">
                    <div className="max-w-3xl">
                        <div className="mb-8">
                            <span className="text-cyan-500 text-sm font-mono uppercase tracking-wider">Docs / {DOCS_NAV.find(n => n.id === activeTab)?.title}</span>
                            <h1 className="text-4xl font-bold text-white mt-2 mb-6">{CONTENT[activeTab as keyof typeof CONTENT].title}</h1>
                            <div className="prose prose-invert prose-slate max-w-none">
                                <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-wrap">
                                    {CONTENT[activeTab as keyof typeof CONTENT].content}
                                </p>
                            </div>
                        </div>

                        {/* Interactive Element Mockup */}
                        {activeTab === 'intro' && (
                            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 mt-8">
                                <h3 className="font-bold text-white mb-2">Quick Start</h3>
                                <div className="bg-black rounded p-3 font-mono text-sm text-green-400">
                                    npx quantum-shadows init
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
