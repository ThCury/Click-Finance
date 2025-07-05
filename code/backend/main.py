from fastapi import FastAPI
from contextlib import asynccontextmanager

from config.database import init_db
from api.routes import router as api_router
from view import router as view_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # Cria tabelas no início
    yield      # Aqui poderia ir lógica de shutdown (se necessário)

app = FastAPI(lifespan=lifespan)

# Rotas
app.include_router(api_router, prefix="/api")
app.include_router(view_router)
