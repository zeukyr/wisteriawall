from fastapi import APIRouter, HTTPException, Depends
from argon2 import PasswordHasher
from app.db.supabase_client import supabase
from app.models.schemas import SignupRequest, LoginRequest, ReplyRequest
from app.auth.tokens import create_access_token
from datetime import timedelta
from app.auth.deps import get_current_user


router = APIRouter(prefix="/api", tags=["auth"])
ph = PasswordHasher()

@router.post("/signup")
def signup(data: SignupRequest):
    password_hash = ph.hash(data.password)
    existing = supabase.table("users").select("*").eq("username", data.username).execute()
    if existing.data:
        raise HTTPException(status_code=409, detail="Username already exists")
    user_data = {
        "username": data.username, 
        "password_hash": password_hash }
    if data.display:
        user_data["display_name"] = data.display
    supabase.table("users").insert(user_data).execute()
    return {"username": data.username}


@router.post("/login")
def login(data: LoginRequest):
    try: 
        record = supabase.table("users").select("id, password_hash").eq("username", data.username).single().execute()
    except:
        raise HTTPException(status_code=404, detail="No such username found")

    user = record.data
    try:
        ph.verify(user["password_hash"], data.password)
    except Exception:
        raise HTTPException(status_code=401, detail="Wrong password")

    access_token = create_access_token({"sub": str(user["id"])}, timedelta(hours=1))
    
    return {"message": "success", "access_token": access_token, "token_type": "bearer"}
