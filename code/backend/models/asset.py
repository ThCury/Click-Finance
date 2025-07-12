from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from models.base import Base  # use o Base compartilhado


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(10), unique=True, nullable=False)  # Ex: PETR4
    name = Column(String(100))                                 # Nome da empresa
    current_price = Column(Float, nullable=True)               # Preço atual
    image_url = Column(String(255), nullable=True)
    description = Column(String(255), nullable=True)
    type = Column(String(50))  # stock, crypto, etc

    __mapper_args__ = {
        "polymorphic_identity": "asset",
        "polymorphic_on": type
    }

class Stock(Asset):
    __tablename__ = "stocks"

    id     = Column(Integer, ForeignKey("assets.id"), primary_key=True)
    # symbol = Column(String(10),
    #                 ForeignKey("assets.symbol"),
    #                 nullable=False, index=True)

    pl  = Column(Float)
    dy  = Column(Float)
    roe = Column(Float)

    from sqlalchemy import and_
    __mapper_args__ = {
        "polymorphic_identity": "stock",
        "inherit_condition": and_(id == Asset.id)   # deixa claro qual chave usar
    }
