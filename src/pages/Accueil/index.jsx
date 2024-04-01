import React from "react";
import Banner from '../../components/Banner';
import Navbar from "../../components/Navbar";
import Pictogram from '../../components/Pictogram';

function Accueil({connected}){
    console.log('Accueil: ',connected)
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
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