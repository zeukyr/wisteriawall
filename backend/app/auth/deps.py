from typing import Annotated

from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
import jwt
from app.config import ALGORITHM, ACCESS_SECRET
from jwt.exceptions import InvalidTokenError
from app.db.supabase_client import supabase

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, ACCESS_SECRET, algorithms=[ALGORITHM])
        print(payload)
        user_id = payload.get("sub")
        print(user_id)
        if user_id is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    record = supabase.table("users").select("*").eq("id", user_id).execute()
    if not record.data or len(record.data) == 0:
        print("No user found!")
        raise credentials_exception
    user = record.data[0]
    print("User found:", user)
    return user

