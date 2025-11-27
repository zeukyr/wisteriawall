from fastapi import APIRouter, Depends
from app.db.supabase_client import supabase
from app.models.schemas import PostRequest
from app.auth.deps import get_current_user


router = APIRouter(prefix="/api", tags=["posts"])

@router.get("/posts")
def get_posts(
    space: str,
    page: int = 1,
    pageSize: int = 20
): 
    response = supabase.table("messages").select(
        "*, author:users!messages_author_id_fkey(display_name, username)"
    ).eq("space", space).is_("parent_id", None)
    response = response.order("created_at", desc=True)
    start = pageSize * (page - 1)
    end = start + pageSize
    response = response.range(start, end)
    
    result = response.execute()
    print("Full result:", result.data)
    return result

@router.post("/posts")
def create_post(data: PostRequest, user: int = Depends(get_current_user)): 
    new_row = {
        "space": data.space,
        "title": data.title,
        "body": data.body,
        "parent_id": None,
        "author_id": user["id"]
    }
    response = supabase.table("messages").insert(new_row).execute()
    return response
