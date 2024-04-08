import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';

function App() {
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
  return (
    <>
      <div> ce grupa suntem ?</div>
      <div id = "content"> { grupa } </div>
      <Button id = 'afla_grupa' variant='contained' onClick = {aflaGrupa}>Afla grupa</Button>
    </>
  )
}

export default App
