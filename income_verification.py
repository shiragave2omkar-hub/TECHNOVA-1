import io
import re
from typing import Optional

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image

DEMO_MODE = True

router = APIRouter()

SUPPORTED_TYPES = {"image/jpeg", "image/png", "application/pdf"}
INCOME_REGEX = re.compile(r"(?:Rs\.?|₹|INR)\s*([\d,]+)", re.IGNORECASE)
LABELLED_INCOME_REGEXES = [
    re.compile(r"annual income[^0-9₹RsINR]*?(?:Rs\.?|₹|INR)?\s*([\d,]+)", re.IGNORECASE),
    re.compile(r"yearly income[^0-9₹RsINR]*?(?:Rs\.?|₹|INR)?\s*([\d,]+)", re.IGNORECASE),
    re.compile(r"वार्षिक आय[^0-9₹RsINR]*?(?:Rs\.?|₹|INR)?\s*([\d,]+)", re.IGNORECASE),
]


def demo_response() -> dict:
    return {
        "status": "verified",
        "income_detected": 180000,
        "income_formatted": "₹1,80,000",
        "category": "EWS",
        "confidence": "high",
        "raw_text_snippet": "Demo mode — OCR unavailable",
    }


def format_income(value: Optional[int]) -> Optional[str]:
    if value is None:
        return None
    number = f"{value:d}"
    if len(number) <= 3:
        return f"₹{number}"
    last_three = number[-3:]
    remaining = number[:-3]
    chunks = []
    while len(remaining) > 2:
        chunks.insert(0, remaining[-2:])
        remaining = remaining[:-2]
    if remaining:
        chunks.insert(0, remaining)
    return f"₹{','.join(chunks + [last_three])}"


def extract_income(text: str) -> Optional[int]:
    candidates = []

    for regex in LABELLED_INCOME_REGEXES:
        for match in regex.findall(text):
            try:
                candidates.append(int(match.replace(",", "")))
            except ValueError:
                continue

    for match in INCOME_REGEX.findall(text):
        try:
            candidates.append(int(match.replace(",", "")))
        except ValueError:
            continue

    return max(candidates) if candidates else None


def classify_income(income: Optional[int]) -> tuple[str, str]:
    if income is None:
        return "flagged", "Low Income"
    if income <= 250000:
        return "verified", "EWS"
    if income <= 500000:
        return "flagged", "Low Income"
    return "rejected", "Not EWS"


def run_ocr(file_bytes: bytes, content_type: str) -> str:
    import pytesseract

    if content_type == "application/pdf":
        from pdf2image import convert_from_bytes

        pages = convert_from_bytes(file_bytes, first_page=1, last_page=1)
        if not pages:
            return ""
        image = pages[0]
    else:
        image = Image.open(io.BytesIO(file_bytes))

    return pytesseract.image_to_string(image)


@router.post("/api/verify-income")
async def verify_income(file: UploadFile = File(...)):
    if file.content_type not in SUPPORTED_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use JPEG, PNG, or PDF.")

    if DEMO_MODE:
        return demo_response()

    file_bytes = await file.read()

    try:
        raw_text = run_ocr(file_bytes, file.content_type or "")
    except ImportError:
        return demo_response()
    except Exception:
        return {
            "status": "flagged",
            "income_detected": None,
            "income_formatted": None,
            "category": "Low Income",
            "confidence": "low",
            "raw_text_snippet": "OCR failed during document processing",
        }

    if not raw_text.strip():
        return {
            "status": "flagged",
            "income_detected": None,
            "income_formatted": None,
            "category": "Low Income",
            "confidence": "low",
            "raw_text_snippet": "",
        }

    income = extract_income(raw_text)
    status, category = classify_income(income)

    return {
        "status": status,
        "income_detected": income,
        "income_formatted": format_income(income),
        "category": category,
        "confidence": "high" if income is not None else "low",
        "raw_text_snippet": raw_text[:200],
    }
