# User Journey / Demo Flow

## 1. Onboarding
*   **Landing Page**: "Is your code ready for Q-Day?"
*   **Action**: User clicks "Check My Project Free".
*   **Auth**: Social login via GitHub (Supabase Auth).

## 2. Analysis
*   **Input**: User authorizes access to a GitHub repository or uploads a `package.json` / source zip.
*   **Process**: The system displays a terminal-like scanning animation. "Analyzing cryptographic primitives...", "Checking entropy sources...".
*   **Result**: A "Quantum Risk Score" (0-100). 
    *   *Red Alert*: "RSA-2048 detected in main auth flow."

## 3. Mitigation (The "Magic" Moment)
*   **Proposal**: The Toolkit proposes a "Migration Plan".
    *   "Replace `rsa` with `crystals-kyber` for key exchange."
    *   "Update TLS config to `TLS 1.3 + PQ-Hybrid`."
*   **Action**: User clicks "Auto-Fix" (for supported patterns) or "View Implementation Guide".

## 4. Deployment
*   **Integration**: User connects Vercel account.
*   **Deploy**: Click "Deploy Quantum-Safe Build".
*   **Outcome**: The app is redeployed. The dashboard updates to show the "Quantum Safe" Shield Badge.

## Mock UI Elements
*   **Dashboard Header**: "Quantum Shadows | Status: Protected" (Green Shield).
*   **Scan Card**: "Vulnerability: `jwt.sign(RS256)` -> Recommended: `Dilithium3`".
*   **Visualizer**: A graph showing data flow and encryption points, coloring them Red (Classic) or Blue (Quantum-Safe).
