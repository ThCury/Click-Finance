# backend/database.py
import os
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv

load_dotenv()

# Pega a URL que configuramos no docker-compose
sqlite_url = os.getenv("DATABASE_URL")

# echo=True faz o SQL aparecer no terminal (ótimo para aprender/debug)
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    # Isso aqui lê todos os arquivos que herdam de SQLModel e cria no banco
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session