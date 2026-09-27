import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    APP_NAME: str = "SecureMon - Authorized Application Security Assessment Platform"
    API_V1_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./securemon.db")
    
    # Auth & JWT
    JWT_SECRET: str = os.getenv("JWT_SECRET", "securemon-super-secret-jwt-key-sih-2026-ntro-mic-authorized-only")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Threat Intelligence
    NVD_API_KEY: str = os.getenv("NVD_API_KEY", "")
    NVD_API_BASE: str = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    EPSS_API_URL: str = "https://api.first.org/data/v1/epss"
    CISA_KEV_URL: str = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
    
    # ZAP Settings
    ZAP_ENABLED: bool = os.getenv("ZAP_ENABLED", "false").lower() == "true"
    ZAP_PROXY_URL: str = os.getenv("ZAP_PROXY_URL", "http://localhost:8080")
    ZAP_API_KEY: str = os.getenv("ZAP_API_KEY", "")
    
    # Storage
    REPORT_STORAGE_PATH: str = os.getenv("REPORT_STORAGE_PATH", "./reports_storage")
    
    # Target Allowlist & SSRF Safeguards
    # True allows 127.0.0.1 / localhost exclusively for authorized testing of the local demo lab / World Monitor simulation
    ALLOW_LOCAL_LAB_TARGETS: bool = os.getenv("ALLOW_LOCAL_LAB_TARGETS", "true").lower() == "true"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    class Config:
        case_sensitive = True

settings = Settings()
