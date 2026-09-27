export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type RemediationStatus = 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk';
export type AssessmentStatus = 'Draft' | 'Authorized' | 'Queued' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
export type ScanProfile = 'PASSIVE' | 'SAFE' | 'STANDARD';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'ADMIN' | 'SECURITY_ANALYST' | 'VIEWER';
  organization: string;
}

export interface TargetScope {
  allowed_domains: string[];
  allowed_api_paths: string[];
  excluded_paths: string[];
}

export interface TargetAuthorization {
  auth_reference_code: string;
  confirmed_by: string;
  is_confirmed: boolean;
  authorized_to: string;
  legal_disclaimer_accepted: boolean;
  notes?: string;
}

export interface Target {
  id: string;
  name: string;
  base_url: string;
  environment: 'Testing' | 'Staging' | 'Production';
  owner: string;
  description?: string;
  is_verified: boolean;
  created_at: string;
}

export interface Assessment {
  id: string;
  target_id: string;
  target_name?: string;
  title: string;
  profile: ScanProfile;
  status: AssessmentStatus;
  progress: number;
  current_phase: string;
  risk_score: number;
  risk_level: string;
  started_at?: string;
  completed_at?: string;
  duration_seconds: number;
  findings_count?: number;
}

export interface FindingEvidence {
  evidence_type: string;
  request_headers?: Record<string, string>;
  response_headers?: Record<string, string>;
  request_body?: string;
  response_body?: string;
  extracted_snippet?: string;
}

export interface PocResult {
  poc_type: string;
  reproduction_steps: string[];
  safe_payload?: string;
  status: 'Verified' | 'Unverified' | 'Inconclusive';
  execution_notes?: string;
}

export interface Finding {
  id: string;
  assessment_id: string;
  target_name?: string;
  title: string;
  severity: Severity;
  category: string;
  affected_component: string;
  description: string;
  business_impact?: string;
  security_impact?: string;
  remediation_recommendation: string;
  remediation_status: RemediationStatus;
  cvss_score: number;
  cvss_vector?: string;
  epss_score: number;
  epss_percentile: number;
  cisa_kev: boolean;
  cve_id?: string;
  cwe_id?: string;
  detected_at: string;
  is_demo?: boolean;
  evidence?: FindingEvidence[];
  poc_results?: PocResult[];
}

export interface ApiEndpoint {
  id: string;
  target_id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  authentication_required: boolean;
  parameters_summary?: string[];
  risk_level: 'Low' | 'Medium' | 'High';
  status_code: number;
  last_seen: string;
}

export interface AuditLogItem {
  id: string;
  actor_email: string;
  action: string;
  target_name?: string;
  details?: Record<string, any>;
  ip_address?: string;
  timestamp: string;
}

export interface ReportItem {
  id: string;
  assessment_id: string;
  report_title: string;
  format: 'PDF' | 'JSON' | 'CSV';
  executive_summary: string;
  metrics_summary: {
    total_findings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    risk_score: number;
    risk_level: string;
  };
  generated_at: string;
  target_title?: string;
}

export interface DashboardSummaryData {
  total_assessments: number;
  active_scans: number;
  open_findings: number;
  critical_findings: number;
  high_findings: number;
  resolved_findings: number;
  security_posture_score: number;
  risk_level: string;
  risk_distribution: Record<string, number>;
  findings_trend: Array<{ date: string; critical: number; high: number; medium: number }>;
  coverage_matrix: Record<string, { passed: number; failed: number; warnings: number }>;
}
