// MainPage.jsx
import React from "react";
import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import Button from "@mui/material/Button";
import Mesaj from "./Mesaj";
function Hotels() {
    const [contor, setContor] = useState(1);
    function creste () {
        setContor(contor + 1);
    }
    return <div>
        Mesaj {contor} <br/>
        <Button onClick = {creste}> Buton </Button>
    </div>;
}
export default Hotels;
