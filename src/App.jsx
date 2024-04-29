import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './userInteractions/Login';
import Signup from './userInteractions/Signup';
import Welcome from './userInteractions/Wellcome';
import PanoramaTour from './model3D/PanoramaTour'; 
import Hotels from './hotels/Hotels';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path='/panoramas' element={<PanoramaTour />} />
        <Route path='/hotels' element={<Hotels/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
