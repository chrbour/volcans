import React from "react";
import Banner from '../../components/Banner';
import Navbar from "../../components/Navbar";
import pictoN from "../../assets/pictoNoir.jpg";
import pictoV from "../../assets/pictoVert.jpg";

function Accueil(){
    let connected = sessionStorage.getItem("connexion");
    let picto = pictoN;
    let pictoAlt = "Pictogramme Noir";
    if (connected == 1){
        picto = pictoV;
        pictoAlt = "Pictogramme Vert";
    }
    return(
        <div>
            <Banner/>
            <img className = "picto" src = {picto} alt = {pictoAlt}></img>
            <p>{connected}</p>
            <Navbar/>
            <div className = 'texteAccueil'>
                <p>Ce site n'est pas un catalogue de tous les volcans exitants.<br/>
                C'est un lieu d'échange pour partager vos plus belles photos et vos expériences concernant les volcans.<br/>
                N'hésitez à nous faire découvrir vos meilleurs souvenirs et à nous faire rêver.
                </p>
            </div>
        </div>
    )
}

export default Accueil;