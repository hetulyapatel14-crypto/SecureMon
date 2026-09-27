from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserRegister(BaseModel):
    email: str
    password: str = Field(min_length=6)
    full_name: str
    role: Optional[str] = "SECURITY_ANALYST"
    organization: Optional[str] = "National Technical Research Organisation (NTRO)"

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# --- Target & Scope Schemas ---
class TargetScopeSchema(BaseModel):
    allowed_domains: List[str] = []
    allowed_api_paths: List[str] = []
    excluded_paths: List[str] = []

class AuthorizationSchema(BaseModel):
    auth_reference_code: str
    confirmed_by: str
    is_confirmed: bool = True
    authorized_to: datetime
    legal_disclaimer_accepted: bool = True
    notes: Optional[str] = None

class TargetCreate(BaseModel):
    name: str
    base_url: str
    environment: str = "Testing"
    owner: str
    description: Optional[str] = None
    scope: TargetScopeSchema
    authorization: AuthorizationSchema

class TargetResponse(BaseModel):
    id: str
    name: str
    base_url: str
    environment: str
    owner: str
    description: Optional[str]
    is_verified: bool
    created_at: datetime

# --- Assessment Schemas ---
class AssessmentCreate(BaseModel):
    target_id: str
    title: str
    profile: str = "SAFE" # PASSIVE, SAFE, STANDARD

class AssessmentResponse(BaseModel):
    id: str
    target_id: str
    title: str
    profile: str
    status: str
    progress: int
    current_phase: str
    risk_score: float
    risk_level: str
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    duration_seconds: int
    target_name: Optional[str] = None
    findings_count: Optional[int] = 0

# --- Findings Schemas ---
class FindingEvidenceSchema(BaseModel):
    evidence_type: str
    request_headers: Dict[str, Any] = {}
    response_headers: Dict[str, Any] = {}
    request_body: Optional[str] = None
    response_body: Optional[str] = None
    extracted_snippet: Optional[str] = None

class PocResultSchema(BaseModel):
    poc_type: str
    reproduction_steps: List[str] = []
    safe_payload: Optional[str] = None
    status: str = "Verified"
    execution_notes: Optional[str] = None

class FindingResponse(BaseModel):
    id: str
    assessment_id: str
    title: str
    severity: str
    category: str
    affected_component: str
    description: str
    business_impact: Optional[str]
    security_impact: Optional[str]
    remediation_recommendation: str
    remediation_status: str
    cvss_score: float
    cvss_vector: Optional[str]
    epss_score: float
    epss_percentile: float
    cisa_kev: bool
    cve_id: Optional[str]
    cwe_id: Optional[str]
    detected_at: datetime
    evidence: List[FindingEvidenceSchema] = []
    poc_results: List[PocResultSchema] = []

class FindingStatusUpdate(BaseModel):
    remediation_status: str # Open, In Progress, Resolved, Accepted Risk

# --- Report Schemas ---
class ReportCreate(BaseModel):
    assessment_id: str
    format: str = "JSON" # PDF, JSON, CSV
    report_title: Optional[str] = None

# --- Threat Intelligence Schemas ---
class CveIntelligenceResponse(BaseModel):
    cve_id: str
    description: str
    cvss_v31_score: Optional[float] = None
    cvss_vector: Optional[str] = None
    epss_score: Optional[float] = None
    epss_percentile: Optional[float] = None
    in_cisa_kev: bool = False
    kev_date_added: Optional[str] = None
    cwe_ids: List[str] = []
    references: List[str] = []
    source: str = "NVD 2.0 / FIRST EPSS / CISA KEV"

# --- Dashboard Summary ---
class DashboardSummary(BaseModel):
    total_assessments: int
    active_scans: int
    open_findings: int
    critical_findings: int
    high_findings: int
    resolved_findings: int
    security_posture_score: int
    risk_distribution: Dict[str, int]
    coverage_matrix: Dict[str, Dict[str, int]]
