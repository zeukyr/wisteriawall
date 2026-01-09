from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import routes as auth_routes
from app.posts import routes as post_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://127.0.0.1:5173",
                   "https://wisteriawall.vercel.app",
                   "https://wisteriawall-git-main-zeukyrs-projects.vercel.app",
                   "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(post_routes.router)
