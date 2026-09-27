from typing import List, Dict, Any

def audit_transport_security(url: str, is_https: bool) -> List[Dict[str, Any]]:
    findings = []
    
    if not is_https:
        findings.append({
            "title": "Unencrypted Plaintext HTTP Communication",
            "severity": "High",
            "category": "Transport Security",
            "affected_component": url,
            "description": "The application transmits data over unencrypted HTTP instead of HTTPS (TLS 1.3/1.2). All requests, session cookies, and responses are sent in cleartext across intermediate network hops.",
            "business_impact": "Severe exposure to eavesdropping, packet sniffing, credential harvesting, and traffic tampering.",
            "security_impact": "Loss of data confidentiality and integrity during transit.",
            "remediation_recommendation": "Enforce TLS 1.3 across all endpoints with mandatory 301 redirects from HTTP to HTTPS and HSTS headers.",
            "cvss_score": 7.4,
            "cvss_vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N",
            "cwe_id": "CWE-319",
            "evidence_type": "Transport Protocol Inspection",
            "reproduction_steps": [f"1. Connect to {url}", "2. Confirm unencrypted HTTP protocol negotiation"],
            "safe_poc": f"Connection established using plain HTTP: {url}"
        })

    return findings
