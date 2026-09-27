import re
from typing import List, Dict, Any

SERVER_TOKENS = ["server", "x-powered-by", "x-aspnet-version", "x-generator"]

def audit_information_disclosure(headers: Dict[str, str], body: str, url: str) -> List[Dict[str, Any]]:
    findings = []
    headers_lower = {k.lower(): v for k, v in headers.items()}

    # 1. Technology disclosure headers
    disclosed_tech = []
    for token in SERVER_TOKENS:
        if token in headers_lower:
            disclosed_tech.append(f"{token}: {headers_lower[token]}")

    if disclosed_tech:
        findings.append({
            "title": "Server Technology and Version Disclosure",
            "severity": "Low",
            "category": "Error Handling & Information Disclosure",
            "affected_component": url,
            "description": f"The web server reveals specific backend software stack and version details via HTTP response headers: {', '.join(disclosed_tech)}. This provides attackers with precise reconnaissance data to identify known CVEs.",
            "business_impact": "Accelerates reconnaissance phase for threat actors.",
            "security_impact": "Exposure of software build versions facilitates targeted exploit matching.",
            "remediation_recommendation": "Configure web server (Nginx/Apache/Cloudflare/FastAPI) to suppress Server and X-Powered-By headers.",
            "cvss_score": 3.7,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
            "cwe_id": "CWE-200",
            "evidence_type": "Response Header Inspection",
            "evidence_headers": {k: headers_lower[k] for k in SERVER_TOKENS if k in headers_lower},
            "reproduction_steps": [f"1. Perform HEAD request to {url}", "2. Inspect Server/X-Powered-By headers"],
            "safe_poc": f"Disclosed headers: {', '.join(disclosed_tech)}"
        })

    # 2. Verbose error pages / stack traces
    if body and ("traceback (most recent call last)" in body.lower() or "exception in thread" in body.lower() or "fatal error:" in body.lower()):
        findings.append({
            "title": "Verbose Stack Trace and Debug Error Disclosure",
            "severity": "High",
            "category": "Error Handling & Information Disclosure",
            "affected_component": url,
            "description": "The application returns raw framework stack traces and debug output upon encountering unhandled exceptions. This exposes internal file paths, module structures, and query parameters.",
            "business_impact": "Leakage of proprietary architecture and system internals.",
            "security_impact": "Facilitates precision payload crafting by disclosing server source structure.",
            "remediation_recommendation": "Implement generic error handlers (e.g. HTTP 500 JSON error envelope) and disable debug mode in staging/production.",
            "cvss_score": 7.5,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
            "cwe_id": "CWE-209",
            "evidence_type": "Response Body Extraction",
            "evidence_snippet": body[:300] + "...",
            "reproduction_steps": [f"1. Trigger an unexpected input condition at {url}", "2. Observe returned traceback"],
            "safe_poc": "Observed stack trace keywords in server response."
        })

    return findings
