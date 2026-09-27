from fastapi import APIRouter, Response, Request
from fastapi.responses import HTMLResponse, JSONResponse

router = APIRouter(prefix="/lab", tags=["Local Security Lab"])

@router.get("/status")
def lab_status():
    return {
        "lab_name": "World Monitor Test Environment (Controlled Security Lab)",
        "authorized_by": "NTRO / Ministry of Education Innovation Cell (MIC)",
        "problem_statement": "SIH26163",
        "mode": "ISOLATED_TESTING_ONLY",
        "description": "Safe simulated microservices representing World Monitor for authorized assessment demonstration."
    }

@router.get("/headers-test")
def lab_headers_test(response: Response):
    # Simulated vulnerable headers (missing CSP, HSTS, X-Content-Type-Options)
    response.headers["Server"] = "WorldMonitor-AppGateway/1.9.4-rc2"
    response.headers["X-Powered-By"] = "FastAPI/0.110"
    return {"status": "ok", "message": "Headers returned without CSP or HSTS"}

@router.get("/cookie-test")
def lab_cookie_test(response: Response):
    # Simulated cookie missing HttpOnly and Secure flags
    response.headers["Set-Cookie"] = "wm_auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/"
    return {"status": "session_issued", "message": "Session cookie issued with missing security flags"}

@router.get("/cors-test")
def lab_cors_test(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return {"data": "Protected World Monitor Telemetry Stream", "classification": "RESTRICTED"}

@router.get("/reflect-test", response_class=HTMLResponse)
def lab_reflect_test(secmon_test: str = "default"):
    # Safe parameter reflection without HTML entity encoding
    return f"""
    <!DOCTYPE html>
    <html>
      <head><title>World Monitor Portal Search</title></head>
      <body>
        <h2>Search Results for query:</h2>
        <div id="results">{secmon_test}</div>
      </body>
    </html>
    """
