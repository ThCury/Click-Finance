import os
from datetime import datetime, timedelta
from typing import Optional
from pathlib import Path

import bcrypt
from jose import JWTError, jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select

from core.database import get_session
from models.user import User

# --- CARREGAMENTO DE CONFIGURAÇÕES ---
dot_env_path = Path("/app/.env")
if dot_env_path.exists():
    load_dotenv(dotenv_path=dot_env_path)
else:
    load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

if not SECRET_KEY:
    print(f"--- ERRO CRÍTICO DE CONFIGURAÇÃO ---")
    print(f"Diretório atual: {os.getcwd()}")
    raise ValueError("JWT_SECRET_KEY não encontrada! Verifique o .env ou o Docker Compose.")

print("✅ Configurações de segurança carregadas com sucesso.")

# --- LÓGICA DE CRIPTOGRAFIA (BCRYPT DIRETO) ---

def get_password_hash(password: str) -> str:
    """Transforma senha em texto puro em hash seguro."""
    # O bcrypt exige bytes, então encodamos a string
    pwd_bytes = password.encode('utf-8')
    # Gera o salt e o hash
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    # Retorna como string para salvar no banco de dados
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara senha do login com o hash do banco."""
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'),
            hashed_password.encode('utf-8')
        )
    except Exception:
        return False

# --- LÓGICA DE TOKENS JWT ---

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    
    # Define expiração
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    
    # Garante que a claim is_admin seja propagada se existir no dicionário original
    # (O valor real deve vir da rota de login, onde buscamos do banco)
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

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
        # Decodifica o Token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
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