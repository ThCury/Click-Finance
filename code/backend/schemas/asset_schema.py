from pydantic import BaseModel

class AssetCreate(BaseModel):
    symbol: str
    name: str
    current_price: float | None = None
    image_url: str | None = None
    description: str | None = None

class StockCreate(AssetCreate):
    symbol: str
    pl: float | None = None
    dy: float | None = None
    roe: float | None = None
