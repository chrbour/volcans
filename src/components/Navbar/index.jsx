import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";

export default function Navbar(){
    const {connected} = useContext(ConnectedContext);
    return(
        <>
            <div className="menuAccueil">
                <button ><Link to = '/Photos'>Voir les photos</Link></button>
                <button><Link to = '/Contribution'>Ajouter contribution</Link></button>
                <button><Link to = '/Connexion'>Connexion</Link></button>
                {connected === 'Connected'? null : <button><Link to = '/Inscription'>Inscription</Link></button>}
            </div>
        </>
    )
}