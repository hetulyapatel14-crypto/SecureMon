from typing import List, Dict, Any

def audit_api_and_cors(headers: Dict[str, str], url: str) -> List[Dict[str, Any]]:
    findings = []
    headers_lower = {k.lower(): v for k, v in headers.items()}

    acao = headers_lower.get("access-control-allow-origin")
    acac = headers_lower.get("access-control-allow-credentials")

    # Overly permissive CORS with credentials
    if acao == "*" and acac == "true":
        findings.append({
            "title": "Critical CORS Misconfiguration: Wildcard Origin With Credentials",
            "severity": "Critical",
            "category": "API Security",
            "affected_component": url,
            "description": "The target allows wildcard origins (*) while permitting credentials (Access-Control-Allow-Credentials: true). This configuration violates security standards and allows malicious third-party origins to perform authenticated cross-origin requests and read sensitive API responses.",
            "business_impact": "Complete unauthorized exfiltration of authenticated customer or employee data.",
            "security_impact": "Cross-Origin data theft bypassing Same-Origin Policy protections.",
            "remediation_recommendation": "Never reflect arbitrary origins with credentials enabled. Maintain an explicit allowlist of trusted origin domains.",
            "cvss_score": 8.1,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N",
            "cwe_id": "CWE-942",
            "evidence_type": "CORS Header Verification",
            "evidence_headers": {
                "access-control-allow-origin": acao,
                "access-control-allow-credentials": acac
            },
            "reproduction_steps": [
                f"1. Send an OPTIONS preflight request to {url} with header Origin: https://untrusted-site.evil",
                "2. Observe Access-Control-Allow-Origin: * and Access-Control-Allow-Credentials: true"
            ],
            "safe_poc": "Preflight check returned permissive CORS directives with credentials."
        })
    elif acao == "*":
        findings.append({
            "title": "Overly Permissive Cross-Origin Resource Sharing (CORS) Policy",
            "severity": "Medium",
            "category": "API Security",
            "affected_component": url,
            "description": "The API endpoint returns 'Access-Control-Allow-Origin: *', permitting any arbitrary third-party website to make client-side requests and access the response content.",
            "business_impact": "Unintended disclosure of internal API telemetry and data to third-party web clients.",
            "security_impact": "Permissive cross-origin access.",
            "remediation_recommendation": "Restrict Access-Control-Allow-Origin to authorized frontend applications and domains.",
            "cvss_score": 5.3,
            "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
            "cwe_id": "CWE-942",
            "evidence_type": "CORS Header Verification",
            "evidence_headers": {"access-control-allow-origin": "*"},
            "reproduction_steps": [f"1. Make request to {url} with custom Origin header"],
            "safe_poc": "Header verified: Access-Control-Allow-Origin: *"
        })

    return findings
