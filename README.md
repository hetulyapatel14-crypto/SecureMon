# SECUREMON — Authorized Application Security Assessment Platform

**Smart India Hackathon 2026**  
**Problem Statement ID:** SIH26163  
**Title:** Security Assessment of the World Monitor Application  
**Organization:** National Technical Research Organisation (NTRO)  
**Department:** Ministry of Education's Innovation Cell (MIC)  

---

## 🛡️ Project Overview

**SecureMon** is an enterprise-grade, web-based security assessment and threat intelligence platform designed to evaluate the security posture of the authorized World Monitor web/mobile application and controlled test environments.

Built strictly under a **governed authorized security testing model**, SecureMon empowers security analysts and SOC teams to discover security weaknesses across 9 critical layers, correlate findings with NIST NVD CVEs, evaluate real-world exploit likelihood via FIRST EPSS, cross-reference against CISA Known Exploited Vulnerabilities (KEV), execute safe non-destructive Proofs-of-Concept, and generate audit-grade executive reports.

---

## ✨ Key Capabilities

1. **Mandatory Authorization & Scope Enforcement:** Rejects any scan attempt lacking verified legal authorization reference codes and explicit tester confirmation.
2. **SSRF Guard & Target Allowlisting:** Strictly validates target hostnames and IPs against private networks (RFC 1918), loopback, link-local, and cloud metadata endpoints (`169.254.169.254`).
3. **9-Layer Security Assessment Engine:**
   - **Authentication Controls:** Password policies, brute-force indicators, cookie flags (`HttpOnly`, `Secure`, `SameSite`).
   - **Session Security:** Token randomness, session expiration, credential leakage in URLs.
   - **Authorization (RBAC):** Missing access controls, privilege boundary validation.
   - **API Security:** CORS origin reflection, wildcard `*` with credentials, unauthenticated endpoints.
   - **Input Validation:** Contextual output encoding checks via harmless marker payloads (`<secmon_safe_token>`).
   - **Client-Side Security:** Exposed API tokens, source maps, DOM sink inspection.
   - **Transport Layer:** Plaintext HTTP vs TLS 1.3, certificate validity, HSTS preload.
   - **Security Headers:** CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options.
   - **Error Handling:** Framework stack trace leakage, Server/X-Powered-By technology disclosure.
4. **Threat Intelligence Enrichment:**
   - **NIST NVD API 2.0:** Real-time CVE metadata, CVSS v3.1 base vectors, CWE taxonomy mapping.
   - **FIRST EPSS:** Machine learning exploit prediction scoring (0.0 to 1.0 probability percentile).
   - **CISA KEV:** Real-time flagging of vulnerabilities actively exploited in the wild.
5. **Safe Proof-of-Concept Framework:** Non-destructive verification that automatically sanitizes and redacts all session tokens, passwords, and sensitive headers from technical evidence.
6. **Transparent Composite Risk Scoring:** Quantifies risk from 0 to 100 based on CVSS base points, EPSS probability, CISA KEV bonus, and asset criticality.
7. **Immutable Audit Trail:** Append-only cryptographic event logging capturing every authorization, scan start, finding validation, and report export.
8. **Controlled Security Lab:** Built-in isolated test bench (`/lab`) simulating the World Monitor service for live hackathon judge demonstrations.

---

## 🎨 Visual Design Aesthetics

SecureMon is designed as a **modern dark SaaS cybersecurity platform** inspired by top-tier enterprise security tools:
- **Backgrounds:** Deep almost-black (`#050608`) and charcoal surfaces (`#080B10`).
- **Accents:** Vibrant coral/orange (`#FF7A18` / `#FF9A3D`) with soft ambient glow.
- **Card Surfaces:** Translucent glassmorphism (`rgba(255, 255, 255, 0.025)`) with rounded corners (`20px`) and thin borders.
- **Micro-Interactions:** Cursor-following spotlight glow, smooth Framer Motion transitions, and Recharts analytics.

---

## 🏗️ System Architecture

