from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.base import Base

class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)

    positions = relationship("Position", back_populates="wallet", cascade="all, delete-orphan")
