import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';
import typeVolcan from '../../assets/EruptionType.jpg';
import { ConnectedContext } from '../../utils/context/ConnectedProvider';

function Contribution(){
    const {connected} = useContext(ConnectedContext);
    const [pictures, setPictures] = useState([]);
    const navigate = useNavigate();
    const previewImage = (e) => {
        let fileList = [];
        for (let i=0; i < e.target.files.length; i++){
        fileList.push(e.target.files[i])
        }
        setPictures(fileList);
    }
   
    const createVolcano = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
    
        fetch('http://localhost:3000/api/volcans/',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
            }) 
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then ((value) => {
                    function waitBeforeMoving(){
                        navigate("/Accueil")
                    }
                   setTimeout(waitBeforeMoving,2000);
            })
            .catch((res,err) => {
                console.log(err)
        })
    }     

return(
    <>
        <Banner/>
        <Pictogram connected = {connected}/>
        <Navbar/>
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        {connected === 'Connected'?
            <div id = 'contribution__Page'>
                <form id = 'contribution__formContainer' onSubmit =  {createVolcano} enctype = 'multipart/form-data'>
                    <div id = "contribution__form">
                        <div >
                            <div>
                                <label htmlFor='volcanoName'>Nom du volcan: </label>
                                <input type = "text" id = "volcanoName" name = 'volcanoName' placeholder = 'Nom' required></input>
                            </div><br/>
                            <div>
                                <label htmlFor='constribution__description'>Description: </label><br/>
                                <textarea type = "text" id = "contribution__description" name = 'contribution__description' required placeholder='Très joli volcan'></textarea><br/><br />
                            </div>
                            <fieldset id = 'contribution__volcanoType'>
                                <legend>Type de Volcan</legend>
                                <div>                            
                                    <input type = 'radio' id = 'contribution__type1' value = "Explosif"  name = "contribution__volcanoType" required></input>
                                    <label htmlFor = "contribution__type1">Explosif</label>
                                </div>
                                <div>
                                    <img id = 'contribution__volcanoTypeImage' src = {typeVolcan} alt = "Type d'éruption"></img>
                                </div>
                                <div>
                                    <input type = 'radio' id = 'contribution__type2' value = 'Effusif' name = 'contribution__volcanoType'></input>
                                    <label htmlFor = 'contribution__type2'>Effusif</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <label id = 'contribution__imgBtn' htmlFor = 'contribution__volcanoFiles'>Choisir une image</label><br/>
                            <input type = 'file' onChange = {previewImage} id = 'contribution__volcanoFiles' name = "uploadedFiles" accept = "image/jpeg, image/jpg, image/png" multiple></input><br/>
                            <div id = 'contribution__pictures'>
                                {pictures.map((e,index) =>{
                                return  <>
                                            <img id = 'contribution__volcanoFilesImage' src = {URL.createObjectURL(e)} alt = {`Volcan n°${index+1}`} key = {`image_${index+1}`} />
                                        </>
                            }
                            )}
                            </div>
                        </div>
                    </div>
                    {pictures.length > 0 ? 
                        <input id = 'contribution__submit' type = 'submit' value = 'Enregistrer' name = 'contribution__save'></input> 
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