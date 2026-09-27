from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from backend.app.database import get_db
from backend.app.models.models import AuditLog

router = APIRouter(prefix="/audit-logs", tags=["Audit Trail"])

@router.get("")
def get_audit_trail(limit: int = 50, db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit).all()
    return logs
