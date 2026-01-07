from pydantic import BaseModel, HttpUrl
from typing import Optional
class ProfilePictureUpdate(BaseModel):
    avatar_url: HttpUrl

class Token(BaseModel):
    access_token: str
    token_type: str

class SignupRequest(BaseModel): 
    username: str
    password: str
    display: Optional[str] = None

class LoginRequest(BaseModel): 
    username: str
    password: str

class PostRequest(BaseModel):
    space: str
    title: str
    body: str

class ReplyRequest(BaseModel):
    space: str
    body: str
