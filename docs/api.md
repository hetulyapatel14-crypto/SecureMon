# SecureMon — REST API Specification

**Base URL:** `http://localhost:8000/api`  
**Interactive Swagger UI:** `http://localhost:8000/api/docs`  

---

## 1. Authentication Endpoints

- `POST /api/auth/register`: Register new security evaluator account.
- `POST /api/auth/login`: Authenticate and receive JWT access & refresh tokens.
- `GET /api/auth/me`: Retrieve current operator profile and RBAC role.

## 2. Target Management

- `GET /api/targets`: List all registered assessment targets.
- `POST /api/targets`: Register authorized target with scope boundaries and legal confirmation.
- `GET /api/targets/{id}`: Detailed target scope and authorization records.

## 3. Assessments & Scanning

- `GET /api/assessments`: List assessment history and current statuses.
- `POST /api/assessments`: Create new assessment draft.
- `POST /api/assessments/{id}/start`: Enqueue background worker to execute assessment.
- `GET /api/assessments/{id}`: Retrieve real-time progress percentage and current scan phase.

## 4. Findings & Evidence

- `GET /api/findings`: List findings filtered by severity (`Critical`, `High`, `Medium`, `Low`), category, or status.
- `GET /api/findings/{id}`: Retrieve detailed finding with all 16 technical sections, CVSS vectors, and sanitized evidence.
- `PATCH /api/findings/{id}`: Update remediation status (`Open`, `In Progress`, `Resolved`, `Accepted Risk`).

## 5. Threat Intelligence

- `GET /api/intelligence/cve/{cve_id}`: Query NIST NVD 2.0 metadata with local caching.
- `GET /api/intelligence/epss/{cve_id}`: Query FIRST EPSS exploit probability percentile.
- `GET /api/intelligence/kev/{cve_id}`: Check if vulnerability is cataloged in CISA KEV.

## 6. Dashboard & Telemetry

- `GET /api/dashboard/summary`: Aggregated security posture score, risk distribution, trends, and coverage matrix.

## 7. Reports & Audit

- `GET /api/reports`: List generated executive assessment reports.
- `POST /api/reports`: Generate new executive report (JSON, PDF, CSV).
- `GET /api/reports/{id}/export`: Export full structured report payload.
- `GET /api/audit-logs`: Query append-only tamper-resistant audit trail.

## 8. Controlled Security Lab

- `GET /api/lab/status`: Verify local training environment health.
- `GET /api/lab/cors-test`: Simulated CORS wildcard endpoint.
- `GET /api/lab/headers-test`: Simulated missing headers endpoint.
- `GET /api/lab/cookie-test`: Simulated unprotected cookie endpoint.
- `GET /api/lab/reflect-test?secmon_test=...`: Safe parameter reflection sink.
