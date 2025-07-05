from pydantic import BaseModel
from datetime import datetime

class BuyStock(BaseModel):
    symbol: str
    quantity: float
    unit_price: float
    date: datetime
