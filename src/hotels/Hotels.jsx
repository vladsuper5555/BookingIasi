// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Mesaj from './Mesaj';
//import mainPhoto from ".images/";//update dupa ce se aleg pozele
import "./styles/main-page.css";

const Hotels = () => {
  return (
  <div className='general-stucture'>    
    <div>
      Bine ai venit pe pagina de hoteluri
      <Mesaj/>
      </div>
    </div>
  );
}

export default Hotels;
