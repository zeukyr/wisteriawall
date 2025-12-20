from fastapi import APIRouter, Depends
from app.db.supabase_client import supabase
from app.models.schemas import PostRequest, ReplyRequest
from app.auth.deps import get_current_user
from fastapi import HTTPException

router = APIRouter(prefix="/api", tags=["posts"])

def build_tree(messages, parent_id=None):
    tree = []
    for message in messages:
        if message['parent_id'] == parent_id:
            msg_copy = message.copy()
            msg_copy["replies"] = build_tree(messages, message["id"])
            tree.append(msg_copy)
    return tree

@router.get("/posts/pinned")
def get_pinned(
    user=Depends(get_current_user),
    page: int = 1,
    pageSize: int = 20):
    start = page
    end = start + pageSize
    pinned_query = (
    supabase.table("user_pins")
    .select("post_id")
    .eq("user_id", user["id"])
    .order("created_at", desc=True)
)
    pinned_data = pinned_query.range(start, end).execute().data

    post_ids = [p["post_id"] for p in pinned_data]
    posts = (
        supabase.table("messages")
        .select("*, author:users!messages_author_id_fkey(display_name, username)")
        .in_("id", post_ids)
        .order("created_at", desc=True)
        .execute()
    )

    return {"data": posts.data}

    
@router.get("/posts/{post_id}/pin")
def is_pinned(post_id: int, user=Depends(get_current_user)):
    pinned = supabase.table("user_pins").select("*").eq("user_id", user["id"]).eq("post_id", post_id).execute()
    pinned_status = len(pinned.data) > 0
    return {"pin": pinned_status}

@router.post("/posts/{post_id}/pin")
def toggle_pin(post_id: int, user: int = Depends(get_current_user)):
    existing = supabase.table("user_pins").select("*").eq("user_id", user["id"]).eq("post_id", post_id).execute()
    if existing.data:
        supabase.table("user_pins").delete().eq("user_id", user["id"]).eq("post_id", post_id).execute()
        return {"pin": False}
    else:
        data = {"user_id": user["id"], "post_id": post_id}
        supabase.table("user_pins").insert(data).execute()
        return {"pin": True}

@router.get("/spaces")
def get_spaces():
    spaces = supabase.table("messages").select("space").execute()
    unique_spaces = list({item['space'] for item in spaces.data})
    return {"data": unique_spaces}

@router.get("/posts/{post_id}")
def get_post(post_id: int):
    post = supabase.table("messages").select(
        "*, author:users!messages_author_id_fkey(display_name, username)"
        ).eq("id", post_id).execute()
    if not post.data or len(post.data) == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    all_msgs = supabase.table("messages").select("*, author:users!messages_author_id_fkey(display_name, username)").eq("space", post.data[0]["space"]).execute()
    tree = build_tree(all_msgs.data, parent_id=post_id)
    return {**post.data[0],
            "replies": tree} 


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