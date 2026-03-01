# backend/routes/user_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from core.database import get_session
from core.security import get_password_hash, verify_password, create_access_token
from models.user import User

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user_data: User, session: Session = Depends(get_session)):
    # Verificar se o usuário já existe
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    # Hashear a senha antes de salvar
    user_data.hashed_password = get_password_hash(user_data.hashed_password)
    
    session.add(user_data)
    session.commit()
    session.refresh(user_data)
    return {"message": "Usuário criado com sucesso", "user_id": user_data.id}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # Buscar usuário pelo username (ou email, dependendo da sua escolha)
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}