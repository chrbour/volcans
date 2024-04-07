import React, { useContext } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Banner from '../../components/Banner';
import Pictogram from "../../components/Pictogram";
import { ConnectedContext } from '../../utils/context/ConnectedProvider';

function Inscription(){
    let regexEmail = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}/g;
    const {connected, setConnected} = useContext(ConnectedContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form  = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const mdp = formData.get('mdp');
               
        if (email.match(regexEmail) != null){
            let user = {
                'email': email,
                'mdp': mdp
            }
            fetch("http://localhost:3000/api/auth/signup",{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then ((value) => {
                if (value.message === 'doublon'){
                    alert('Erreur: Cet identifiant est déjà utilisé.');
                    form.reset();
                }
                else {
                    setConnected('Connected');
                    alert('Bienvenue sur le site des Volcans.\nInscription OK');
                    navigate("/Accueil/");
                }
            })
            .catch((res,err) => {
                console.log(err);
            });
        }
        else {
            alert('L\'adresse mail n\'est pas valide !');
            form.reset();
        }
    }
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
            <div className = 'inscription__page'>
                <div className = 'inscription__header'>
                    <h1 className = 'inscription__title'>INSCRIPTION</h1>
                </div>
                <form className = 'inscription__form' onSubmit = {handleSubmit}>
                    <label htmlFor = "mail">Adresse mail: </label>
                    <input type = 'email' name = 'email' id = "mail" required ></input><br /><br />
                    <label htmlFor = 'mdp'>Mot de passe: </label>
                    <input type = 'text' name = 'mdp' id = 'mdp' required></input><br /><br />
                    <div className = 'inscription__buttons'>
                        <button type='submit' value = 'Envoyer' >Envoyer</button>
                        <Link to = '/Accueil'><button className = 'inscription__buttons--cancel'>Annuler</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Inscription;