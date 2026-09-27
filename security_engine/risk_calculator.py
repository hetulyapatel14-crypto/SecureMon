from typing import Dict, Any, Tuple

def calculate_risk(
    cvss_base: float,
    epss_score: float = 0.0,
    in_cisa_kev: bool = False,
    asset_criticality: str = "High",
    confidence: float = 0.95
) -> Dict[str, Any]:
    """
    Computes a transparent, defensible composite risk score (0 - 100)
    combining CVSS v3.1, EPSS exploit probability, CISA KEV presence,
    and asset context.
    """
    criticality_multipliers = {
        "Critical": 1.25,
        "High": 1.0,
        "Medium": 0.8,
        "Low": 0.6
    }
    crit_mult = criticality_multipliers.get(asset_criticality, 1.0)
    
    # Base risk derived from CVSS (0-10) scaled to 0-70
    base_points = (cvss_base / 10.0) * 70.0
    
    # EPSS points (0.0 to 1.0) scaled to 0-15
    epss_points = epss_score * 15.0
    
    # CISA KEV presence adds a critical exploitation premium (+15 points)
    kev_points = 15.0 if in_cisa_kev else 0.0
    
    # Total calculation with asset multiplier and confidence
    calculated_raw = (base_points + epss_points + kev_points) * crit_mult * confidence
    final_score = round(min(max(calculated_raw, 0.0), 100.0), 1)
    
    # Determine risk category
    if final_score >= 85.0:
        level = "Critical"
    elif final_score >= 70.0:
        level = "High"
    elif final_score >= 40.0:
        level = "Medium"
    elif final_score >= 15.0:
        level = "Low"
    else:
        level = "Info"

    explanation = (
        f"Base CVSS {cvss_base}/10 contributed {round(base_points, 1)} pts. "
        f"EPSS score {epss_score} contributed {round(epss_points, 1)} pts. "
        + (f"Active inclusion in CISA KEV added +{kev_points} pts urgency bonus. " if in_cisa_kev else "CVE not listed in CISA KEV. ")
        + f"Asset criticality ({asset_criticality}) applied factor {crit_mult}x."
    )

    return {
        "final_score": final_score,
        "risk_level": level,
        "explanation": explanation,
        "components": {
            "cvss_base": cvss_base,
            "epss_points": round(epss_points, 1),
            "kev_points": kev_points,
            "asset_factor": crit_mult,
            "confidence": confidence
        }
    }
