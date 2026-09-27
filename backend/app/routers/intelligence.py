from fastapi import APIRouter, HTTPException
from security_engine.intelligence import intel_service
from backend.app.schemas.schemas import CveIntelligenceResponse

router = APIRouter(prefix="/intelligence", tags=["Threat Intelligence"])

@router.get("/cve/{cve_id}", response_model=CveIntelligenceResponse)
async def get_cve_intel(cve_id: str):
    data = await intel_service.get_cve_details(cve_id)
    return data

@router.get("/epss/{cve_id}")
async def get_epss_data(cve_id: str):
    data = await intel_service.fetch_epss(cve_id)
    return {"cve_id": cve_id, "epss": data.get("epss"), "percentile": data.get("percentile")}

@router.get("/kev/{cve_id}")
async def check_kev_status(cve_id: str):
    data = await intel_service.get_cve_details(cve_id)
    return {
        "cve_id": cve_id,
        "in_cisa_kev": data.get("in_cisa_kev", False),
        "date_added": data.get("kev_date_added")
    }
