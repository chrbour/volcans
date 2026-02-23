import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";

export default function Navbar(){
    const {connected} = useContext(ConnectedContext);
    const {setConnected} = useContext(ConnectedContext);
    const deconnect = () => {
        setConnected('Not Connected');
        localStorage.removeItem('token');
    }
    return(
        <>
            <div className="menuAccueil">
                <Link to = '/Photos' title = "Voir toutes les photos partagées" className="button">Voir les photos</Link>
                {connected === "Connected"? 
                    <>
                        <Link to = '/Contribution' className="button" title = 'Modifie/ajoute des photos'>Ajouter contribution</Link>
                        <p onClick = {deconnect} className="button" title = 'Déconnexion de l&apos;utilisateur' >Déconnexion</p>
                    </> 
                    : 
                    <>
                        <Link to = '/Connexion' className="button" title = 'Connecte-toi pour modifier/ajouter des photos'>Connexion</Link>
                        <Link to = '/Inscription' className="button" title = 'Crée un compte pour te connecter et accéder aux fonctionnalités du site'>Inscription</Link>
                    </>
                }
            </div>
        </>
    )
}