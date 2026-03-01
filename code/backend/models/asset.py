from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

# Evita importação circular em tempo de execução
if TYPE_CHECKING:
    from .transaction import Transaction

class Asset(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticker: str = Field(index=True, unique=True, description="Ex: PETR4, IVVB11")
    name: str = Field(description="Nome da empresa ou fundo")
    type: str = Field(description="Ação, FII, BDR, ETF")
    
    current_price: Optional[float] = Field(default=0.0)
    last_update: datetime = Field(default_factory=datetime.utcnow)

    # Relacionamento: Um ativo aparece em várias transações
    transactions: List["Transaction"] = Relationship(back_populates="asset")