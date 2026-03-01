from typing import TYPE_CHECKING, Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

# Evita importação circular em tempo de execução
if TYPE_CHECKING:
    from .wallet import Wallet
    from .asset import Asset  # Adicionado para o relacionamento funcionar

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Chaves Estrangeiras
    asset_id: int = Field(foreign_key="asset.id")
    wallet_id: int = Field(foreign_key="wallet.id")
    
    date: datetime = Field(default_factory=datetime.utcnow)
    type: str = Field(description="BUY or SELL")
    quantity: float
    price: float
    costs: float = Field(default=0.0)

    # Relacionamentos (As propriedades que o SQLAlchemy estava sentindo falta)
    wallet: Optional["Wallet"] = Relationship(back_populates="transactions")
    asset: Optional["Asset"] = Relationship(back_populates="transactions") # ESTA LINHA RESOLVE O ERRO