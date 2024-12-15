import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Messages from './pages/Messages';
import LoginPage from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Verification from './pages/auth/Verification';

export default function App() {
  return (
    <Routes>
      <Route index={true} element={<Messages />} />
      <Route path='/auth/login' element={<LoginPage />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/verify' element={<Verification />} />
    </Routes>
  )
}