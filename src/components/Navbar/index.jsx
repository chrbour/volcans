import React from "react";
import {Link} from 'react-router-dom';

export default function Navbar(){
    return(
        <>
            <div className="menuAccueil">
                <button ><Link to = '/Photos'>Voir les photos</Link></button>
                <button><Link to = '/Contribution'>Ajouter contribution</Link></button>
                <button><Link to = '/Connexion'>Connexion</Link></button>
                <button><Link to = '/Inscription'>Inscription</Link></button>
            </div>
        </>
    )
}