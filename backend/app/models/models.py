import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, DateTime, ForeignKey, Enum as SQLEnum, JSON
)
from sqlalchemy.orm import relationship
from backend.app.database import Base

def gen_uuid():
    return str(uuid.uuid4())

class UserRole(str):
    ADMIN = "ADMIN"
    SECURITY_ANALYST = "SECURITY_ANALYST"
    VIEWER = "VIEWER"

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default=UserRole.SECURITY_ANALYST, nullable=False)
    is_active = Column(Boolean, default=True)
    organization = Column(String(255), default="National Technical Research Organisation (NTRO)")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    assessments = relationship("Assessment", back_populates="creator")
    audit_logs = relationship("AuditLog", back_populates="user")


class Target(Base):
    __tablename__ = "targets"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    base_url = Column(String(512), nullable=False)
    environment = Column(String(50), default="Testing") # Testing, Staging, Production
    owner = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    scopes = relationship("TargetScope", back_populates="target", cascade="all, delete-orphan")
    authorizations = relationship("Authorization", back_populates="target", cascade="all, delete-orphan")
    assessments = relationship("Assessment", back_populates="target", cascade="all, delete-orphan")
    api_endpoints = relationship("ApiEndpoint", back_populates="target", cascade="all, delete-orphan")


class TargetScope(Base):
    __tablename__ = "target_scopes"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    target_id = Column(String(36), ForeignKey("targets.id", ondelete="CASCADE"), nullable=False)
    allowed_domains = Column(JSON, default=list) # e.g. ["worldmonitor-app.local", "api.worldmonitor.local"]
    allowed_api_paths = Column(JSON, default=list) # e.g. ["/api/v1/*", "/auth/*"]
    excluded_paths = Column(JSON, default=list) # e.g. ["/admin/purge", "/billing/*"]
    created_at = Column(DateTime, default=datetime.utcnow)

    target = relationship("Target", back_populates="scopes")


class Authorization(Base):
    __tablename__ = "authorizations"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    target_id = Column(String(36), ForeignKey("targets.id", ondelete="CASCADE"), nullable=False)
    auth_reference_code = Column(String(100), nullable=False) # e.g. NTRO-MIC-2026-AUTH-091
    confirmed_by = Column(String(255), nullable=False)
    is_confirmed = Column(Boolean, default=False)
    authorized_from = Column(DateTime, default=datetime.utcnow)
    authorized_to = Column(DateTime, nullable=False)
    legal_disclaimer_accepted = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    target = relationship("Target", back_populates="authorizations")


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    target_id = Column(String(36), ForeignKey("targets.id", ondelete="CASCADE"), nullable=False)
    created_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String(255), nullable=False)
    profile = Column(String(50), default="SAFE") # PASSIVE, SAFE, STANDARD
    status = Column(String(50), default="Draft") # Draft, Authorized, Queued, Running, Completed, Failed, Cancelled
    progress = Column(Integer, default=0) # 0 to 100%
    current_phase = Column(String(100), default="Initialized")
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    duration_seconds = Column(Integer, default=0)
    risk_score = Column(Float, default=0.0) # 0 to 100
    risk_level = Column(String(50), default="Low") # Low, Medium, High, Critical
    created_at = Column(DateTime, default=datetime.utcnow)

    target = relationship("Target", back_populates="assessments")
    creator = relationship("User", back_populates="assessments")
    findings = relationship("Finding", back_populates="assessment", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="assessment", cascade="all, delete-orphan")


class Finding(Base):
    __tablename__ = "findings"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    severity = Column(String(50), nullable=False) # Critical, High, Medium, Low, Info
    category = Column(String(100), nullable=False) # Authentication, Authorization, Input Validation, API Security, Transport, Headers, Data Protection, etc.
    affected_component = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    business_impact = Column(Text, nullable=True)
    security_impact = Column(Text, nullable=True)
    remediation_recommendation = Column(Text, nullable=False)
    remediation_status = Column(String(50), default="Open") # Open, In Progress, Resolved, Accepted Risk
    
    # CVSS & Risk Metrics
    cvss_score = Column(Float, default=0.0)
    cvss_vector = Column(String(100), nullable=True) # e.g. CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N
    epss_score = Column(Float, default=0.0) # 0.0 to 1.0
    epss_percentile = Column(Float, default=0.0)
    cisa_kev = Column(Boolean, default=False)
    cve_id = Column(String(50), nullable=True) # e.g. CVE-2024-XXXX
    cwe_id = Column(String(50), nullable=True) # e.g. CWE-693

    is_demo = Column(Boolean, default=False)
    detected_at = Column(DateTime, default=datetime.utcnow)

    assessment = relationship("Assessment", back_populates="findings")
    evidence = relationship("FindingEvidence", back_populates="finding", cascade="all, delete-orphan")
    poc_results = relationship("PocResult", back_populates="finding", cascade="all, delete-orphan")


class FindingEvidence(Base):
    __tablename__ = "finding_evidence"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    finding_id = Column(String(36), ForeignKey("findings.id", ondelete="CASCADE"), nullable=False)
    evidence_type = Column(String(100), nullable=False) # HTTP Request/Response, Header Verification, Marker Reflection, SSL/TLS Handshake
    request_headers = Column(JSON, default=dict) # Sanitized and masked
    response_headers = Column(JSON, default=dict)
    request_body = Column(Text, nullable=True)
    response_body = Column(Text, nullable=True)
    extracted_snippet = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    finding = relationship("Finding", back_populates="evidence")


class PocResult(Base):
    __tablename__ = "poc_results"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    finding_id = Column(String(36), ForeignKey("findings.id", ondelete="CASCADE"), nullable=False)
    poc_type = Column(String(100), nullable=False) # Safe Header Verification, Safe Marker Reflection, Role Matrix Test
    reproduction_steps = Column(JSON, default=list)
    safe_payload = Column(String(255), nullable=True)
    status = Column(String(50), default="Verified") # Verified, Unverified, Inconclusive
    execution_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    finding = relationship("Finding", back_populates="poc_results")


class ApiEndpoint(Base):
    __tablename__ = "api_endpoints"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    target_id = Column(String(36), ForeignKey("targets.id", ondelete="CASCADE"), nullable=False)
    method = Column(String(10), nullable=False) # GET, POST, PUT, DELETE, PATCH
    path = Column(String(512), nullable=False)
    authentication_required = Column(Boolean, default=True)
    parameters_summary = Column(JSON, default=list)
    risk_level = Column(String(50), default="Low") # Low, Medium, High
    status_code = Column(Integer, default=200)
    last_seen = Column(DateTime, default=datetime.utcnow)

    target = relationship("Target", back_populates="api_endpoints")


class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    assessment_id = Column(String(36), ForeignKey("assessments.id", ondelete="CASCADE"), nullable=False)
    report_title = Column(String(255), nullable=False)
    format = Column(String(20), default="JSON") # PDF, JSON, CSV
    executive_summary = Column(Text, nullable=False)
    metrics_summary = Column(JSON, default=dict)
    file_path = Column(String(512), nullable=True)
    generated_at = Column(DateTime, default=datetime.utcnow)

    assessment = relationship("Assessment", back_populates="reports")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    actor_email = Column(String(255), nullable=False)
    action = Column(String(100), nullable=False) # ASSESSMENT_CREATED, AUTHORIZATION_CONFIRMED, SCAN_STARTED, etc.
    target_name = Column(String(255), nullable=True)
    details = Column(JSON, default=dict)
    ip_address = Column(String(50), default="127.0.0.1")
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")
