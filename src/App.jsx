import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
      <button id = 'afla_grupa' onClick = {aflaGrupa}>Afla grupa</button>
    </>
  )
}

export default App
