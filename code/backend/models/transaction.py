# backend/models/transaction.py
from typing import TYPE_CHECKING, Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .wallet import Wallet
    
class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Chaves Estrangeiras
    asset_id: int = Field(foreign_key="asset.id")
    wallet_id: int = Field(foreign_key="wallet.id") # Adicione esta linha!
    
    date: datetime = Field(default_factory=datetime.utcnow)
    type: str = Field(description="BUY or SELL")
    quantity: float
    price: float
    costs: float = Field(default=0.0)

    # Relacionamento inverso
    wallet: Optional["Wallet"] = Relationship(back_populates="transactions")