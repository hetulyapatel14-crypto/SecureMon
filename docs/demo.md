# SecureMon — SIH Live Demonstration Script

**Problem Statement:** SIH26163 — Security Assessment of the World Monitor application  
**Target Audience:** SIH Jury, Evaluators, NTRO & MIC Officials  

---

## ⏱️ Step-by-Step Presentation Script (7–10 Minutes)

### Step 1: The Problem & Vision (1 Minute)
1. Open the **Landing Page** (`http://localhost:5173/`).
2. Highlight the headline: *"Assess Security Before Attackers Do."*
3. Explain the problem context:
   - Modern situational awareness applications like World Monitor handle real-time geospatial intelligence, operator coordinates, and sensitive telemetry.
   - Traditional vulnerability scanners produce false positives, lack business risk context, or risk crashing mission-critical staging servers.
   - SecureMon provides a governed, authorized assessment lifecycle combining automated checks, non-destructive PoCs, and real-time CISA KEV & EPSS intelligence.

### Step 2: Architecture & Governed Scope (2 Minutes)
1. Point to the persistent **Scope Banner**: *"AUTHORIZED ASSESSMENT ONLY — Target allowlisting enforced."*
2. Navigate to **Architecture** (`/architecture`) to demonstrate the four isolated tiers:
   - React Dark SaaS UI
   - FastAPI Gateway with RFC 1918 SSRF Guard
   - Isolated OWASP ZAP Worker
   - Real-time Threat Intelligence (NVD, FIRST EPSS, CISA KEV)

### Step 3: SOC Dashboard & Posture Score (2 Minutes)
1. Navigate to **Dashboard** (`/dashboard`).
2. Explain the **Security Posture Score (82/100)**:
   - Show how the score is calculated with deductions based on unresolved critical and high findings.
3. Review the **Severity Distribution Donut Chart** and the **7-Day Findings Trend**.
4. Highlight the **Security Layer Micro-Cards** (Authentication, Authorization, API Security, Transport, Data Protection).

### Step 4: Assessment Wizard & Live Execution (2 Minutes)
1. Go to **Assessments** (`/assessments`) and click **"Create Assessment"**.
2. Walk through the 5-stage wizard:
   - **Stage 1 (Target):** Show `https://worldmonitor-demo.ntro.internal` on Staging.
   - **Stage 2 (Authorization):** Show mandatory legal reference code `NTRO-MIC-SIH26163-AUTH-001` and the required confirmation checkbox.
   - **Stage 3 (Scope):** Show allowed hostnames, API paths, and excluded paths.
   - **Stage 4 (Profile):** Select `SAFE` non-destructive profile.
   - **Stage 5 (Execution):** Click **Start Assessment** and watch the live progress bar advance through all inspection phases.

### Step 5: Finding Analysis & Evidence Redaction (2 Minutes)
1. Navigate to **Findings** (`/findings`) and select *"Critical CORS Misconfiguration with Allowed Credentials"*.
2. Show all 16 technical sections on the **Finding Detail Page** (`/findings/:id`):
   - **CVSS 3.1 Vector:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N` (8.8)
   - **FIRST EPSS Score:** `76.2%` (High weaponization probability)
   - **CISA KEV Status:** Detected (Active in wild)
   - **Technical Evidence:** Point out the redacting of active cookies and authorization headers (`[REDACTED_BY_SECUREMON_POLICY]`).
   - **Remediation Code Fix:** Show the concrete Nginx / FastAPI code fix.
   - Update remediation status to **"In Progress"** and show real-time audit logging.

### Step 6: Controlled Lab & Executive Report (1 Minute)
1. Open the **Local Security Lab** (`/lab`) and click **"Execute Safe Probe"** to show live HTTP probe execution against the simulated test service.
2. Go to **Reports** (`/reports`), demonstrate the printable layout, and click **"Export JSON"** to produce an audit-ready artifact.
3. Conclude by pointing to the **Immutable Audit Trail** (`/audit-logs`) verifying that every single evaluator action has been logged with cryptographic verification.
