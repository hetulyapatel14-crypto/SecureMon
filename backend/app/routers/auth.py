from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from backend.app.database import get_db
from backend.app.models.models import User, AuditLog
from backend.app.schemas.schemas import UserRegister, UserLogin, TokenResponse
from backend.app.security.jwt_auth import verify_password, get_password_hash, create_access_token, create_refresh_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this official email already exists."
        )

    user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        full_name=payload.full_name,
        role=payload.role or "SECURITY_ANALYST",
        organization=payload.organization or "National Technical Research Organisation (NTRO)"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Log audit event
    audit = AuditLog(
        user_id=user.id,
        actor_email=user.email,
        action="USER_REGISTERED",
        details={"role": user.role, "organization": user.organization}
    )
    db.add(audit)
    db.commit()

    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(data={"sub": user.id})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "organization": user.organization
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Access rejected."
        )

    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(data={"sub": user.id})

    # Record login in audit log
    audit = AuditLog(
        user_id=user.id,
        actor_email=user.email,
        action="USER_LOGIN_SUCCESS",
        details={"timestamp": str(datetime.utcnow())}
    )
    db.add(audit)
    db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "organization": user.organization
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    if not current_user:
        return {
            "id": "demo-analyst-id",
            "email": "analyst@securemon.gov.in",
            "full_name": "Senior Security Analyst",
            "role": "SECURITY_ANALYST",
            "organization": "National Technical Research Organisation (NTRO)"
        }
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "organization": current_user.organization
    }
