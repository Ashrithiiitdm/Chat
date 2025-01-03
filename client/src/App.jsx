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
import { useSelector } from 'react-redux';

export default function App() {

  const { isLogged } = useSelector(state => state.auth);
  console.log(isLogged);
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/auth/login' />} />
      {/* <Route index={true} element={<Messages />} /> */}
      <Route path='/auth/login' element={<LoginPage />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/verify' element={<Verification />} />

      <Route path='/dashboard' element={isLogged ? <Layout /> : <Navigate to='/auth/login' />} >
        <Route index element={isLogged ? <Messages /> : <Navigate to='/auth/login' />} />
        <Route path='profile' element={isLogged ? <Profile /> : <Navigate to='/auth/login' />} />
        <Route path='friend-requests' element={isLogged ? <FriendRequests /> : <Navigate to='/auth/login' />} />
        <Route path='friends' element={isLogged ? <Friends /> : <Navigate to='/auth/login' />} />
      </Route>

    </Routes >
  )
}