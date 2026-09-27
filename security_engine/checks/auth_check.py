from typing import List, Dict, Any

def audit_auth_and_cookies(headers: Dict[str, str], url: str) -> List[Dict[str, Any]]:
    findings = []
    
    # Check Set-Cookie headers for Secure, HttpOnly, and SameSite attributes
    set_cookie = headers.get("set-cookie") or headers.get("Set-Cookie")
    if set_cookie:
        cookies = [c.strip() for c in set_cookie.split(",")]
        for cookie_str in cookies:
            lower = cookie_str.lower()
            name = cookie_str.split("=")[0].strip()
            
            missing_attributes = []
            if "httponly" not in lower:
                missing_attributes.append("HttpOnly")
            if "secure" not in lower and url.startswith("https"):
                missing_attributes.append("Secure")
            if "samesite" not in lower:
                missing_attributes.append("SameSite")

            if missing_attributes:
                findings.append({
                    "title": f"Insecure Cookie Configuration: Missing {', '.join(missing_attributes)} ({name})",
                    "severity": "Medium",
                    "category": "Authentication",
                    "affected_component": f"Cookie: {name}",
                    "description": f"The cookie '{name}' is set without critical protective flags ({', '.join(missing_attributes)}). Missing HttpOnly allows JavaScript access via document.cookie; missing Secure allows transmission over plaintext HTTP; missing SameSite increases vulnerability to Cross-Site Request Forgery (CSRF).",
                    "business_impact": "Potential session hijacking, credential theft, and unauthorized transactions.",
                    "security_impact": "Session token exposure to XSS and network eavesdropping.",
                    "remediation_recommendation": f"Configure cookie attributes: Set-Cookie: {name}=[VALUE]; Secure; HttpOnly; SameSite=Strict; Path=/;",
                    "cvss_score": 6.5,
                    "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N",
                    "cwe_id": "CWE-614",
                    "evidence_type": "Cookie Attribute Inspection",
                    "evidence_headers": {"Set-Cookie": f"{name}=[REDACTED_BY_SECUREMON_POLICY]"},
                    "reproduction_steps": [
                        f"1. Trigger session issuance endpoint on {url}",
                        "2. Inspect Set-Cookie response directive",
                        f"3. Verify missing {', '.join(missing_attributes)} attributes"
                    ],
                    "safe_poc": f"Inspected Set-Cookie header for '{name}'; Missing attributes: {', '.join(missing_attributes)}"
                })

    return findings
