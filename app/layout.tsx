import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Quantum Shadows',
    description: 'Securing the Post-Quantum World',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20"></div>
                            <span className="font-bold text-xl tracking-tight">Quantum<span className="text-cyan-400">Shadows</span></span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                            <a href="/docs" className="hover:text-cyan-400 transition-colors">Documentation</a>
                            <a href="/dashboard" className="hover:text-cyan-400 transition-colors">Scanner</a>
                            <a href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
                            <a href="/dashboard" className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-cyan-50 hover:scale-105 transition-all">
                                Get Started
                            </a>
                        </div>
                    </div>
                </nav>
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="border-t border-slate-800 py-8 bg-slate-950 text-center text-slate-500 text-sm">
                    <p>© 2025 Quantum Shadows Initiative. Open Source (MIT).</p>
                </footer>
            </body>
        </html>
    )
}
