# api/routes.py
from fastapi import APIRouter, Depends, HTTPException, status
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

# ---------- endpoint ----------
@router.get("/search/{keyword}", status_code=status.HTTP_200_OK)
def api_search(keyword: str):
    result = search_ticker(keyword)

    # 403 – chave ausente ou inválida
    if isinstance(result, dict) and "api key" in result["error"].lower():
        raise HTTPException(status.HTTP_403_FORBIDDEN, result["error"])

    # 404 – erro/nota da Alpha Vantage ou bestMatches inexistente
    if isinstance(result, dict):
        raise HTTPException(status.HTTP_404_NOT_FOUND, result["error"])

    # 303 – lista vazia
    if not result:
        raise HTTPException(status.HTTP_303_SEE_OTHER, "Nenhum resultado")

    # 200 – ok
    return result




@router.get("/quote/{symbol}")
def api_quote(symbol: str):
    """Retorna cotação diária do ticker"""
    return get_stock_quote(symbol)

@router.post("/buyStock")
def api_add_stock(stock: StockCreate, db: Session = Depends(get_db)):
    """Registra (ou garante) o ativo/posição na carteira"""
    return add_stock(db, stock)
