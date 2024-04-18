// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Mesaj from './Mesaj';

function Hotels() {
  return (
    <div>
      Bine ai venit pe pagina de hoteluri
      <Mesaj/>
    </div>
  );
}

export default Hotels;
