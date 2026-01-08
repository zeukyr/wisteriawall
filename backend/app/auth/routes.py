from fastapi import APIRouter, HTTPException
from argon2 import PasswordHasher
from app.db.supabase_client import supabase
from app.models.schemas import SignupRequest, LoginRequest, ProfilePictureUpdate
from app.auth.tokens import create_access_token
from datetime import timedelta
from app.auth.deps import get_current_user
from fastapi import Depends, UploadFile


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

@router.get("/current_profile")
def get_current_profile(
    user = Depends(get_current_user)
    
):
    print(f"User object: {user}")
    avatar_url = user["avatar-url"]
    display_name = user["display_name"]
    username = user["username"]

    
    return {
        "avatar_url": avatar_url,
        "display_name": display_name,
        "username": username
        }
    
@router.put("/update_avatar")
def update_avatar(
    data: ProfilePictureUpdate,
    user = Depends(get_current_user)
):
    try:
        user_id = user["id"]
        response = supabase.table("users").update({"avatar-url": data.avatar_url, "display_name": data.display_name}
        ).eq("id", user_id).execute()
        return {"message": "Avatar updated successfully",
                "data": response.data[0]}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update avatar")
@router.delete("/delete_account")
def delete_account(
    user = Depends(get_current_user)
):
    user_id = user["id"]
    try: 
        response = supabase.table("users").delete().eq("id", user_id).execute()
        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to delete account")

