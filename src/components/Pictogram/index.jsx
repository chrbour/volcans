import React from 'react';
import pictoN from "../../assets/pictoNoir.jpg";
import pictoV from "../../assets/pictoVert.jpg";

function Pictogram({connected}){console.log('Pictogram: ', connected);
        let picto = pictoN;
        let pictoAlt = "Pictogramme Noir";
        if (connected === 'Connected'){console.log('oui');
            picto = pictoV;
            pictoAlt = "Pictogramme Vert";
        }
        return(
            <img className = "picto" src = {picto} alt = {pictoAlt}></img>
        )
}

export default Pictogram;
