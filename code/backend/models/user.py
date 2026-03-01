# backend/models/user.py
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

from models.wallet import Wallet

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(unique=True)
    hashed_password: str
    
    # Relacionamento: Um usuário pode ter várias carteiras
    wallets: List["Wallet"] = Relationship(back_populates="user")