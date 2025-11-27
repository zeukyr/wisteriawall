from fastapi import APIRouter, Depends
from app.db.supabase_client import supabase
from app.models.schemas import PostRequest, ReplyRequest
from app.auth.deps import get_current_user
from fastapi import HTTPException

router = APIRouter(prefix="/api", tags=["posts"])

@router.get("/spaces")
def get_spaces():
    spaces = supabase.table("messages").select("space").execute()
    unique_spaces = list({item['space'] for item in spaces.data})
    return {"data": unique_spaces}

@router.get("/posts/{post_id}")
def get_post(post_id: int):
    post = supabase.table("messages").select("*").eq("id", post_id).execute()
    if not post.data or len(post.data) == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    replies = supabase.table("messages").select("*").eq("parent_id", post_id).execute()
    return {**post.data[0],
            "replies": replies.data} 


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


@router.post("/posts/{post_id}/replies")
def reply_to_post(post_id: int, data: ReplyRequest, user: int = Depends(get_current_user)):
    parent = supabase.table("messages").select("*").eq("id", post_id).execute()
    if not parent: 
        raise HTTPException(status_code=404, detail="Post not found")
    new_reply = {
        "space": data.space,  
        "title": "",
        "body": data.body,
        "parent_id": post_id,
        "author_id": user["id"]}
    
    response = supabase.table("messages").insert(new_reply).execute()
    supabase.table("messages").update({
        "replies_count": supabase.table("messages")
                               .select("replies_count")
                               .eq("id", post_id)
                               .execute().data[0]["replies_count"] + 1
    }).eq("id", post_id).execute()

    return response