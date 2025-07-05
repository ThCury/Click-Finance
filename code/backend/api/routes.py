# api/routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import SessionLocal

# importa APENAS a camada de serviço
from service.stocks_service import (
    add_stock,
    search_ticker,
    get_stock_quote,
)

from schemas.asset_schema import StockCreate

router = APIRouter()

# ---------- dependência de sessão ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- endpoints ----------
@router.get("/search/{keyword}")
def api_search(keyword: str):
    """Busca tickers que contenham <keyword> via AlphaVantage"""
    return search_ticker(keyword)

@router.get("/quote/{symbol}")
def api_quote(symbol: str):
    """Retorna cotação diária do ticker"""
    return get_stock_quote(symbol)

@router.post("/buyStock")
def api_add_stock(stock: StockCreate, db: Session = Depends(get_db)):
    """Registra (ou garante) o ativo/posição na carteira"""
    return add_stock(db, stock)
