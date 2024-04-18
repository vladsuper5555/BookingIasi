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
    window.location.href =  '/panoramas?hotel=hotel_test';
  }

  async function testDB () {
    const res = await new Promise((res) => {
      fetch('http://localhost:5173/api/databaseTest', {
        method: "GET",
      }).then(async (response) => {
        res(response.text());
      })
    })
    console.log(res);
  }

  function hoteluri () {
    window.location.href = '/hotels';
  }

  return (
    <div>
      <h1>BookingIasi</h1>
      <Link to="/login">Login Page</Link>
      <div> Ce grupa suntem ?</div>
      <div id = "content"> { grupa } </div>
      <Button id = 'afla_grupa' variant='contained' onClick = {aflaGrupa}>Afla grupa</Button> <br/> <br/>
      <Button id = 'test_db_query' variant='contained' onClick = {testDB}>Test DB</Button> <br/> <br/>
      <Button id = 'vizualizare_hoteluri' variant='contained' onClick = {hoteluri}>Vezi Hoteluri</Button> <br/> <br/>
      <Button id = 'image' variant='contained' onClick = {redirectToImage}>Vezi o imagine 3D</Button>
    </div>
  );
}

export default MainPage;
