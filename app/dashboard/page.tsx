"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Code, Terminal } from 'lucide-react';

export default function Dashboard() {
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(0); // 0: Idle, 1: Scanning, 2: Results
    const [repoUrl, setRepoUrl] = useState('');
    const [repoData, setRepoData] = useState<any>(null);
    const [riskScore, setRiskScore] = useState(35);
    const [vulns, setVulns] = useState([
        { id: 1, name: 'RSA Key Pair Generation', file: '/src/auth/token.ts:42', type: 'Algorithm: RSA-2048', fixed: false, risk: 40 },
        { id: 2, name: 'Legacy TLS Configuration', file: 'nginx.conf', type: 'Protocol: TLS 1.2', fixed: false, risk: 25 }
    ]);
    const [targetType, setTargetType] = useState<'github' | 'web' | 'ip' | 'api'>('github');

    const determineTargetType = (input: string) => {
        if (input.includes('github.com')) return 'github';
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(input)) return 'ip';
        if (input.startsWith('http')) return 'web';
        return 'api';
    };

    const extractRepoPath = (url: string) => {
        try {
            const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
            return match ? match[1] : null;
        } catch (e) {
            return null;
        }
    };

    const startScan = async () => {
        if (!repoUrl) return;

        const type = determineTargetType(repoUrl);
        setTargetType(type);
        setScanning(true);
        setStep(1);
        setProgress(0);

        if (type === 'github') {
            const repoPath = extractRepoPath(repoUrl);
            if (repoPath) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${repoPath}`);
                    if (res.ok) {
                        const data = await res.json();
                        setRepoData(data);
                    } else {
                        setRepoData({ full_name: repoPath, description: 'Repository not found or private.' });
                    }
                } catch (e) {
                    setRepoData({ full_name: repoPath, description: 'Could not fetch repository details.' });
                }
            } else {
                setRepoData({ full_name: repoUrl, description: 'GitHub Repository' });
            }
        } else {
            // Generic Target
            setRepoData({
                full_name: repoUrl,
                description: type === 'ip' ? 'Network Endpoint' : 'Web Application / API'
            });
        }
    };

    useEffect(() => {
        if (scanning && progress < 100) {
            const timer = setTimeout(() => {
                setProgress(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timer);
        } else if (progress >= 100) {
            setScanning(false);
            setStep(2);
        }
    }, [scanning, progress]);

    const fixVuln = (id: number) => {
        setVulns(prev => prev.map(v => v.id === id ? { ...v, fixed: true } : v));
        setRiskScore(prev => Math.min(100, prev + 30)); // Simple scoring
    };

    const autoMigrate = () => {
        const remainingRisk = vulns.filter(v => !v.fixed).length * 30; // Approximation
        setVulns(prev => prev.map(v => ({ ...v, fixed: true })));

        // Animate score to 100
        let current = riskScore;
        const interval = setInterval(() => {
            current += 5;
            if (current >= 100) {
                current = 100;
                setRiskScore(100);
                clearInterval(interval);
            } else {
                setRiskScore(current);
            }
        }, 50);
    };

    const allFixed = vulns.every(v => v.fixed);
    const scoreColor = riskScore > 80 ? 'text-green-500' : riskScore > 50 ? 'text-yellow-500' : 'text-red-500';
    const strokeColor = riskScore > 80 ? '#22c55e' : riskScore > 50 ? '#eab308' : '#ef4444';

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Project Dashboard</h1>
                        {repoData ? (
                            <div>
                                <p className="text-slate-400">target: <span className="text-cyan-400 font-mono">{repoData.full_name}</span></p>
                                <p className="text-xs text-slate-500 mt-1 max-w-xl truncate">{repoData.description}</p>
                            </div>
                        ) : (
                            <p className="text-slate-400">target: <span className="text-cyan-400 font-mono">{repoUrl || 'Ready to analyze'}</span></p>
                        )}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div className={`w-3 h-3 rounded-full ${!allFixed ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-sm font-medium">{!allFixed ? 'Vulnerable' : 'System Ready'}</span>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Scanner */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                            {step === 0 && (
                                <div className="text-center py-12">
                                    <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold mb-2">Ready to Assess Resilience?</h2>
                                    <p className="text-slate-400 mb-8 max-w-md mx-auto">Our scanner will analyze your cryptographic primitives against NIST PQC standards.</p>

                                    <div className="max-w-md mx-auto mb-6">
                                        <input
                                            type="text"
                                            placeholder="Enter GitHub URL, Website, or IP Address"
                                            value={repoUrl}
                                            onChange={(e) => setRepoUrl(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                    </div>

                                    <button
                                        onClick={startScan}
                                        disabled={!repoUrl}
                                        className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
                                    >
                                        Start Vulnerability Scan
                                    </button>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="py-12">
                                    <div className="flex justify-between mb-2 text-sm font-medium text-cyan-400">
                                        <span>Scanning {repoData?.full_name || repoUrl}...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
                                        <motion.div
                                            className="bg-cyan-500 h-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="font-mono text-xs text-slate-500 space-y-1">
                                        {targetType === 'github' ? (
                                            <>
                                                <p>&gt; Cloning repository...</p>
                                                {repoData && <p className="text-cyan-500">&gt; Remote: {repoData.description ? repoData.description.substring(0, 40) + '...' : 'GitHub Repository'}</p>}
                                                <p>&gt; Analying package.json...</p>
                                                {progress > 20 && <p>&gt; Found dependency: 'crypto' (Node.js stdlib)</p>}
                                                {progress > 40 && <p>&gt; Found 'rsa-keygen' in /auth/keys.ts</p>}
                                            </>
                                        ) : (
                                            <>
                                                <p>&gt; Initiating handshake with target...</p>
                                                {progress > 20 && <p>&gt; Checking SSL/TLS Certificate chain...</p>}
                                                {progress > 40 && <p className="text-yellow-400">&gt; Warning: TLS 1.2 usage detected</p>}
                                                {progress > 60 && <p>&gt; Analyzing Key Exchange Mechanism...</p>}
                                            </>
                                        )}
                                        {progress > 80 && <p className="text-red-400">&gt; ALERT: Non-Quantum Safe Primitives Detected</p>}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    {allFixed ? (
                                        <div className="flex items-center gap-3 mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <CheckCircle className="text-green-500 w-6 h-6" />
                                            <div>
                                                <h3 className="font-bold text-green-400">Project Secured</h3>
                                                <p className="text-sm text-green-300/70">Quantum-safe primitives employed. Ready for Q-Day.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <AlertTriangle className="text-red-500 w-6 h-6" />
                                            <div>
                                                <h3 className="font-bold text-red-400">Critical Vulnerabilities Detected</h3>
                                                <p className="text-sm text-red-300/70">Immediate action required for Q-Day compliance.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {vulns.map((vuln) => (
                                            <div key={vuln.id} className={`p-4 bg-slate-950 rounded-lg border flex justify-between items-center transition-all ${vuln.fixed ? 'border-green-800 opacity-60' : 'border-slate-800 hover:border-cyan-500/30'}`}>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 p-2 bg-slate-900 rounded md:block hidden">
                                                        {vuln.id === 1 ? <Code className="w-5 h-5 text-slate-400" /> : <Terminal className="w-5 h-5 text-slate-400" />}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold ${vuln.fixed ? 'text-green-400 line-through' : 'text-white'}`}>{vuln.name}</h4>
                                                        <p className="text-sm text-slate-400 font-mono">{vuln.file}</p>
                                                        {!vuln.fixed && <span className="inline-block mt-2 text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-900/50">{vuln.type}</span>}
                                                    </div>
                                                </div>
                                                {vuln.fixed ? (
                                                    <span className="flex items-center text-green-500 text-sm font-bold"><CheckCircle className="w-4 h-4 mr-2" /> Fixed</span>
                                                ) : (
                                                    <button
                                                        onClick={() => fixVuln(vuln.id)}
                                                        className="px-4 py-2 bg-cyan-600/10 text-cyan-400 border border-cyan-500/50 rounded hover:bg-cyan-600 hover:text-white transition-all text-sm font-medium"
                                                    >
                                                        {vuln.id === 1 ? 'Fix with Kyber' : 'Update Config'}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Stats */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Risk Score</h3>
                            <div className="relative w-40 h-40 mx-auto">
                                {/* Circular chart */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="none" />
                                    <circle
                                        cx="80" cy="80" r="70"
                                        stroke={strokeColor}
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray="440"
                                        strokeDashoffset={440 - (440 * riskScore) / 100}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className={`text-4xl font-bold ${scoreColor}`}>
                                        {step === 0 ? '?' : step === 1 ? '...' : riskScore}
                                    </span>
                                    <span className="text-xs text-slate-500">RESILIENCE</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 border border-purple-500/20 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/10 rounded-lg"><RefreshCw className="w-5 h-5" /></div>
                                <h3 className="font-bold">Migration Assistant</h3>
                            </div>
                            <p className="text-indigo-200 text-sm mb-4">
                                {allFixed ? 'All migrations applied successfully.' : 'We can automatically refactor your RSA signatures to use CRYSTALS-Dilithium.'}
                            </p>
                            <button
                                onClick={autoMigrate}
                                disabled={step !== 2 || allFixed}
                                className="w-full py-2 bg-white text-indigo-900 font-bold rounded hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {allFixed ? 'Already Migrated' : 'Auto-Migrate Now'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
