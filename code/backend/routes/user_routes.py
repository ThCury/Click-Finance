from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel

from core.database import get_session
from core.security import get_password_hash, verify_password, create_access_token
from models.user import User

router = APIRouter()

# DTO para entrada de dados (O que o Postman envia)
class UserCreate(BaseModel):
    username: str
    email: str
    password: str 
    full_name: Optional[str] = None

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, session: Session = Depends(get_session)):
    # 1. Verificar se o e-mail já existe
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    # 2. Transformar UserCreate (entrada) em User (modelo de banco)
    # Aqui a mágica acontece: pegamos 'password' e guardamos em 'hashed_password'
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password), # Hash da senha pura
        is_admin=True # Define como Admin automaticamente para seus testes
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return {"message": "Usuário criado com sucesso", "user_id": new_user.id}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # Buscar usuário pelo username
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Adicionando a claim is_admin no Token JWT
    # Agora o token carregará seu superpoder!
    access_token = create_access_token(
        data={"sub": user.username, "is_admin": user.is_admin}
    )
    return {"access_token": access_token, "token_type": "bearer"}