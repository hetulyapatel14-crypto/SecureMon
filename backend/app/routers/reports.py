from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from backend.app.database import get_db
from backend.app.models.models import Report, Assessment, Target, Finding, Authorization, AuditLog
from backend.app.schemas.schemas import ReportCreate

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("")
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.generated_at.desc()).all()
    results = []
    for r in reports:
        assessment = db.query(Assessment).filter(Assessment.id == r.assessment_id).first()
        results.append({
            "id": r.id,
            "assessment_id": r.assessment_id,
            "report_title": r.report_title,
            "format": r.format,
            "executive_summary": r.executive_summary,
            "metrics_summary": r.metrics_summary,
            "generated_at": r.generated_at,
            "target_title": assessment.title if assessment else "World Monitor Assessment"
        })
    return results

@router.post("")
def generate_report(payload: ReportCreate, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == payload.assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    target = db.query(Target).filter(Target.id == assessment.target_id).first()
    findings = db.query(Finding).filter(Finding.assessment_id == assessment.id).all()
    auth = db.query(Authorization).filter(Authorization.target_id == target.id).first() if target else None

    crit_count = sum(1 for f in findings if f.severity == "Critical")
    high_count = sum(1 for f in findings if f.severity == "High")
    med_count = sum(1 for f in findings if f.severity == "Medium")
    low_count = sum(1 for f in findings if f.severity == "Low")

    exec_summary = (
        f"This official security assessment report documents the evaluation of '{target.name if target else 'Target'}' "
        f"conducted under authorized scope '{auth.auth_reference_code if auth else 'NTRO-MIC-2026'}'. "
        f"A total of {len(findings)} findings were identified ({crit_count} Critical, {high_count} High, {med_count} Medium, {low_count} Low). "
        f"Immediate remediation is recommended for high-priority exposure points."
    )

    report = Report(
        assessment_id=assessment.id,
        report_title=payload.report_title or f"Executive Assessment Report - {target.name if target else 'World Monitor'}",
        format=payload.format or "PDF",
        executive_summary=exec_summary,
        metrics_summary={
            "total_findings": len(findings),
            "critical": crit_count,
            "high": high_count,
            "medium": med_count,
            "low": low_count,
            "risk_score": assessment.risk_score,
            "risk_level": assessment.risk_level
        }
    )
    db.add(report)

    audit = AuditLog(
        actor_email="analyst@securemon.gov.in",
        action="REPORT_GENERATED",
        target_name=target.name if target else "Assessment Target",
        details={"report_id": report.id, "format": report.format}
    )
    db.add(audit)
    db.commit()
    db.refresh(report)

    return report

@router.get("/{report_id}/export")
def export_report_full(report_id: str, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    assessment = db.query(Assessment).filter(Assessment.id == report.assessment_id).first()
    target = db.query(Target).filter(Target.id == assessment.target_id).first() if assessment else None
    findings = db.query(Finding).filter(Finding.assessment_id == assessment.id).all() if assessment else []
    auth = db.query(Authorization).filter(Authorization.target_id == target.id).first() if target else None

    return {
        "report": report,
        "assessment": assessment,
        "target": target,
        "authorization": auth,
        "findings": findings
    }
