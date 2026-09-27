from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from backend.app.database import get_db
from backend.app.models.models import Target, TargetScope, Authorization, AuditLog, User
from backend.app.schemas.schemas import TargetCreate, TargetResponse
from backend.app.security.jwt_auth import get_current_user
from backend.app.security.ssrf_guard import validate_target_url

router = APIRouter(prefix="/targets", tags=["Targets & Scope"])

@router.get("", response_model=List[TargetResponse])
def list_targets(db: Session = Depends(get_db)):
    targets = db.query(Target).order_by(Target.created_at.desc()).all()
    return targets

@router.post("", response_model=TargetResponse)
def create_target(
    payload: TargetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Enforce Mandatory Authorization Confirmation
    if not payload.authorization.is_confirmed or not payload.authorization.legal_disclaimer_accepted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mandatory Authorization Confirmation Required: Assessments cannot be registered without explicit legal confirmation."
        )

    # 2. SSRF Protection & Target Validation
    is_safe, msg = validate_target_url(payload.base_url)
    if not is_safe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Target Security Violation: {msg}"
        )

    # Create Target Record
    target = Target(
        name=payload.name,
        base_url=payload.base_url,
        environment=payload.environment,
        owner=payload.owner,
        description=payload.description,
        is_verified=True
    )
    db.add(target)
    db.flush()

    # Scope configuration
    scope = TargetScope(
        target_id=target.id,
        allowed_domains=payload.scope.allowed_domains or [payload.base_url],
        allowed_api_paths=payload.scope.allowed_api_paths or ["/api/*"],
        excluded_paths=payload.scope.excluded_paths or []
    )
    db.add(scope)

    # Authorization record
    auth = Authorization(
        target_id=target.id,
        auth_reference_code=payload.authorization.auth_reference_code,
        confirmed_by=payload.authorization.confirmed_by or (current_user.email if current_user else "Analyst"),
        is_confirmed=True,
        authorized_to=payload.authorization.authorized_to,
        legal_disclaimer_accepted=True,
        notes=payload.authorization.notes
    )
    db.add(auth)

    # Immutable Audit Log Entry
    audit = AuditLog(
        user_id=current_user.id if current_user else None,
        actor_email=current_user.email if current_user else "analyst@securemon.gov.in",
        action="TARGET_REGISTERED_AND_AUTHORIZED",
        target_name=target.name,
        details={
            "target_id": target.id,
            "url": target.base_url,
            "auth_ref": auth.auth_reference_code,
            "scope_domains": scope.allowed_domains
        }
    )
    db.add(audit)
    db.commit()
    db.refresh(target)

    return target

@router.get("/{target_id}")
def get_target_details(target_id: str, db: Session = Depends(get_db)):
    target = db.query(Target).filter(Target.id == target_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target not found")
    
    scope = db.query(TargetScope).filter(TargetScope.target_id == target_id).first()
    auth = db.query(Authorization).filter(Authorization.target_id == target_id).first()

    return {
        "target": target,
        "scope": scope,
        "authorization": auth
    }
