from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.config import settings
from app.utils.password import verify_password
from app.utils.token import create_access_token

router = APIRouter(prefix="/owner", tags=["owner"])


@router.post("/login")
def login(
    form: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> dict[str, str]:
    if form.username != settings.owner_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    if not verify_password(form.password, settings.owner_password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = create_access_token(sub=form.username)
    return {"access_token": token, "token_type": "bearer"}
