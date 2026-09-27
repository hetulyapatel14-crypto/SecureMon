from typing import List, Dict, Any

SAFE_MARKER_TOKEN = "secmon_safe_reflection_test_7381"

def audit_safe_reflection(param_name: str, response_body: str, url: str) -> List[Dict[str, Any]]:
    findings = []
    if SAFE_MARKER_TOKEN in response_body:
        findings.append({
            "title": f"Unsanitized Parameter Reflection Indicator in '{param_name}'",
            "severity": "Medium",
            "category": "Input Validation",
            "affected_component": f"{url}?{param_name}=",
            "description": f"The harmless test marker token '{SAFE_MARKER_TOKEN}' injected into parameter '{param_name}' was reflected verbatim into the response body without contextual HTML/attribute entity encoding. This pattern indicates an unsafe reflection mechanism that could be exploited for Cross-Site Scripting (XSS) if unvalidated characters are processed.",
            "business_impact": "Potential client-side script execution in user browser sessions.",
            "security_impact": "Input validation and contextual output encoding deficiency.",
            "remediation_recommendation": "Implement context-aware HTML entity encoding on all user-supplied input prior to rendering into HTML documents or DOM sinks.",
            "cvss_score": 6.1,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
            "cwe_id": "CWE-79",
            "evidence_type": "Harmless Marker Reflection",
            "evidence_snippet": f"...{param_name}={SAFE_MARKER_TOKEN} reflected verbatim without contextual encoding...",
            "reproduction_steps": [
                f"1. Submit request to {url}?{param_name}={SAFE_MARKER_TOKEN}",
                "2. Inspect response body for unescaped marker string"
            ],
            "safe_poc": f"Harmless marker string '{SAFE_MARKER_TOKEN}' observed in response body."
        })

    return findings
