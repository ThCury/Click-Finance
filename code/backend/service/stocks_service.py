import requests
import os

from sqlalchemy.orm import Session
from models.asset import Asset, Stock
from models.wallet import Wallet
from models.position import Position
from schemas.asset_schema import StockCreate
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("ALPHAVANTAGE_API_KEY")


def get_hello_message():
    return "Olá do serviço de investimentos 🧠"

def get_stock_quote(symbol: str):
    url = f"https://www.alphavantage.co/query"
    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "Time Series (Daily)" not in data:
        return {"error": "Dados não encontrados ou limite excedido"}

    return data["Time Series (Daily)"]


def search_ticker(keyword: str):
    base = "https://www.alphavantage.co/query"
    query = {
        "function": "SYMBOL_SEARCH",
        "keywords": keyword,
        "apikey": API_KEY
    }
    if not API_KEY:
        return {"error": "API key não configurada"}

    r = requests.get(base, params=query, timeout=10)
    r.raise_for_status()
    data = r.json()

    if "Note" in data or "Information" in data:
        return {"error": data.get("Note") or data.get("Information")}
    
    if "bestMatches" not in data:
        return {"error": "Nenhum resultado"}

    # -------- filtro por moeda BRL --------
    brl_only = [
        item for item in data["bestMatches"]
        if item.get("8. currency") == "BRL"
    ]

    return brl_only or []          # retorna lista vazia se não houver BRL


def add_stock(db: Session, stock_data: StockCreate, wallet_id: int = 1):
    asset = db.query(Asset).filter_by(symbol=stock_data.symbol).first()

    if not asset:
        asset = Asset(
            symbol=stock_data.symbol,
            name=stock_data.name,
            current_price=stock_data.current_price,
            image_url=stock_data.image_url,
            description=stock_data.description,
            type="stock"
        )
        db.add(asset)
        db.commit()
        db.refresh(asset)

    stock = db.query(Stock).filter_by(id=asset.id).first()
    if not stock:
        stock = Stock(
            id=asset.id,
            pl=stock_data.pl,
            dy=stock_data.dy,
            roe=stock_data.roe
        )
        db.add(stock)
        db.commit()

    position = db.query(Position).filter_by(wallet_id=wallet_id, asset_id=asset.id).first()
    if not position:
        position = Position(
            wallet_id=wallet_id,
            asset_id=asset.id,
            quantity=0,
            avg_price=0.0
        )
        db.add(position)
        db.commit()

    return {"message": "Stock adicionada com sucesso", "stock_id": asset.id}
