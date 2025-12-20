import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import DetailedPost from './components/DetailedPost'
import ShowData from './components/ShowData'
import Signup from './components/Signup'
import Pins from './components/Pins'
import MessageBoard from './components/MessageBoard'
import AddPostForm from './components/AddPostForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<DetailedPost />} />
        <Route path="/board" element={<MessageBoard />} />
        <Route path="/new-post" element={<AddPostForm />} />
        <Route path="/pinned" element={<Pins />} />

    </Routes>
</BrowserRouter>
  )
}

export default App
