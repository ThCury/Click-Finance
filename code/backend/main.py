from fastapi import FastAPI
from sqlmodel import SQLModel
from core.database import engine
# IMPORTANTE: Importar todos os models para o SQLModel "enxergá-los"
from models.user import User
from models.wallet import Wallet
from models.transaction import Transaction
from models.asset import Asset
# Importar suas rotas
from routes.user_routes import router as user_router

app = FastAPI(
    title="Sistema de Investimentos Faculdade",
    description="API para gestão de carteiras e ativos",
    version="1.0.0"
)

# Evento que roda quando a API inicia
@app.on_event("startup")
def on_startup():
    # Cria as tabelas no banco de dados se elas não existirem
    SQLModel.metadata.create_all(engine)

# Registrar as rotas (Endereços da API)
app.include_router(user_router, prefix="/users", tags=["Usuários"])

@app.get("/")
def read_root():
    return {"message": "API de Investimentos está Online!", "status": "ok"}