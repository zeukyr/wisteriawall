from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class SignupRequest(BaseModel): 
    username: str
    password: str

class LoginRequest(BaseModel): 
    username: str
    password: str

class PostRequest(BaseModel):
    space: str
    title: str
    body: str
