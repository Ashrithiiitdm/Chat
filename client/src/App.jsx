import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Messages from './pages/Messages';
import LoginPage from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Verification from './pages/auth/Verification';
import Profile from './pages/Profile';
import Layout from './paths';
import FriendRequests from './pages/FriendRequests';
import Friends from './pages/Friends';

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/auth/login' />} />
      {/* <Route index={true} element={<Messages />} /> */}
      <Route path='/auth/login' element={<LoginPage />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/verify' element={<Verification />} />

      <Route path='/dashboard' element={<Layout />} >
        <Route index element={<Messages />} />
        <Route path='profile' element={<Profile />} />
        <Route path='friend-requests' element={<FriendRequests />} />
        <Route path='friends' element={<Friends />} />
      </Route>

    </Routes >
  )
}