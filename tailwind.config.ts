import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                quantum: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // Sky blue for "Quantum" feel
                    600: '#0284c7',
                    900: '#0c4a6e',
                    neon: '#00f0ff', // Cyberpunk neon
                },
                danger: '#ef4444',
                success: '#22c55e',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'quantum-gradient': 'linear-gradient(to right, #0f172a, #1e293b, #0f172a)',
            },
        },
    },
    plugins: [],
}
export default config
