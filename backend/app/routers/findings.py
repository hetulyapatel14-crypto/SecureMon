from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database import get_db
from backend.app.models.models import Finding, FindingEvidence, PocResult, Assessment, Target, AuditLog
from backend.app.schemas.schemas import FindingStatusUpdate

router = APIRouter(prefix="/findings", tags=["Findings"])

@router.get("")
def list_findings(
    severity: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    assessment_id: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Finding)

    if severity:
        query = query.filter(Finding.severity == severity)
    if category:
        query = query.filter(Finding.category == category)
    if status:
        query = query.filter(Finding.remediation_status == status)
    if assessment_id:
        query = query.filter(Finding.assessment_id == assessment_id)
    if search:
        query = query.filter(Finding.title.ilike(f"%{search}%") | Finding.description.ilike(f"%{search}%"))

    findings = query.order_by(Finding.cvss_score.desc()).all()
    results = []
    for f in findings:
        assessment = db.query(Assessment).filter(Assessment.id == f.assessment_id).first()
        target_name = "Target Application"
        if assessment:
            target = db.query(Target).filter(Target.id == assessment.target_id).first()
            if target:
                target_name = target.name

        results.append({
            "id": f.id,
            "assessment_id": f.assessment_id,
            "target_name": target_name,
            "title": f.title,
            "severity": f.severity,
            "category": f.category,
            "affected_component": f.affected_component,
            "description": f.description,
            "business_impact": f.business_impact,
            "security_impact": f.security_impact,
            "remediation_recommendation": f.remediation_recommendation,
            "remediation_status": f.remediation_status,
            "cvss_score": f.cvss_score,
            "cvss_vector": f.cvss_vector,
            "epss_score": f.epss_score,
            "epss_percentile": f.epss_percentile,
            "cisa_kev": f.cisa_kev,
            "cve_id": f.cve_id,
            "cwe_id": f.cwe_id,
            "detected_at": f.detected_at,
            "is_demo": f.is_demo
        })
    return results

@router.get("/{finding_id}")
def get_finding_detail(finding_id: str, db: Session = Depends(get_db)):
    finding = db.query(Finding).filter(Finding.id == finding_id).first()
    if not finding:
        raise HTTPException(status_code=404, detail="Finding not found")

    evidence = db.query(FindingEvidence).filter(FindingEvidence.finding_id == finding_id).all()
    poc = db.query(PocResult).filter(PocResult.finding_id == finding_id).first()
    assessment = db.query(Assessment).filter(Assessment.id == finding.assessment_id).first()

    return {
        "finding": finding,
        "evidence": evidence,
        "poc": poc,
        "assessment": assessment
    }

@router.patch("/{finding_id}")
def update_remediation_status(
    finding_id: str,
    payload: FindingStatusUpdate,
    db: Session = Depends(get_db)
):
    finding = db.query(Finding).filter(Finding.id == finding_id).first()
    if not finding:
        raise HTTPException(status_code=404, detail="Finding not found")

    old_status = finding.remediation_status
    finding.remediation_status = payload.remediation_status

    audit = AuditLog(
        actor_email="analyst@securemon.gov.in",
        action="FINDING_STATUS_UPDATED",
        target_name=finding.title,
        details={"finding_id": finding.id, "from": old_status, "to": payload.remediation_status}
    )
    db.add(audit)
    db.commit()
    db.refresh(finding)

    return {"message": "Status updated", "remediation_status": finding.remediation_status}
