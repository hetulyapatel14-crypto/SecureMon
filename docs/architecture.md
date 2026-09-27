# SecureMon — System Architecture & Component Design

**Problem Statement:** SIH26163  
**Organization:** National Technical Research Organisation (NTRO)  
**Department:** Ministry of Education's Innovation Cell (MIC)  

---

## 1. High-Level Component Topology

SecureMon decomposes into four isolated tiers:

```
[ Tier 1: Client UI ]
  └── Vite + React 18 + TypeScript + Tailwind CSS + Recharts + Framer Motion
      └── Communicates via HTTPS REST and Event Streams with JWT authentication.
      └── Zero third-party API keys exposed to browser.

[ Tier 2: Governance & API Gateway ]
  └── FastAPI (Python 3.11+)
      ├── Authentication Middleware (Salted SHA-256 / JWT Bearer)
      ├── Target Scope & SSRF Guard (RFC 1918, link-local, cloud metadata rejection)
      ├── Role-Based Access Control (ADMIN, SECURITY_ANALYST, VIEWER)
      └── Append-Only Audit Logging Service

[ Tier 3: Security Engine & Worker Pool ]
  └── Async Assessment Orchestrator
      ├── Passive Security Headers Analyzer (CSP, HSTS, XFO, XCTO)
      ├── Authentication & Cookie Flag Validator (HttpOnly, Secure, SameSite)
      ├── Transport & TLS Handshake Inspector (TLS 1.3 / Cipher Suites)
      ├── CORS & API Method Misconfiguration Engine
      ├── Non-Destructive Safe Marker Reflection Engine (<secmon_safe_token>)
      └── Isolated OWASP ZAP Container Worker (Spider & Baseline Alert Parser)

[ Tier 4: Threat Intelligence & Data Persistence ]
  ├── NIST NVD API 2.0 (CVE / CVSS v3.1 / CWE taxonomies)
  ├── FIRST EPSS API (Machine Learning Exploit Prediction Probability)
  ├── CISA Known Exploited Vulnerabilities (KEV) Catalog
  └── PostgreSQL 15 / SQLite Relational Persistence Layer
```

---

## 2. Threat Intelligence Integration Pipeline

When an assessment identifies an exposed component or weakness:
1. **Weakness Mapping:** The finding is mapped to its corresponding Common Weakness Enumeration (CWE) identifier.
2. **NVD Correlation:** If applicable software versions or CVEs are associated, SecureMon queries the NIST NVD API 2.0 with local caching to retrieve official CVSS 3.1 base vectors.
3. **EPSS Probability:** SecureMon queries the FIRST EPSS API (`https://api.first.org/data/v1/epss?cve={cve_id}`) to extract the 0-100% weaponization probability.
4. **CISA KEV Verification:** The CVE is cross-referenced against the CISA Known Exploited catalog to ascertain whether weaponized exploits are actively observed in the wild.
5. **Composite Risk Calculation:** The engine computes the final 0-100 composite risk score using:
   $$\text{Score} = \min\left(100, (\text{CVSS}_{\text{base}} \times 7.0 + \text{EPSS} \times 15.0 + \text{KEV}_{\text{bonus}}) \times \text{Criticality}_{\text{asset}}\right)$$
