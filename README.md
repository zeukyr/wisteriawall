# Eunoia

An anonymous message board for women in CS 

# Demo
https://drive.google.com/file/d/12lCBMpoJLx_8vrFyEsnAbL4yaowgnMqs/view?usp=sharing

# Project Overview

The name Eunoia comes from the Greek word meaning “beautiful thinking” or “genuine goodwill”.  This is a Pinterest-inspired web application based on this sentiment, allowing women in CS to anonymously share ideas in a spirit of care and support. It fosters community and connection by offering a platform to share resources, opportunities, and inspiring stories. 

# Why I Built This

Throughout my CS journey, I’ve always felt like a minority, whether from attending Hackathons, in my university classes, or even in online CS-related forums. The underrepresentation of women in CS felt isolating and discouraging. I created this message board because it was something I wish I had — a space that women and other gender minorities in CS-related fields can have to themselves, to support and uplift each other and stop feeling like the minority. 

# Tools and Technologies

React: I chose React because it is very widely used and I thought I had enough familiarity with JS & HTML to be able to learn React. Using React worked well because the component-based structure allowed me to save time in development by reusing components. 

Tailwind CSS - I used Tailwind CSS because it let me style the class quickly using utility classes.

FastAPI - For my backend, I used FastAPI because it was beginner-friendly and based on Python, the language that I’m most comfortable with. FastAPI allowed me to connect my React frontend to my Supabase database

Axios - I used Axios to connect React to FastAPI

Supabase - I used Supabase as my database because it works well with both FastAPI and React. 

# Features and Implementation

Sign In & Log In - Create an account with a unique username and password. Argon2 hashes the password before storing it in the Supabase database. Authentication is managed securely through JWT, and session tokens expire in 1 hour, prompting user to log in.

Discussion Boards - Create posts in various boards/spaces, and also create new boards/spaces of their own. It is possible to reply to a post, and reply to any replies

Pins - Pin any post for easy access

Profile Settings - Change display name and set a profile picture

# Key Learnings and Challenges

# Technical Skills

Full-Stack Flow: This was my first full-stack application! I learned how data moves from the frontend (React) through Axios to the backend (FastAPI) and database (Supabase). 

React Hooks: I learned how to use useState to keep track of changing data and useEffect to re-render code according to changes in my component, and developed an intuition for when it is appropriate to use them.

Security: I challenged myself to build this app as securely as possible for a beginner. This meant hashing passwords to ensure what shows up in the database is not the password itself, implementing JWT tokens with a session expiration (which were later also used for getting the current user to access pins/posts), and being careful as to leave my API keys out of the Github by creating .env files. 

Recursion: One of the most interesting challenges was implementing a RecursiveComment component, which calls on itself to render a reply within a reply, creating an infinitely nestable comment structure. I was excited to implement recursion in React, a concept that I was familiar with from only Python and Racket and never thought I would use in UI. 

# Soft Skills

Debugging: While hitting errors, I realized that debugging is more difficult with a full-stack application because it is more difficult to isolate the cause — is the issue in the frontend request, the backend logic, or the database query? I learned how to recognize the various HTTP codes (e.g. 404, 401, 500, 200) and what they mean in order to verify that the backend was working, or determine where it was breaking. I also learned how to use print statements to test my FastAPI backend, try-except Python blocks to log errors in full detail, and console-logs to check what data was being sent to the front-end. Understanding HTTP codes later helped me implement a redirect to the login page when the session token expires (i.e. error is 401)!

Managing Projects: Building a full-stack project was a daunting task for me as a beginner, but I learned how to break it down in manageable steps, from first understanding how the data flows from Supabase to React, to writing my first FastAPI endpoint, to writing a CURL request to test the endpoint itself, figuring out how to call it from React, to finally designing a UI. I learned that tackling one piece by itself before moving on is what makes complex projects achievable.

Codebase Organization: I followed some Youtube videos to ensure that my codebase was well-organized, and learned that taking time to properly organize my project upfront will save a lot of time. Having separate folders for different purposes like routes for authentication, routes for posts, and a database folder specifically for the Supabase client, made it much easier to find and modify code quickly. This probably saved me hours of searching through files later

Time Management: I built the majority of this project during my 1A term, while still adjusting to university and attending classes. I learned how to stay committed to a long-term project even when other parts of my life are hectic, by making time to work even if it is simply a short block. 

# Installation and Setup

Clone the project
git clone https://github.com/zeukyr/eunoia.git

Navigate to project directory
cd eunoia

Navigate to backend
cd backend

Active virtual environment
python -m venv venv
source venv/bin/activate

Install dependencies
pip install -r requirements.txt

Start backend server
uvicorn main:app --reload

Navigate to the frontend 
cd ..
cd frontend

Install dependencies
npm install

Run the frontend server
npm run dev

# Future Improvements
Chatbox: Allow users to message each other privately.

Notifications:  Enable notifications for when user’s post has new replies or when pinned post has new replies.

User profiles: Enable navigation to user’s profiles and more information to be displayed (e.g. skills, interests)
