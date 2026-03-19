import { useContext, useState } from "react";
import Banner from '../../components/Banner';
import Pictogram from "../../components/Pictogram";
import {Link, useNavigate} from 'react-router-dom';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";

function Connexion(){
    let regexEmail = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}/g;
    const {connected} = useContext(ConnectedContext);
    const {setConnected} = useContext(ConnectedContext);
    const [connexion, setConnexion] = useState(0);
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
            
            fetch("http://localhost:3000/api/auth/login",{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then((res) => {
                return res.json();
            })
            .then((value) => {
                if (value.token) {
                    setConnected('Connected');
                    localStorage.setItem('token', value.token);
                    setConnexion(1);
                }
                else {
                setConnexion(3);
                } 
            })
            .catch((err) => {
                console.log(err);
                alert("Une erreur est survenue, veuillez réessayer plus tard");
            });  
        }
        else {
            setConnexion(2);
        }
    }
    const goToAccueil = () => {
        navigate("/Accueil/");
    }
    const refresh = () => {
        window.location.reload();
    }
    function Validate ({connexion}){
        if (connexion === 1){
            setTimeout(goToAccueil, 3000);
            return (<h2 className = 'connexion__messageOK'>Bienvenue sur le site des volcans</h2>)
        }
        else if (connexion === 2 ){
            setTimeout(refresh, 3000);
            return(<h2 className = 'connexion__messageNotOK'>Adresse mail non valide</h2>)
        }
        else if (connexion === 3 ){
            setTimeout(refresh, 3000);
            return(<h2 className = 'connexion__messageNotOK'>Paire mail / mot de passe incorrecte !</h2>)
        }
    }
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
            <div className = 'inscription__page'>
                <div className = 'inscription__header'>
                    <h1 className = 'inscription__title'>CONNEXION</h1>
                </div>
                <form className = 'inscription__form' onSubmit = {handleSubmit}>
                    <label htmlFor = "mail">Adresse mail: </label>
                    <input type = 'email' name = 'email' id = "mail" required ></input><br /><br />
                    <label htmlFor = 'mdp'>Mot de passe: </label>
                    <input type = 'text' name = 'mdp' id = 'mdp' required></input><br /><br />
                    {connexion === 0?
                        <div className = 'inscription__buttons'>
                            <button type ='submit' value = 'Envoyer' >Envoyer</button>
                            <Link to = '/Accueil ' className = 'connexion__buttons--cancel'>Annuler</Link>
                        </div>
                        :
                        <br/>
         }
                    <Validate connexion = {connexion}/>
                </form>
                
            </div>
        </div>
    )
}
export default Connexion;