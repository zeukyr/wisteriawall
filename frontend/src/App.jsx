import './App.css'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import DetailedPost from './components/DetailedPost'
import Signup from './components/Signup'
import Pins from './components/Pins'
import MessageBoard from './components/MessageBoard'
import AddPostForm from './components/AddPostForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import AccountSettings from './components/AccountSettings'
import DeleteAccount from './components/DeleteAccount'


function App() {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>

          <Route path="/posts/:id" element={<DetailedPost />} />
          <Route path="/board" element={<MessageBoard />} />
          <Route path="/new-post" element={<AddPostForm />} />
          <Route path="/pinned" element={<Pins />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/delete-account" element={<DeleteAccount />} />

        </Route>

    </Routes>
</BrowserRouter>
  )
}

export default App
