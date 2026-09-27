from typing import List, Dict, Any

def audit_security_headers(headers: Dict[str, str], url: str) -> List[Dict[str, Any]]:
    findings = []
    headers_lower = {k.lower(): v for k, v in headers.items()}

    # 1. Content-Security-Policy
    csp = headers_lower.get("content-security-policy")
    if not csp:
        findings.append({
            "title": "Missing Content-Security-Policy (CSP) Header",
            "severity": "Medium",
            "category": "Security Headers",
            "affected_component": url,
            "description": "The Content-Security-Policy (CSP) header is absent from the HTTP response. CSP is a defense-in-depth mechanism that prevents Cross-Site Scripting (XSS) and data injection attacks by restricting the origins from which scripts, images, and other resources can be loaded.",
            "business_impact": "Vulnerability to client-side code execution, unauthorized session access, and potential defacement.",
            "security_impact": "High browser-side attack surface; allows execution of untrusted scripts if an injection vulnerability exists.",
            "remediation_recommendation": "Implement a strict Content-Security-Policy header, such as: Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';",
            "cvss_score": 5.4,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N",
            "cwe_id": "CWE-693",
            "evidence_type": "Response Header Verification",
            "evidence_headers": headers,
            "reproduction_steps": [
                f"1. Send an authorized GET request to {url}",
                "2. Inspect the HTTP response headers",
                "3. Observe that 'Content-Security-Policy' is missing"
            ],
            "safe_poc": f"curl -I -s '{url}' | grep -i 'content-security-policy' (No result returned)"
        })
    elif "unsafe-inline" in csp or "unsafe-eval" in csp:
        findings.append({
            "title": "Weak Content-Security-Policy Allows 'unsafe-inline' / 'unsafe-eval'",
            "severity": "Low",
            "category": "Security Headers",
            "affected_component": url,
            "description": "The CSP header was detected but includes 'unsafe-inline' or 'unsafe-eval' directives, which undermine defenses against Cross-Site Scripting.",
            "business_impact": "Reduced resistance against XSS exploits.",
            "security_impact": "Attacker could execute inline malicious script payloads.",
            "remediation_recommendation": "Refactor inline scripts to external scripts with cryptographic nonces or hashes.",
            "cvss_score": 3.7,
            "cvss_vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N",
            "cwe_id": "CWE-693",
            "evidence_type": "Response Header Verification",
            "evidence_headers": {"content-security-policy": csp},
            "reproduction_steps": ["1. Check CSP header for 'unsafe-inline' or 'unsafe-eval'"],
            "safe_poc": f"curl -I '{url}' -> CSP contains unsafe-inline"
        })

    # 2. Strict-Transport-Security (HSTS)
    hsts = headers_lower.get("strict-transport-security")
    if not hsts and url.startswith("https"):
        findings.append({
            "title": "Missing HTTP Strict Transport Security (HSTS) Header",
            "severity": "Medium",
            "category": "Transport Security",
            "affected_component": url,
            "description": "HTTP Strict Transport Security (HSTS) informs user agents that all future communications must use HTTPS exclusively, protecting against SSL-stripping and man-in-the-middle attacks.",
            "business_impact": "Potential interception of user traffic on public or untrusted Wi-Fi networks.",
            "security_impact": "Risk of protocol downgrade attacks (SSL-stripping).",
            "remediation_recommendation": "Add the Strict-Transport-Security header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
            "cvss_score": 5.3,
            "cvss_vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N",
            "cwe_id": "CWE-319",
            "evidence_type": "Response Header Verification",
            "evidence_headers": headers,
            "reproduction_steps": [
                f"1. Request {url} over HTTPS",
                "2. Check response headers for 'Strict-Transport-Security'"
            ],
            "safe_poc": f"curl -I -s '{url}' | grep -i 'strict-transport-security' (Not found)"
        })

    # 3. X-Content-Type-Options
    xcto = headers_lower.get("x-content-type-options")
    if xcto != "nosniff":
        findings.append({
            "title": "Missing or Misconfigured X-Content-Type-Options Header",
            "severity": "Low",
            "category": "Security Headers",
            "affected_component": url,
            "description": "The X-Content-Type-Options response header is not set to 'nosniff'. Browsers may attempt to MIME-sniff the response body, leading to script execution from files intended as non-executable media.",
            "business_impact": "Potential drive-by attacks via user-uploaded content.",
            "security_impact": "MIME-type confusion and unexpected script execution.",
            "remediation_recommendation": "Configure web server or application middleware to return: X-Content-Type-Options: nosniff",
            "cvss_score": 3.1,
            "cvss_vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:N/A:N",
            "cwe_id": "CWE-16",
            "evidence_type": "Response Header Verification",
            "evidence_headers": headers,
            "reproduction_steps": [f"1. Query {url}", "2. Note missing 'X-Content-Type-Options: nosniff' header"],
            "safe_poc": f"X-Content-Type-Options header value: '{xcto or 'None'}'"
        })

    # 4. X-Frame-Options or CSP frame-ancestors
    xfo = headers_lower.get("x-frame-options")
    if not xfo and (not csp or "frame-ancestors" not in csp):
        findings.append({
            "title": "Missing Clickjacking Protection (X-Frame-Options / frame-ancestors)",
            "severity": "Medium",
            "category": "Security Headers",
            "affected_component": url,
            "description": "Neither X-Frame-Options nor CSP frame-ancestors is present to specify whether the browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.",
            "business_impact": "Unauthorized action execution via transparent iframe overlay (Clickjacking).",
            "security_impact": "User interface redressing allows deceptive interaction capture.",
            "remediation_recommendation": "Send header: X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors 'none';",
            "cvss_score": 4.3,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N",
            "cwe_id": "CWE-1021",
            "evidence_type": "Response Header Verification",
            "evidence_headers": headers,
            "reproduction_steps": ["1. Attempt to embed target endpoint within an HTML <iframe> tag in a test harness."],
            "safe_poc": "<iframe src='[TARGET_URL]'></iframe> renders without browser framing restriction."
        })

    return findings
