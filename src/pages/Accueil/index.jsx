import React from "react";
import Banner from '../../components/Banner';
import Navbar from "../../components/Navbar";

function Accueil(){
    return(
        <div>
            <Banner/>
            <Navbar/>
            <h1 style={{color: "white"}}>Accueil</h1>
        </div>
    )
}

export default Accueil;