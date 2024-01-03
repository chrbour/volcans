import React from "react";
import {Link} from 'react-router-dom';

export default function Navbar(){
    return(
        <div >
            <div className="menuAccueil">
                <button >Voir les photos</button>
                <button>Ajouter contribution</button>
                <button><Link to = '/Connexion'>Connexion</Link></button>
                <button><Link to = '/Inscription'>Inscription</Link></button>
            </div>
        </div>
    )
}