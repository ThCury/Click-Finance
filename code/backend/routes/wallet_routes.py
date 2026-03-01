# backend/routes/user_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from core.security import get_current_user
from core.database import get_session
from models.user import User
from models.wallet import Wallet

router = APIRouter()

@router.get("/wallets")
def list_my_wallets(
    current_user: User = Depends(get_current_user), 
    session: Session = Depends(get_session)
):
    # A mágica: O FastAPI só deixa chegar aqui se o Token for válido
    # E você já tem o objeto 'current_user' pronto para usar!
    return current_user.wallets