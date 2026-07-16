from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.dependencies import get_request_context
from app.schemas.auth import RequestContext
from app.schemas.scan import (
    BarcodeScanRequest,
    OcrScanRequest,
    ScanHistoryResponse,
    ScanResponse,
)

router = APIRouter()


@router.post("/barcode", response_model=ScanResponse)
async def create_barcode_scan(
    payload: BarcodeScanRequest,
    request_context: Annotated[RequestContext, Depends(get_request_context)],
) -> ScanResponse:
    return ScanResponse.from_foundation(
        scan_id=payload.client_scan_id or "barcode-foundation-scan",
        source="barcode",
    )


@router.post("/ocr", response_model=ScanResponse)
async def create_ocr_scan(
    payload: OcrScanRequest,
    request_context: Annotated[RequestContext, Depends(get_request_context)],
) -> ScanResponse:
    return ScanResponse.from_foundation(
        scan_id=payload.client_scan_id or "ocr-foundation-scan",
        source="ocr",
    )


@router.get("/history", response_model=ScanHistoryResponse)
async def get_scan_history(
    request_context: Annotated[RequestContext, Depends(get_request_context)],
) -> ScanHistoryResponse:
    return ScanHistoryResponse(items=[])
