# backend/models/wallet.py
from typing import TYPE_CHECKING, Optional, List
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user import User
    from .transaction import Transaction
    
class Wallet(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = Field(default=None)
    
    # Chave estrangeira para o Usuário
    user_id: int = Field(foreign_key="users.id", index=True)
    
    # Relacionamentos
    # O back_populates deve bater com o nome do atributo na classe User
    user: "User" = Relationship(back_populates="wallets")
    
    # Uma carteira tem muitas transações
    transactions: List["Transaction"] = Relationship(back_populates="wallet")

