from pydantic import BaseModel

from app.schemas.personalization import LifestyleSignal, NutritionFacts, ProductIngredient


class BarcodeScanRequest(BaseModel):
    barcode: str
    client_scan_id: str | None = None


class OcrScanRequest(BaseModel):
    ocr_text: str
    product_name_hint: str | None = None
    client_scan_id: str | None = None


class AnalysisSummary(BaseModel):
    summary: str
    health_score: int | None
    reason_highlights: list[str]
    healthier_alternatives: list[str]
    personalization_applied: list[LifestyleSignal]


class ProductContext(BaseModel):
    product_name: str | None = None
    ingredients: list[ProductIngredient]
    nutrition_facts: NutritionFacts | None = None


class ScanResponse(BaseModel):
    scan_id: str
    source: str
    product: ProductContext
    analysis: AnalysisSummary

    @classmethod
    def from_foundation(cls, scan_id: str, source: str) -> "ScanResponse":
        return cls(
            scan_id=scan_id,
            source=source,
            product=ProductContext(
                product_name=None,
                ingredients=[],
                nutrition_facts=None,
            ),
            analysis=AnalysisSummary(
                summary="Foundation response created. Personalized analysis will be generated from structured lifestyle and nutrition context in the next implementation phase.",
                health_score=None,
                reason_highlights=[
                    "Lifestyle-aware API contract established",
                    "Health-goal context reserved for AI prompts",
                    "Product nutrition context boundary prepared",
                ],
                healthier_alternatives=[],
                personalization_applied=[],
            ),
        )


class ScanHistoryItem(BaseModel):
    scan_id: str
    source: str
    created_at: str


class ScanHistoryResponse(BaseModel):
    items: list[ScanHistoryItem]
