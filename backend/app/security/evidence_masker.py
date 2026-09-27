import re
from typing import Dict, Any

SENSITIVE_HEADER_KEYS = {
    "authorization",
    "cookie",
    "set-cookie",
    "x-api-key",
    "api-key",
    "proxy-authorization",
    "x-auth-token"
}

PASSWORD_REGEX = re.compile(r'("(?:password|secret|token|api_?key|access_?token)"\s*:\s*)"([^"]+)"', re.IGNORECASE)
BEARER_REGEX = re.compile(r'Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*', re.IGNORECASE)

def mask_headers(headers: Dict[str, Any]) -> Dict[str, Any]:
    """
    Masks sensitive values in HTTP request/response headers.
    """
    sanitized = {}
    for key, value in headers.items():
        lower_key = key.lower()
        if lower_key in SENSITIVE_HEADER_KEYS:
            sanitized[key] = "[REDACTED_BY_SECUREMON_POLICY]"
        else:
            sanitized[key] = value
    return sanitized

def mask_body(body_text: str) -> str:
    """
    Masks credentials and tokens within request/response payload snippets.
    """
    if not body_text:
        return ""
    
    masked = PASSWORD_REGEX.sub(r'\1"[REDACTED_CREDENTIAL]"', body_text)
    masked = BEARER_REGEX.sub('Bearer [REDACTED_TOKEN]', masked)
    return masked
