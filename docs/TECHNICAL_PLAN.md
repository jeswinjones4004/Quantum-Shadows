# Technical Implementation Plan

## Core Stack
*   **Language**: TypeScript (Node.js/React) for full-stack consistency.
*   **Database**: Supabase (PostgreSQL) for user data, scan logs, and policy storage.
*   **AI/ML**: Python microservices using Hugging Face Transformers (for code analysis models).
*   **Cryptography Integration**: 
    *   WASM bindings for `liboqs` (Open Quantum Safe) for browser/client-side operations.
    *   Node.js wrappers for server-side PQC.
*   **Frontend**: Next.js (deployed on Vercel) for the dashboard and landing page.

## Key Modules

### 1. AI-Driven Scanning Engine
*   **Model**: Fine-tuned CodeBERT or StarCoder model trained on cryptographic code patterns.
*   **Input**: Repository URL or file upload.
*   **Process**:
    1.  Parse AST (Abstract Syntax Tree).
    2.  Identify crypto imports and function calls.
    3.  Flag `crypto.createSign("RSA-SHA256")`, `new EC.Client()`, etc.
    4.  Classify risk level.

### 2. Frontend & User Interface
*   **Framework**: Next.js 14+ (App Router).
*   **UI Library**: Tailwind CSS + Shadcn/ui for a premium, accessible look.
*   **Features**:
    *   Real-time scan progress bars.
    *   "Quantum Safe" badge verification widget.
    *   Documentation viewer.

### 3. PQC Integration Service
*   **Hybrid Encryption**: Implement hybrid schemes (Classical + Post-Quantum) to maintain compliance while adding future-proofing.
*   **API**: REST API offering `/encrypt`, `/decrypt`, `/sign`, `/verify` endpoints using Kyber/Dilithium.

## Security & Licensing
*   **License**: Apache 2.0 or MIT (Open Source).
*   **Testing**: 
    *   Unit tests for mock crypto functions.
    *   Integration tests with Supabase.
    *   Vulnerability testing (SAST) on the toolkit itself.

## Deployment Strategy
1.  **Monorepo**: Turborepo for managing Frontend (Next.js) and Backend (Python/Node) analysis services.
2.  **Hosting**:
    *   Frontend: Vercel.
    *   Backend APIs: Supabase Edge Functions / Vercel Serverless.
    *   AI Worker: Hugging Face Inference API or a dedicated container on Railway/Fly.io if heavy compute is needed.
