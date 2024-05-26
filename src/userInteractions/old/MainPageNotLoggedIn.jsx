// MainPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';

function MainPage() {
  const [grupa, setGrupa] = useState("");


  async function aflaGrupa () {
    const res = await new Promise((res) => {
      fetch('/api/cegrupasuntem', {
        method: "POST",
        body: ""
      }).then(async (response) => {
        res(response.text());
      })
    })
    console.log(res);
    setGrupa(JSON.parse(res).name);
  }


  return (
    <div>
      <h1>BookingIasi</h1>
      <Link to="/login">Login Page</Link>
      <div> Ce grupa suntem ?</div>
      <div id = "content"> { grupa } </div>
      <Button id = 'afla_grupa' variant='contained' onClick = {aflaGrupa}>Afla grupa</Button>
    </div>
  );
}

export default MainPage;
