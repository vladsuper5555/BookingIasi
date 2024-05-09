import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './userInteractions/Login';
import Signup from './userInteractions/Signup';
import Welcome from './userInteractions/Wellcome';
import PanoramaTour from './model3D/PanoramaTour'; 
import Hotels from './hotels/Hotels';
import NotFoundPage from './NotFoundPage';
import AttractionsPage from './attractions/Attractions';
import AttractionDetailsPage from "./attractions/AttractionDetailsPage";
// import "./App.css"; TO BE SOLVED THE CSS CONFLICTS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/panoramas" element={<PanoramaTour />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/attractions" element={<AttractionsPage />} />
        <Route
          path="/attractions/:hotelName"
          element={<AttractionDetailsPage />}
        />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
