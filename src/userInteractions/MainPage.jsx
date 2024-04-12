// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';

function MainPage() {
  const [grupa, setGrupa] = useState("");


  async function aflaGrupa () {
    const res = await new Promise((res) => {
      fetch('http://localhost:5173/api/cegrupasuntem', {
        method: "POST",
        body: ""
      }).then(async (response) => {
        res(response.text());
      })
    })
    console.log(res);
    setGrupa(JSON.parse(res).name);
  }

  function redirectToImage () {
    window.location.href =  '/vizualizare3D?hotel=hotel_test';
  }

  return (
    <div>
      <h1>BookingIasi</h1>
      <Link to="/login">Login Page</Link>
      <div> Ce grupa suntem ?</div>
      <div id = "content"> { grupa } </div>
      <Button id = 'afla_grupa' variant='contained' onClick = {aflaGrupa}>Afla grupa</Button> <br/>
      <Button id = 'image' variant='contained' onClick = {redirectToImage}>Vezi o imagine 3D</Button>
    </div>
  );
}

export default MainPage;
