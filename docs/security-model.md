# SecureMon — Security Model & Governance Principles

**Problem Statement:** SIH26163  
**Organization:** National Technical Research Organisation (NTRO)  

---

## 1. Principles of Authorized Assessment

SecureMon enforces strict safeguards to guarantee that security evaluations are conducted lawfully and non-destructively:

### A. Explicit Target Registration
Targets must be registered with:
- Target name, base URL, and operational environment (`Testing`, `Staging`, `Production`).
- Authorized technical owner and contact point.
- Strict scope allowlist specifying permitted hostnames, allowed API subpaths, and explicitly excluded sensitive endpoints (e.g. `/admin/purge`, billing routes).

### B. Mandatory Legal Confirmation
Every assessment requires:
- An official legal authorization reference code (e.g., `NTRO-MIC-SIH26163-AUTH-001`).
- An active certification checkbox: *"I confirm that I am authorized to assess this target."*
- Unsigned or unconfirmed assessments cannot transition to the `Running` state and are rejected by API gateway middleware.

---

## 2. Server-Side Request Forgery (SSRF) Guard

To ensure that the scanner cannot be weaponized against internal perimeter infrastructure or cloud metadata endpoints:

1. **Protocol Allowlist:** Only `http` and `https` schemes are accepted. Schemes like `file://`, `gopher://`, `ftp://`, and `ldap://` are rejected immediately.
2. **Private Address Filtering:** SecureMon resolves target hostnames to IP addresses and evaluates them against RFC 1918 private subnets:
   - `10.0.0.0/8`
   - `172.16.0.0/12`
   - `192.168.0.0/16`
   - Loopback (`127.0.0.1`, `localhost`)
   - Link-Local (`169.254.0.0/16`)
3. **Cloud Metadata Protection:** Requests targeting AWS/GCP metadata endpoints (`169.254.169.254`, `fd00:ec2::254`) are blocked unconditionally with high-priority audit alerts.
4. **Local Lab Override:** In controlled demonstration/hackathon mode (`ALLOW_LOCAL_LAB_TARGETS=true`), loopback addresses are permitted exclusively for testing the built-in `/api/lab` test bench.

---

## 3. Data Privacy & Technical Evidence Sanitization

All captured HTTP traffic is processed through SecureMon's Redaction Engine before being committed to database storage:
- **Sensitive Headers Redacted:** `Authorization`, `Cookie`, `Set-Cookie`, `X-API-Key`, `Proxy-Authorization`.
- **Payload Redaction:** Passwords, bearer tokens, and secret parameters matching regex patterns are replaced with `[REDACTED_BY_SECUREMON_POLICY]`.
- Technical evidence retains sufficient fidelity for reproduction while preventing stored credential theft.

---

## 4. Safe Non-Destructive Proofs-of-Concept

- Active checks never utilize destructive exploitation, data modification, denial-of-service, or privilege escalation.
- Reflection checks utilize benign, unique marker strings (e.g. `secmon_safe_reflection_test_7381`) to observe contextual HTML entity encoding in responses.
