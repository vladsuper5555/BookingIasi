import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './userInteractions/LoginPage';
import MainPage from './userInteractions/MainPage';
import Model3D from './model3D/render';
import Hotels from './hotels/Hotels';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path='/panoramas' element={<Model3D />} />
        <Route path='/hotels' element={<Hotels/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
