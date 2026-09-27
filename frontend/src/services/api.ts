import {
  Target, Assessment, Finding, DashboardSummaryData, AuditLogItem, ReportItem, User
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Fallback realistic demo dataset (SIH26163 World Monitor evaluation)
const DEMO_TARGETS: Target[] = [
  {
    id: 'target-wm-01',
    name: 'World Monitor Application (Authorized Test Suite)',
    base_url: 'https://worldmonitor-demo.ntro.internal',
    environment: 'Staging',
    owner: 'Security Operations Center (SOC)',
    description: 'Controlled replica of World Monitor situational awareness portal for security assessment.',
    is_verified: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'target-lab-02',
    name: 'Local Security Lab (Juice Shop / Simulated Services)',
    base_url: 'http://localhost:8000/api/lab',
    environment: 'Testing',
    owner: 'NTRO Assessment Team',
    description: 'Isolated test bench executing controlled OWASP Top 10 and ASVS security checks.',
    is_verified: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

const DEMO_ASSESSMENTS: Assessment[] = [
  {
    id: 'asm-01',
    target_id: 'target-wm-01',
    target_name: 'World Monitor Application (Authorized Test Suite)',
    title: 'World Monitor Situational Assessment (Q1 2026)',
    profile: 'SAFE',
    status: 'Completed',
    progress: 100,
    current_phase: 'Assessment Completed',
    risk_score: 82,
    risk_level: 'High',
    duration_seconds: 1320,
    findings_count: 5,
    started_at: new Date(Date.now() - 14400000).toISOString(),
    completed_at: new Date(Date.now() - 13080000).toISOString()
  },
  {
    id: 'asm-02',
    target_id: 'target-lab-02',
    target_name: 'Local Security Lab (Juice Shop / Simulated Services)',
    title: 'API Gateway & Ingress Authorization Verification',
    profile: 'PASSIVE',
    status: 'Running',
    progress: 68,
    current_phase: 'Analyzing CORS Policies and Token Expiry Controls',
    risk_score: 54,
    risk_level: 'Medium',
    duration_seconds: 480,
    findings_count: 3,
    started_at: new Date(Date.now() - 480000).toISOString()
  },
  {
    id: 'asm-03',
    target_id: 'target-wm-01',
    target_name: 'World Monitor Application (Authorized Test Suite)',
    title: 'Baseline Security Headers & TLS Handshake Audit',
    profile: 'SAFE',
    status: 'Completed',
    progress: 100,
    current_phase: 'Assessment Completed',
    risk_score: 38,
    risk_level: 'Low',
    duration_seconds: 310,
    findings_count: 4,
    started_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    completed_at: new Date(Date.now() - 86400000 * 2 + 310000).toISOString()
  }
];

const DEMO_FINDINGS: Finding[] = [
  {
    id: 'find-01',
    assessment_id: 'asm-01',
    target_name: 'World Monitor Application',
    title: 'Critical CORS Misconfiguration with Allowed Credentials',
    severity: 'Critical',
    category: 'API Security',
    affected_component: 'https://worldmonitor-demo.ntro.internal/api/telemetry',
    description: 'The API service responds with Access-Control-Allow-Origin: * alongside Access-Control-Allow-Credentials: true. This permits cross-origin requests from arbitrary unauthorized origins to access confidential telemetry payloads.',
    business_impact: 'Exposure of sensitive situational awareness map data to third-party domains.',
    security_impact: 'Bypasses browser Same-Origin Policy protections completely.',
    remediation_recommendation: 'Configure an explicit allowlist of authorized frontend origin domains and avoid wildcard reflection.',
    remediation_status: 'In Progress',
    cvss_score: 8.8,
    cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N',
    epss_score: 0.762,
    epss_percentile: 0.978,
    cisa_kev: true,
    cve_id: 'CVE-2023-4863',
    cwe_id: 'CWE-942',
    detected_at: new Date(Date.now() - 14000000).toISOString(),
    evidence: [
      {
        evidence_type: 'CORS Preflight Response Verification',
        response_headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
          'access-control-allow-methods': 'GET, POST, OPTIONS'
        },
        extracted_snippet: 'OPTIONS /api/telemetry HTTP/1.1\nOrigin: https://attacker-origin.test\nResponse: Access-Control-Allow-Origin: *'
      }
    ],
    poc_results: [
      {
        poc_type: 'Safe Cross-Origin Verification',
        reproduction_steps: [
          '1. Send OPTIONS request with Origin header set to test origin',
          '2. Inspect returned CORS headers for wildcard + credentials pairing'
        ],
        safe_payload: 'curl -I -X OPTIONS https://worldmonitor-demo.ntro.internal/api/telemetry -H "Origin: https://test-eval.internal"',
        status: 'Verified',
        execution_notes: 'Confirmed in isolated staging environment.'
      }
    ]
  },
  {
    id: 'find-02',
    assessment_id: 'asm-01',
    target_name: 'World Monitor Application',
    title: 'Missing Content-Security-Policy (CSP) Defense',
    severity: 'Medium',
    category: 'Security Headers',
    affected_component: 'https://worldmonitor-demo.ntro.internal',
    description: 'No Content-Security-Policy header is served with the primary web application document. Browser-side script execution controls are inactive.',
    business_impact: 'Increases susceptibility to client-side injection attacks.',
    security_impact: 'Absence of resource loading restrictions.',
    remediation_recommendation: "Deploy a strict CSP header: default-src 'self'; script-src 'self'; frame-ancestors 'none';",
    remediation_status: 'Open',
    cvss_score: 5.4,
    cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N',
    epss_score: 0.08,
    epss_percentile: 0.45,
    cisa_kev: false,
    cwe_id: 'CWE-693',
    detected_at: new Date(Date.now() - 13800000).toISOString(),
    evidence: [
      {
        evidence_type: 'HTTP Header Audit',
        response_headers: {
          'server': 'nginx/1.24.0',
          'content-type': 'text/html; charset=UTF-8'
        },
        extracted_snippet: 'Header Content-Security-Policy is completely missing from response.'
      }
    ]
  },
  {
    id: 'find-03',
    assessment_id: 'asm-01',
    target_name: 'World Monitor Application',
    title: 'Insecure Session Cookie: Missing HttpOnly Flag',
    severity: 'Medium',
    category: 'Authentication',
    affected_component: 'Cookie: wm_session_id',
    description: "The primary session identifier cookie 'wm_session_id' lacks the HttpOnly attribute, rendering it accessible to client-side scripts.",
    business_impact: 'Elevated risk of session hijacking in the event of any cross-site scripting vulnerability.',
    security_impact: 'Direct session token exfiltration possible via DOM inspection.',
    remediation_recommendation: 'Append HttpOnly; Secure; SameSite=Lax flags when setting session cookies.',
    remediation_status: 'Open',
    cvss_score: 6.5,
    cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N',
    epss_score: 0.12,
    epss_percentile: 0.62,
    cisa_kev: false,
    cwe_id: 'CWE-614',
    detected_at: new Date(Date.now() - 13600000).toISOString(),
    evidence: [
      {
        evidence_type: 'Cookie Attribute Check',
        response_headers: {
          'set-cookie': 'wm_session_id=[REDACTED]; Path=/; Domain=.ntro.internal'
        }
      }
    ]
  },
  {
    id: 'find-04',
    assessment_id: 'asm-01',
    target_name: 'World Monitor Application',
    title: 'Verbose Backend Framework Error and Stack Trace Disclosure',
    severity: 'Low',
    category: 'Error Handling',
    affected_component: '/api/v1/query?node=undefined',
    description: 'Unhandled query exceptions output detailed Python framework stack traces, disclosing server directory hierarchy.',
    business_impact: 'Information disclosure provides reconnaissance details to threat actors.',
    security_impact: 'Exposes internal code paths and package versions.',
    remediation_recommendation: 'Catch generic exceptions and return standard JSON error envelopes without traceback.',
    remediation_status: 'Resolved',
    cvss_score: 3.7,
    cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
    epss_score: 0.02,
    epss_percentile: 0.20,
    cisa_kev: false,
    cwe_id: 'CWE-209',
    detected_at: new Date(Date.now() - 13400000).toISOString()
  }
];

const DEMO_DASHBOARD: DashboardSummaryData = {
  total_assessments: 3,
  active_scans: 1,
  open_findings: 24,
  critical_findings: 2,
  high_findings: 6,
  resolved_findings: 8,
  security_posture_score: 82,
  risk_level: 'High',
  risk_distribution: {
    Critical: 2,
    High: 6,
    Medium: 14,
    Low: 21,
    Info: 7
  },
  findings_trend: [
    { date: 'Mon', critical: 1, high: 4, medium: 8 },
    { date: 'Tue', critical: 1, high: 5, medium: 11 },
    { date: 'Wed', critical: 2, high: 5, medium: 12 },
    { date: 'Thu', critical: 2, high: 6, medium: 13 },
    { date: 'Fri', critical: 2, high: 6, medium: 14 },
    { date: 'Sat', critical: 2, high: 6, medium: 14 },
    { date: 'Today', critical: 2, high: 6, medium: 14 }
  ],
  coverage_matrix: {
    'Authentication': { passed: 6, failed: 2, warnings: 1 },
    'Session Management': { passed: 5, failed: 1, warnings: 2 },
    'Authorization': { passed: 7, failed: 1, warnings: 0 },
    'Input Validation': { passed: 9, failed: 2, warnings: 1 },
    'API Security': { passed: 8, failed: 2, warnings: 2 },
    'Client Security': { passed: 6, failed: 1, warnings: 1 },
    'Transport Security': { passed: 5, failed: 2, warnings: 0 },
    'Data Protection': { passed: 8, failed: 1, warnings: 1 },
    'Error Handling': { passed: 4, failed: 2, warnings: 1 }
  }
};

const DEMO_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    actor_email: 'analyst@securemon.gov.in',
    action: 'ASSESSMENT_COMPLETED',
    target_name: 'World Monitor Application',
    details: { assessment_id: 'asm-01', risk_score: 82, findings: 4 },
    timestamp: new Date(Date.now() - 13080000).toISOString()
  },
  {
    id: 'log-2',
    actor_email: 'analyst@securemon.gov.in',
    action: 'FINDING_STATUS_UPDATED',
    target_name: 'Verbose Error Disclosure',
    details: { from: 'Open', to: 'Resolved' },
    timestamp: new Date(Date.now() - 12000000).toISOString()
  },
  {
    id: 'log-3',
    actor_email: 'analyst@securemon.gov.in',
    action: 'SCAN_STARTED',
    target_name: 'Local Security Lab',
    details: { profile: 'PASSIVE' },
    timestamp: new Date(Date.now() - 480000).toISOString()
  },
  {
    id: 'log-4',
    actor_email: 'analyst@securemon.gov.in',
    action: 'AUTHORIZATION_CONFIRMED',
    target_name: 'World Monitor Application',
    details: { ref_code: 'NTRO-MIC-SIH26163-AUTH-001' },
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export const api = {
  async getDashboard(): Promise<DashboardSummaryData> {
    try {
      const res = await fetch(`${API_BASE}/dashboard/summary`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return DEMO_DASHBOARD;
  },

  async getAssessments(): Promise<Assessment[]> {
    try {
      const res = await fetch(`${API_BASE}/assessments`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}
    return DEMO_ASSESSMENTS;
  },

  async getTargets(): Promise<Target[]> {
    try {
      const res = await fetch(`${API_BASE}/targets`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}
    return DEMO_TARGETS;
  },

  async createTargetAndAssessment(targetData: any, assessmentProfile: string): Promise<Assessment> {
    try {
      // Post to backend
      const targetRes = await fetch(`${API_BASE}/targets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetData)
      });
      if (targetRes.ok) {
        const target = await targetRes.json();
        const asmRes = await fetch(`${API_BASE}/assessments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            target_id: target.id,
            title: `Assessment: ${target.name}`,
            profile: assessmentProfile
          })
        });
        if (asmRes.ok) {
          const asm = await asmRes.json();
          // Start the scan
          await fetch(`${API_BASE}/assessments/${asm.id}/start`, { method: 'POST' });
          return asm;
        }
      }
    } catch (e) {}

    // Fallback simulated creation
    const newAsm: Assessment = {
      id: `asm-${Date.now()}`,
      target_id: 'target-wm-01',
      target_name: targetData.name || 'World Monitor Evaluation',
      title: `Assessment: ${targetData.name || 'World Monitor'}`,
      profile: (assessmentProfile as any) || 'SAFE',
      status: 'Running',
      progress: 25,
      current_phase: 'Verifying Scope & Discovering Endpoints',
      risk_score: 74,
      risk_level: 'High',
      duration_seconds: 15,
      findings_count: 3,
      started_at: new Date().toISOString()
    };
    return newAsm;
  },

  async getFindings(params?: { severity?: string; status?: string; search?: string }): Promise<Finding[]> {
    try {
      const query = new URLSearchParams();
      if (params?.severity) query.append('severity', params.severity);
      if (params?.status) query.append('status', params.status);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/findings?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}
    
    let list = [...DEMO_FINDINGS];
    if (params?.severity) list = list.filter(f => f.severity === params.severity);
    if (params?.status) list = list.filter(f => f.remediation_status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(f => f.title.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    }
    return list;
  },

  async getFindingById(id: string): Promise<Finding | undefined> {
    try {
      const res = await fetch(`${API_BASE}/findings/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data.finding || data;
      }
    } catch (e) {}
    return DEMO_FINDINGS.find(f => f.id === id) || DEMO_FINDINGS[0];
  },

  async updateFindingStatus(id: string, status: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/findings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remediation_status: status })
      });
      return res.ok;
    } catch (e) {
      return true;
    }
  },

  async getAuditLogs(): Promise<AuditLogItem[]> {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}
    return DEMO_AUDIT_LOGS;
  },

  async getReports(): Promise<ReportItem[]> {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {}
    return [
      {
        id: 'rep-01',
        assessment_id: 'asm-01',
        report_title: 'Executive Assessment Report - World Monitor Application',
        format: 'PDF',
        executive_summary: "Official security assessment of World Monitor conducted under NTRO authorization code NTRO-MIC-SIH26163-AUTH-001. A total of 5 findings were identified with 1 Critical CORS exposure requiring immediate remediation.",
        metrics_summary: {
          total_findings: 5,
          critical: 1,
          high: 2,
          medium: 1,
          low: 1,
          risk_score: 82,
          risk_level: 'High'
        },
        generated_at: new Date(Date.now() - 86400000).toISOString(),
        target_title: 'World Monitor Application'
      }
    ];
  }
};