```text
               +--------------------------------------------------+
               |                  Browser Client                  |
               |       React + TypeScript + Tailwind + Recharts   |
               +--------------------------------------------------+
                                        |
                            HTTPS REST / SSE Stream
                                        v
               +--------------------------------------------------+
               |               FastAPI Gateway (Port 8000)        |
               |  - JWT Auth (Bearer)       - SSRF Guard (RFC 1918)|
               |  - Legal Auth Validation   - Immutable Audit Log |
               +--------------------------------------------------+
                                  |            |
                +-----------------+            +------------------+
                |                                                 |
                v                                                 v
+-------------------------------+              +-----------------------------------+
|     Assessment Engine Worker  |              |        Relational Storage         |
|  - Passive Header Audit       |              |  - PostgreSQL 15 / SQLite Fallback|
|  - TLS Handshake & Cookies    |              |  - Target Allowlist & Scopes      |
|  - Harmless Reflection PoCs   |              |  - Sanitized Evidence & Reports   |
+-------------------------------+              +-----------------------------------+
         |              |
         |              +-----------------------------+
         v                                            v
+-------------------------------+      +-------------------------------------------+
|    Isolated OWASP ZAP Daemon  |      |         Threat Intelligence Feeds         |
|  - Spider & Baseline Rules    |      |  - NIST NVD API 2.0 (CVE / CVSS 3.1)      |
|  - Internal Docker Network    |      |  - FIRST EPSS (Exploit Probability)       |
+-------------------------------+      |  - CISA Known Exploited Vulns (KEV)       |
                                       +-------------------------------------------+
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### 1. Backend Setup

```bash
# From workspace root
cd backend
python -m pip install -r requirements.txt

# Start FastAPI backend
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be live at: `http://localhost:8000/api/docs`

### 2. Frontend Setup

```bash
# In a separate terminal
cd frontend
npm install
npm run dev
```
Frontend interface will be live at: `http://localhost:5173`

---

## 🐳 Running with Docker Compose

To launch the complete isolated stack (Frontend, Backend, PostgreSQL, and OWASP ZAP container):

```bash
docker-compose -f docker/docker-compose.yml up --build -d
```

---

## 🧪 SIH Presentation & Live Demo Walkthrough

1. Navigate to `http://localhost:5173/` to explore the **public landing page**, product screenshot preview, capabilities, and workflow.
2. Enter the **Security Dashboard** (`/dashboard`) to view the overall Security Posture Score (82/100), risk distribution donut, 7-day findings trend, and coverage matrix.
3. Open **Assessments** (`/assessments`) and click **"Create Assessment"** to trigger the 5-stage interactive wizard:
   - Target details (`worldmonitor-demo.ntro.internal`)
   - Legal authorization confirmation (Reference code check)
   - Scope boundaries & SSRF guard
   - Scan profile selection (`SAFE`)
   - Live animated scan execution
4. Drill down into **Findings** (`/findings`) and click **"Analyze"** on any finding (e.g. CORS Wildcard with Credentials) to inspect all 16 technical sections, CVSS 3.1 vector calculator, EPSS probability, CISA KEV status, sanitized request/response evidence, and remediation code fix.
5. Visit the **Local Security Lab** (`/lab`) to execute controlled non-destructive test probes live in front of the judges.
6. Export an audit-grade executive summary on the **Reports Page** (`/reports`).

---

## 📄 Documentation Directory

- [System Architecture](file:///d:/new%20sih%20project/docs/architecture.md)
- [Security Model & SSRF Protection](file:///d:/new%20sih%20project/docs/security-model.md)
- [API Reference](file:///d:/new%20sih%20project/docs/api.md)
- [SIH Live Demo Guide](file:///d:/new%20sih%20project/docs/demo.md)
- [SIH Presentation Pitch Deck](file:///d:/new%20sih%20project/docs/sih-presentation.md)

---

## ⚖️ Legal & Authorization Notice

*SecureMon is engineered strictly for authorized security assessments in controlled environments. Unauthorized testing against third-party systems is explicitly prohibited and guarded against by internal allowlisting and RFC 1918 SSRF safeguards.*
