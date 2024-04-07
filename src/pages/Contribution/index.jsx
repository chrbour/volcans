import React, { useState, useContext } from 'react';
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';
import typeVolcan from '../../assets/EruptionType.jpg';
import { ConnectedContext } from '../../utils/context/ConnectedProvider';

function Contribution(){
    const {connected} = useContext(ConnectedContext);
    const [pictures, setPictures] = useState([]);
    const previewImage = (e) => {
        let fileList = [];
        for (let i=0; i < e.target.files.length; i++){
            fileList.push(e.target.files[i])
        }
        setPictures(fileList);
    }
    const createVolcano = (event) => {
        event.preventDefault();
        
        let volcan = {test: 'C\'est un test'};
        console.log('Super tout marche !', volcan);
        fetch('http://localhost:3000/api/volcans',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(volcan)
            }) 
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then ((value) => {
                   alert('tre')
            })
            .catch((res,err) => {
                console.log(err)
        })
    }
        /*fetch("http://localhost:3000/api/auth/signup",{
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
                console.log(err);*/

    
return(
    <>
        <Banner/>
        <Pictogram connected = {connected}/>
        <Navbar/>
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        {connected === 'Connected'?
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <form id = 'contribution__formContainer' onSubmit =  {createVolcano}>
                    <div id = "contribution__form">
                        <div >
                            <div>
                                <label htmlFor='volcanoName'>Nom du volcan: </label>
                                <input type = "text" id = "volcanoName" placeholder='Nom' required></input>
                            </div><br/>
                            <div>
                                <label htmlFor='constribution__description'>Description: </label><br/>
                                <textarea type = "text" id = "contribution__description" required placeholder='Très joli volcan'></textarea><br/><br />
                            </div>
                            <fieldset id = 'contribution__volcanoType' style = {{display: 'flex'}}>
                                <legend>Type de Volcan</legend>
                                <div>                            
                                    <input type = 'radio' id = 'contribution__type1' value = "Explosif" required name = "volcanoType"></input>
                                    <label htmlFor = "contribution__type1">Explosif</label>
                                </div>
                                <div>
                                    <img src = {typeVolcan} style = {{margin: '0 5px',height: '200px'}} alt = "Type d'éruption"></img>
                                </div>
                                <div>
                                    <input type = 'radio' id = 'contribution__type2' value = 'Effusif' name = 'volcanoType'></input>
                                    <label htmlFor = 'contribution__type2'>Effusif</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <label id = 'contribution__imgBtn' htmlFor = 'contribution__volcanoFiles'>Choisir une image</label><br/>
                            <input type = 'file' onChange = {previewImage} id = 'contribution__volcanoFiles' name = "file" accept = "image/jpeg, image/jpg, image/png" multiple></input><br/>
                            <div id = 'contribution__pictures'>
                                {pictures.map((e,index) =>{console.log(pictures);
                                return  <>
                                            <img src = {URL.createObjectURL(e)} alt = {`Volcan n°${index+1}`} key = {`image_${index+1}`} style = {{width: 150, height: 100, margin: '30px'}}/>
                                        </>
                            }
                            )}
                            </div>
                        </div>
                    </div>
                    {pictures.length > 0 ? 
                        <input type = 'submit' value = 'Enregistrer' style = {{fontSize: '18px'}} name = 'contribution__save'></input> 
                        : null}
                </form>
                
            </div>
            :
            <>
                <br/><h1 id = 'contribution__NoConnected'>Vous devez être connecté pour ajouter une nouvelle contribution.</h1>
            </>
            }
    </>
)
}
export default Contribution;