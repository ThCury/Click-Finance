from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from models.base import Base

class Position(Base):
    __tablename__ = "positions"

    id = Column(Integer, primary_key=True)
    wallet_id = Column(Integer, ForeignKey("wallets.id"), nullable=False)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)

    quantity = Column(Float, default=0)       # Quantidade total
    average_price = Column(Float, default=0)  # Preço médio
    total_value = Column(Float, default=0)    # quantity * average_price

    asset = relationship("Asset")
    wallet = relationship("Wallet", back_populates="positions")
    transactions = relationship("Transaction", back_populates="position", cascade="all, delete-orphan")
