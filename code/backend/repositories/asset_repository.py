from sqlalchemy.orm import Session
from models.asset import Asset, Stock
from schemas.asset_schema import StockCreate

# ---------- Asset ----------
def get_asset_by_symbol(db: Session, symbol: str) -> Asset | None:
    return db.query(Asset).filter_by(symbol=symbol).first()

def create_asset(db: Session, data: StockCreate) -> Asset:
    asset = Asset(
        symbol=data.symbol,
        name=data.name,
        current_price=data.current_price,
        image_url=data.image_url,
        description=data.description,
        type="stock"
    )
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset

# ---------- Stock ----------
def create_stock_record(db: Session, asset: Asset, data: StockCreate) -> Stock:
    stock = Stock(
        id=asset.id,          # FK para assets.id
        symbol=asset.symbol,  # copia o ticker
        pl=data.pl,
        dy=data.dy,
        roe=data.roe
    )
    db.add(stock)
    db.commit()
    return stock

