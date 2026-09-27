import httpx
import logging
from typing import List, Dict, Any, Optional
from backend.app.config import settings

logger = logging.getLogger(__name__)

class ZapWorker:
    def __init__(self, proxy_url: str = settings.ZAP_PROXY_URL, api_key: str = settings.ZAP_API_KEY):
        self.proxy_url = proxy_url.rstrip("/")
        self.api_key = api_key
        self.client = httpx.AsyncClient(timeout=10.0)

    async def is_zap_available(self) -> bool:
        if not settings.ZAP_ENABLED:
            return False
        try:
            resp = await self.client.get(f"{self.proxy_url}/JSON/core/view/version/", params={"apikey": self.api_key})
            return resp.status_code == 200
        except Exception:
            return False

    async def run_spider(self, target_url: str) -> Optional[str]:
        """Triggers OWASP ZAP spider on authorized target"""
        if not await self.is_zap_available():
            return None
        try:
            resp = await self.client.get(
                f"{self.proxy_url}/JSON/spider/action/scan/",
                params={"apikey": self.api_key, "url": target_url, "recurse": "true"}
            )
            data = resp.json()
            return data.get("scan")
        except Exception as e:
            logger.warning(f"ZAP spider error: {e}")
            return None

    async def retrieve_alerts(self, target_url: str) -> List[Dict[str, Any]]:
        """Retrieves and normalizes ZAP security alerts"""
        if not await self.is_zap_available():
            return []
        try:
            resp = await self.client.get(
                f"{self.proxy_url}/JSON/alert/view/alertsByRisk/",
                params={"apikey": self.api_key, "url": target_url}
            )
            data = resp.json()
            alerts = []
            for item in data.get("alertsByRisk", []):
                for alert in item.get("alerts", []):
                    risk_desc = alert.get("risk", "Low")
                    alerts.append({
                        "title": alert.get("name", "ZAP Finding"),
                        "severity": risk_desc if risk_desc in ["Critical", "High", "Medium", "Low", "Informational"] else "Medium",
                        "category": alert.get("cweid", "Web Security"),
                        "affected_component": alert.get("url", target_url),
                        "description": alert.get("description", "Vulnerability detected by OWASP ZAP automated scanner."),
                        "remediation_recommendation": alert.get("solution", "Review alert and apply secure coding controls."),
                        "cwe_id": f"CWE-{alert.get('cweid')}" if alert.get("cweid") else None,
                        "evidence_type": "ZAP Automated Alert",
                        "safe_poc": f"Evidence: {alert.get('evidence', 'Observed in passive inspection')}"
                    })
            return alerts
        except Exception as e:
            logger.warning(f"Failed to fetch ZAP alerts: {e}")
            return []

    async def close(self):
        await self.client.aclose()

zap_worker = ZapWorker()
