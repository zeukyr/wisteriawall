from fastapi import APIRouter, HTTPException
from argon2 import PasswordHasher
from app.db.supabase_client import supabase
from app.models.schemas import SignupRequest, LoginRequest
from app.auth.tokens import create_access_token
from datetime import timedelta, datetime


router = APIRouter(prefix="/api", tags=["auth"])
ph = PasswordHasher()

@router.post("/signup")
def signup(data: SignupRequest):
    password_hash = ph.hash(data.password)
    existing = supabase.table("users").select("*").eq("username", data.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username already exists")

    supabase.table("users").insert({"username": data.username, "password_hash": password_hash}).execute()
    return {"username": data.username}

@router.post("/login")
def login(data: LoginRequest):
    record = supabase.table("users").select("id, password_hash").eq("username", data.username).single().execute()
    if not record.data:
        raise HTTPException(status_code=404, detail="No such username found")

    user = record.data
    if not ph.verify(user["password_hash"], data.password):
        raise HTTPException(status_code=401, detail="Wrong password")

    access_token = create_access_token({"sub": str(user["id"])}, timedelta(hours=1))
    
    return {"message": "success", "access_token": access_token, "token_type": "bearer"}
