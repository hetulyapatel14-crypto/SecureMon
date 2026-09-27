import ipaddress
import socket
from urllib.parse import urlparse
from typing import Tuple
from backend.app.config import settings

FORBIDDEN_SCHEMES = {"file", "gopher", "ftp", "tftp", "ldap", "dict", "sftp"}
CLOUD_METADATA_IPS = {"169.254.169.254", "fd00:ec2::254"}

def is_ip_private_or_restricted(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return (
            ip.is_loopback or 
            ip.is_private or 
            ip.is_link_local or 
            ip.is_reserved or 
            ip.is_multicast or
            ip_str in CLOUD_METADATA_IPS
        )
    except ValueError:
        return False

def validate_target_url(url: str, allow_local_lab: bool = None) -> Tuple[bool, str]:
    """
    Validates a proposed assessment target URL to prevent Server-Side Request Forgery (SSRF)
    and unauthorized perimeter scanning.
    """
    if allow_local_lab is None:
        allow_local_lab = settings.ALLOW_LOCAL_LAB_TARGETS

    if not url:
        return False, "Target URL cannot be empty."

    parsed = urlparse(url)
    
    if parsed.scheme.lower() not in {"http", "https"}:
        return False, f"Invalid scheme '{parsed.scheme}'. Only HTTP and HTTPS are permitted."

    hostname = parsed.hostname
    if not hostname:
        return False, "Target hostname could not be resolved from URL."

    # If local lab is permitted, allow local training targets
    is_localhost = hostname in {"localhost", "127.0.0.1", "0.0.0.0", "::1"} or hostname.endswith(".local") or hostname.endswith(".test")
    if is_localhost:
        if allow_local_lab:
            return True, "Authorized Local Lab Target."
        else:
            return False, "Target resolved to localhost/private loopback which is disallowed in production mode."

    # Resolve IP addresses for hostname
    try:
        addr_info = socket.getaddrinfo(hostname, None)
        ips = {item[4][0] for item in addr_info}
    except socket.gaierror:
        return False, f"Failed to resolve hostname '{hostname}' via DNS."

    for ip in ips:
        if ip in CLOUD_METADATA_IPS:
            return False, f"Security Violation: Target resolves to cloud metadata endpoint ({ip}). Scanning aborted."
        if is_ip_private_or_restricted(ip) and not allow_local_lab:
            return False, f"Security Violation: Target resolves to internal or private IP address ({ip})."

    return True, "Target URL validated successfully and conforms to safety criteria."
