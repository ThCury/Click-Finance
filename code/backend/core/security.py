# backend/core/security.py
import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from core.database import get_session
from models.user import User
import os
from pathlib import Path
from dotenv import load_dotenv

import os
from pathlib import Path
from dotenv import load_dotenv
# 1. Tenta carregar o arquivo físico (Opcional)
dot_env_path = Path("/app/.env")
if dot_env_path.exists():
    load_dotenv(dotenv_path=dot_env_path)
else:
    # Tenta carregar da raiz se estiver rodando local
    load_dotenv()

# 2. O os.getenv busca PRIMEIRO no Ambiente do Sistema (injetado pelo Docker)
# e DEPOIS no arquivo .env carregado acima.
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

# 3. Diagnóstico Inteligente
if not SECRET_KEY:
    print(f"--- ERRO CRÍTICO DE CONFIGURAÇÃO ---")
    print(f"Diretório atual: {os.getcwd()}")
    print(f"Arquivo /app/.env existe? {dot_env_path.exists()}")
    print(f"Variáveis detectadas no SO: {list(os.environ.keys())}")
    raise ValueError("JWT_SECRET_KEY não encontrada! Verifique o .env ou o Docker Compose.")

# Se chegou aqui, funcionou!
print("✅ Configurações de segurança carregadas com sucesso.")

ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Validação de segurança: Não deixa o app rodar sem a chave
if not SECRET_KEY:
    raise ValueError("A variável JWT_SECRET_KEY não foi encontrada no arquivo .env!")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    session: Session = Depends(get_session)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decodifica o Token usando sua SECRET_KEY do .env
        payload = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Busca o usuário no banco de dados
    user = session.exec(select(User).where(User.username == username)).first()
    if user is None:
        raise credentials_exception
    return user