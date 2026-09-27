import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_dashboard_summary():
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "security_posture_score" in data
    assert "risk_distribution" in data

def test_list_targets():
    response = client.get("/api/targets")
    assert response.status_code == 200
    targets = response.json()
    assert len(targets) > 0

def test_list_findings():
    response = client.get("/api/findings")
    assert response.status_code == 200
    findings = response.json()
    assert len(findings) > 0
