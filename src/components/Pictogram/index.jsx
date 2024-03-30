import React from 'react';
import pictoN from "../../assets/pictoNoir.jpg";
import pictoV from "../../assets/pictoVert.jpg";
export let tester = "je teste";

function Pictogram(){
    let connected = sessionStorage.getItem("connexion");
        let picto = pictoN;
        let pictoAlt = "Pictogramme Noir";
        if (connected === 1){
            picto = pictoV;
            pictoAlt = "Pictogramme Vert";
        }
        return(
            <img className = "picto" src = {picto} alt = {pictoAlt}></img>
        )
}

export default Pictogram;