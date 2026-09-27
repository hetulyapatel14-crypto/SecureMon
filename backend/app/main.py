from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from datetime import datetime, timedelta

from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.models.models import User, Target, TargetScope, Authorization, Assessment, Finding, FindingEvidence, PocResult, AuditLog
from backend.app.security.jwt_auth import get_password_hash
from backend.app.routers import (
    auth, targets, assessments, findings, intelligence, reports, dashboard, audit, lab
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("securemon")

app = FastAPI(
    title=settings.APP_NAME,
    description="Authorized Application Security Assessment & Threat Intelligence Platform for SIH26163 (NTRO/MIC)",
    version="2.0.0",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc"
)

# Strict CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(targets.router, prefix=settings.API_V1_PREFIX)
app.include_router(assessments.router, prefix=settings.API_V1_PREFIX)
app.include_router(findings.router, prefix=settings.API_V1_PREFIX)
app.include_router(intelligence.router, prefix=settings.API_V1_PREFIX)
app.include_router(reports.router, prefix=settings.API_V1_PREFIX)
app.include_router(dashboard.router, prefix=settings.API_V1_PREFIX)
app.include_router(audit.router, prefix=settings.API_V1_PREFIX)
app.include_router(lab.router, prefix=settings.API_V1_PREFIX)

@app.on_event("startup")
def startup_event():
    # Initialize DB tables
    Base.metadata.create_all(bind=engine)
    logger.info("Database schema synchronized successfully.")

    # Seed Demo Data if not already present
    db = SessionLocal()
    try:
        user_count = db.query(User).count()
        if user_count == 0:
            logger.info("Seeding realistic authorized demo targets, assessments, and findings...")
            
            # 1. Demo Analyst User
            analyst = User(
                email="analyst@securemon.gov.in",
                hashed_password=get_password_hash("SecureMon@2026"),
                full_name="Senior Security Evaluator",
                role="SECURITY_ANALYST",
                organization="National Technical Research Organisation (NTRO)"
            )
            db.add(analyst)
            db.flush()

            # 2. Demo Target: World Monitor Production Replica (Controlled)
            target1 = Target(
                name="World Monitor Application (Authorized Test Suite)",
                base_url="https://worldmonitor-demo.ntro.internal",
                environment="Staging",
                owner="Security Operations Center (SOC)",
                description="Controlled replica of World Monitor situational awareness portal for security assessment.",
                is_verified=True
            )
            db.add(target1)
            db.flush()

            scope1 = TargetScope(
                target_id=target1.id,
                allowed_domains=["worldmonitor-demo.ntro.internal", "api.worldmonitor.internal"],
                allowed_api_paths=["/api/v1/*", "/auth/*", "/telemetry/*"],
                excluded_paths=["/admin/purge", "/billing/*"]
            )
            db.add(scope1)

            auth1 = Authorization(
                target_id=target1.id,
                auth_reference_code="NTRO-MIC-SIH26163-AUTH-001",
                confirmed_by="analyst@securemon.gov.in",
                is_confirmed=True,
                authorized_from=datetime.utcnow() - timedelta(days=2),
                authorized_to=datetime.utcnow() + timedelta(days=30),
                legal_disclaimer_accepted=True,
                notes="Authorized security posture testing in compliance with SIH26163 scope guidelines."
            )
            db.add(auth1)

            # 3. Assessment 1: Completed World Monitor Assessment
            assessment1 = Assessment(
                target_id=target1.id,
                created_by=analyst.id,
                title="World Monitor Situational Assessment (Q1 2026)",
                profile="SAFE",
                status="Completed",
                progress=100,
                current_phase="Assessment Completed",
                started_at=datetime.utcnow() - timedelta(hours=4),
                completed_at=datetime.utcnow() - timedelta(hours=3, minutes=38),
                duration_seconds=1320,
                risk_score=82.0,
                risk_level="High"
            )
            db.add(assessment1)
            db.flush()

            # Sample findings for Assessment 1
            sample_findings = [
                {
                    "title": "Critical CORS Misconfiguration with Allowed Credentials",
                    "severity": "Critical",
                    "category": "API Security",
                    "affected_component": "https://worldmonitor-demo.ntro.internal/api/telemetry",
                    "description": "The API service responds with Access-Control-Allow-Origin: * alongside Access-Control-Allow-Credentials: true. This permits cross-origin requests from arbitrary unauthorized origins to access confidential telemetry payloads.",
                    "business_impact": "Exposure of sensitive situational awareness map data to third-party domains.",
                    "security_impact": "Bypasses browser Same-Origin Policy protections completely.",
                    "remediation_recommendation": "Configure an explicit allowlist of authorized frontend origin domains and avoid wildcard reflection.",
                    "cvss_score": 8.8,
                    "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N",
                    "epss_score": 0.762,
                    "epss_percentile": 0.978,
                    "cisa_kev": True,
                    "cve_id": "CVE-2023-4863",
                    "cwe_id": "CWE-942",
                    "status": "In Progress"
                },
                {
                    "title": "Missing Content-Security-Policy (CSP) Defense",
                    "severity": "Medium",
                    "category": "Security Headers",
                    "affected_component": "https://worldmonitor-demo.ntro.internal",
                    "description": "No Content-Security-Policy header is served with the primary web application document. Browser-side script execution controls are inactive.",
                    "business_impact": "Increases susceptibility to client-side injection attacks.",
                    "security_impact": "Absence of resource loading restrictions.",
                    "remediation_recommendation": "Deploy a strict CSP header: default-src 'self'; script-src 'self'; frame-ancestors 'none';",
                    "cvss_score": 5.4,
                    "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N",
                    "epss_score": 0.08,
                    "epss_percentile": 0.45,
                    "cisa_kev": False,
                    "cwe_id": "CWE-693",
                    "status": "Open"
                },
                {
                    "title": "Insecure Session Cookie: Missing HttpOnly Flag",
                    "severity": "Medium",
                    "category": "Authentication",
                    "affected_component": "Cookie: wm_session_id",
                    "description": "The primary session identifier cookie 'wm_session_id' lacks the HttpOnly attribute, rendering it accessible to client-side scripts.",
                    "business_impact": "Elevated risk of session hijacking in the event of any cross-site scripting vulnerability.",
                    "security_impact": "Direct session token exfiltration possible via DOM inspection.",
                    "remediation_recommendation": "Append HttpOnly; Secure; SameSite=Lax flags when setting session cookies.",
                    "cvss_score": 6.5,
                    "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N",
                    "epss_score": 0.12,
                    "epss_percentile": 0.62,
                    "cisa_kev": False,
                    "cwe_id": "CWE-614",
                    "status": "Open"
                },
                {
                    "title": "Verbose Backend Framework Error and Stack Trace Disclosure",
                    "severity": "Low",
                    "category": "Error Handling & Information Disclosure",
                    "affected_component": "/api/v1/query?node=undefined",
                    "description": "Unhandled query exceptions output detailed Python framework stack traces, disclosing server directory hierarchy.",
                    "business_impact": "Information disclosure provides reconnaissance details to threat actors.",
                    "security_impact": "Exposes internal code paths and package versions.",
                    "remediation_recommendation": "Catch generic exceptions and return standard JSON error envelopes without traceback.",
                    "cvss_score": 3.7,
                    "cvss_vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
                    "epss_score": 0.02,
                    "epss_percentile": 0.20,
                    "cisa_kev": False,
                    "cwe_id": "CWE-209",
                    "status": "Resolved"
                }
            ]

            for sf in sample_findings:
                f_obj = Finding(
                    assessment_id=assessment1.id,
                    title=sf["title"],
                    severity=sf["severity"],
                    category=sf["category"],
                    affected_component=sf["affected_component"],
                    description=sf["description"],
                    business_impact=sf["business_impact"],
                    security_impact=sf["security_impact"],
                    remediation_recommendation=sf["remediation_recommendation"],
                    remediation_status=sf["status"],
                    cvss_score=sf["cvss_score"],
                    cvss_vector=sf["cvss_vector"],
                    epss_score=sf["epss_score"],
                    epss_percentile=sf["epss_percentile"],
                    cisa_kev=sf["cisa_kev"],
                    cve_id=sf.get("cve_id"),
                    cwe_id=sf.get("cwe_id"),
                    is_demo=True
                )
                db.add(f_obj)
                db.flush()

                db.add(FindingEvidence(
                    finding_id=f_obj.id,
                    evidence_type="HTTP Header / Payload Inspection",
                    response_headers={"server": "WorldMonitor-Gateway", "access-control-allow-origin": "*"},
                    extracted_snippet="Simulated technical evidence captured during authorized assessment."
                ))

                db.add(PocResult(
                    finding_id=f_obj.id,
                    poc_type="Controlled Passive PoC",
                    reproduction_steps=["1. Send authorized request to endpoint", "2. Verify missing defense in response"],
                    safe_payload="Safe non-destructive verification payload",
                    status="Verified"
                ))

            # Audit record
            db.add(AuditLog(
                user_id=analyst.id,
                actor_email=analyst.email,
                action="INITIAL_DEMO_DATA_SEEDED",
                target_name=target1.name,
                details={"status": "Initialized for SIH26163 Demonstration"}
            ))

            db.commit()
            logger.info("Demo data initialized successfully.")
    except Exception as e:
        logger.error(f"Error seeding demo data: {e}")
        db.rollback()
    finally:
        db.close()

@app.get("/")
def root():
    return {
        "platform": "SECUREMON",
        "title": "Authorized Application Security Assessment Platform",
        "problem_statement": "SIH26163",
        "organization": "National Technical Research Organisation (NTRO)",
        "department": "Ministry of Education's Innovation Cell (MIC)",
        "status": "Operational",
        "api_docs": f"{settings.API_V1_PREFIX}/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}
