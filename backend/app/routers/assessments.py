import asyncio
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from backend.app.database import get_db, SessionLocal
from backend.app.models.models import (
    Assessment, Target, Authorization, Finding, FindingEvidence, PocResult, AuditLog, User
)
from backend.app.schemas.schemas import AssessmentCreate, AssessmentResponse
from backend.app.security.jwt_auth import get_current_user
from security_engine.engine import assessment_engine

router = APIRouter(prefix="/assessments", tags=["Assessments"])

async def run_scan_worker(assessment_id: str):
    """Background asynchronous assessment worker task"""
    db = SessionLocal()
    try:
        assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
        if not assessment:
            return

        target = db.query(Target).filter(Target.id == assessment.target_id).first()
        if not target:
            assessment.status = "Failed"
            db.commit()
            return

        assessment.status = "Running"
        assessment.started_at = datetime.utcnow()
        assessment.progress = 10
        assessment.current_phase = "Verifying Target Scope & SSRF Guard"
        db.commit()

        async def on_progress(percent: int, phase: str):
            # update in memory / db periodically
            assessment.progress = percent
            assessment.current_phase = phase
            db.commit()

        results = await assessment_engine.execute_assessment(
            target_url=target.base_url,
            profile=assessment.profile,
            progress_callback=on_progress
        )

        # Persist findings and evidence
        for f_data in results["findings"]:
            finding = Finding(
                assessment_id=assessment.id,
                title=f_data["title"],
                severity=f_data["severity"],
                category=f_data["category"],
                affected_component=f_data["affected_component"],
                description=f_data["description"],
                business_impact=f_data.get("business_impact"),
                security_impact=f_data.get("security_impact"),
                remediation_recommendation=f_data["remediation_recommendation"],
                remediation_status="Open",
                cvss_score=f_data.get("cvss_score", 5.0),
                cvss_vector=f_data.get("cvss_vector"),
                epss_score=f_data.get("epss_score", 0.0),
                epss_percentile=f_data.get("epss_percentile", 0.0),
                cisa_kev=f_data.get("cisa_kev", False),
                cve_id=f_data.get("cve_id"),
                cwe_id=f_data.get("cwe_id"),
                is_demo=False
            )
            db.add(finding)
            db.flush()

            # Technical Evidence
            evidence = FindingEvidence(
                finding_id=finding.id,
                evidence_type=f_data.get("evidence_type", "Automated Inspection"),
                response_headers=f_data.get("evidence_headers", {}),
                extracted_snippet=f_data.get("evidence_snippet")
            )
            db.add(evidence)

            # Safe PoC
            poc = PocResult(
                finding_id=finding.id,
                poc_type=f_data.get("evidence_type", "Harmless Safe Verification"),
                reproduction_steps=f_data.get("reproduction_steps", []),
                safe_payload=f_data.get("safe_poc"),
                status="Verified",
                execution_notes="Executed safely in isolated assessment scope without destructive actions."
            )
            db.add(poc)

        assessment.status = "Completed"
        assessment.progress = 100
        assessment.current_phase = "Assessment Finalized"
        assessment.completed_at = datetime.utcnow()
        assessment.duration_seconds = int((assessment.completed_at - assessment.started_at).total_seconds())
        assessment.risk_score = results["risk_score"]
        assessment.risk_level = results["risk_level"]

        # Audit log entry
        audit = AuditLog(
            user_id=assessment.created_by,
            actor_email="system.worker@securemon.gov.in",
            action="ASSESSMENT_COMPLETED",
            target_name=target.name,
            details={
                "assessment_id": assessment.id,
                "findings_count": len(results["findings"]),
                "risk_score": results["risk_score"],
                "risk_level": results["risk_level"]
            }
        )
        db.add(audit)
        db.commit()

    except Exception as e:
        assessment.status = "Failed"
        assessment.current_phase = f"Failed: {str(e)}"
        db.commit()
    finally:
        db.close()

@router.get("", response_model=List[AssessmentResponse])
def list_assessments(db: Session = Depends(get_db)):
    assessments = db.query(Assessment).order_by(Assessment.created_at.desc()).all()
    results = []
    for a in assessments:
        target = db.query(Target).filter(Target.id == a.target_id).first()
        count = db.query(Finding).filter(Finding.assessment_id == a.id).count()
        results.append({
            "id": a.id,
            "target_id": a.target_id,
            "title": a.title,
            "profile": a.profile,
            "status": a.status,
            "progress": a.progress,
            "current_phase": a.current_phase,
            "risk_score": a.risk_score,
            "risk_level": a.risk_level,
            "started_at": a.started_at,
            "completed_at": a.completed_at,
            "duration_seconds": a.duration_seconds,
            "target_name": target.name if target else "Unknown Target",
            "findings_count": count
        })
    return results

@router.post("", response_model=AssessmentResponse)
def create_assessment(
    payload: AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    target = db.query(Target).filter(Target.id == payload.target_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target not found")

    auth = db.query(Authorization).filter(Authorization.target_id == target.id).first()
    if not auth or not auth.is_confirmed:
        raise HTTPException(
            status_code=400,
            detail="Target lacks confirmed legal authorization. Assessment cannot be initiated."
        )

    assessment = Assessment(
        target_id=target.id,
        created_by=current_user.id if current_user else None,
        title=payload.title,
        profile=payload.profile or "SAFE",
        status="Authorized",
        progress=0,
        current_phase="Ready for Execution"
    )
    db.add(assessment)
    db.flush()

    audit = AuditLog(
        user_id=current_user.id if current_user else None,
        actor_email=current_user.email if current_user else "analyst@securemon.gov.in",
        action="ASSESSMENT_CREATED",
        target_name=target.name,
        details={"assessment_id": assessment.id, "profile": assessment.profile}
    )
    db.add(audit)
    db.commit()
    db.refresh(assessment)

    return {
        "id": assessment.id,
        "target_id": assessment.target_id,
        "title": assessment.title,
        "profile": assessment.profile,
        "status": assessment.status,
        "progress": assessment.progress,
        "current_phase": assessment.current_phase,
        "risk_score": assessment.risk_score,
        "risk_level": assessment.risk_level,
        "started_at": assessment.started_at,
        "completed_at": assessment.completed_at,
        "duration_seconds": assessment.duration_seconds,
        "target_name": target.name,
        "findings_count": 0
    }

@router.post("/{assessment_id}/start")
async def start_assessment(
    assessment_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    if assessment.status in ["Running", "Completed"]:
        return {"message": f"Assessment is already {assessment.status}", "status": assessment.status}

    assessment.status = "Queued"
    assessment.current_phase = "Enqueued for worker execution"
    db.commit()

    background_tasks.add_task(run_scan_worker, assessment.id)

    return {"message": "Security assessment worker started", "assessment_id": assessment.id, "status": "Queued"}

@router.get("/{assessment_id}")
def get_assessment(assessment_id: str, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    target = db.query(Target).filter(Target.id == assessment.target_id).first()
    findings = db.query(Finding).filter(Finding.assessment_id == assessment_id).all()

    return {
        "assessment": assessment,
        "target": target,
        "findings": findings,
        "findings_count": len(findings)
    }
