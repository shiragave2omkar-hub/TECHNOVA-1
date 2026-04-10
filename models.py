from pydantic import BaseModel


class CitizenProfile(BaseModel):
    udid: str
    name: str
    state: str
    disability_type: str
    disability_percentage: str
    income_category: str
    income_verified: bool = False
    income_amount: int = 0
