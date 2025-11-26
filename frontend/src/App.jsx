import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import ShowData from './components/ShowData'
import Signup from './components/Signup'
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

        <Route path="/board" element={<MessageBoard />} />
        <Route path="/new-post" element={<AddPostForm />} />
    </Routes>
</BrowserRouter>
  )
}

export default App
