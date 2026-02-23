import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';
import typeVolcan from '../../assets/EruptionType.jpg';
import { ConnectedContext } from '../../utils/context/ConnectedProvider';

function Contribution(){
    const {connected} = useContext(ConnectedContext);
    const [format, setFormat] = useState('DMS');
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
    const btnFormat = (e) => {console.log(e.target.value);
        if (e.target.value == 'DMS'){
            setFormat('DMS');
        }
        else {
            setFormat('DD')
        }
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
                        <img id = 'contribution__volcanoTypeImage' src = {typeVolcan} alt = "Type d'éruption"></img>
                        <div >
                            <div>
                                <label htmlFor='volcanoName'>Nom du volcan: </label>
                                <input type = "text" id = "volcanoName" name = 'volcanoName' placeholder = 'Nom' required></input>
                            </div><br/>
                            <div>
                                <div onChange = {btnFormat}>
                                    <span>Coordonnées GPS:</span>
                                    <input type = 'radio' name = 'GPSformat' id = 'DMS' checked value = 'DMS'></input>
                                    <label htmlFor = 'GPSformat'>DMS</label>
                                    <input type = 'radio' name = 'GPSformat' id = 'DD' value = 'DD' ></input>
                                    <label htmlFor = 'GPSformat'>DD</label>
                                </div>
                                <div>
                                    <input type = 'number' id = 'volcanoGPSlat__DMS--D' min = '0' max = '90' style = {{width:'30px'}}></input>
                                    <span>° </span>
                                    <input type = 'number' id = 'volcanoGPSlat__DMS--M' min = '0' max = '60' style = {{width:'30px'}}></input>
                                    <span>' </span>
                                    <input type = 'number' id = 'volcanoGPSlat__DMS--S' min = '0' max = '60' step = '0.00001' style = {{width:'90px'}}></input>
                                    <span>" </span>
                                    <select name = 'lat' id = 'lat'>
                                        <option value = 'N'>N</option>
                                        <option value = 'S'>S</option>
                                    </select>
                                </div>
                                <div>
                                    <input type = 'number' id = 'volcanoGPSlng__DMS--D' min = '0' max = '90' style = {{width:'30px'}}></input>
                                    <span>° </span>
                                    <input type = 'number' id = 'volcanoGPSlng__DMS--M' min = '0' max = '60' style = {{width:'30px'}}></input>
                                    <span>' </span>
                                    <input type = 'number' id = 'volcanoGPSlng__DMS--S' min = '0' max = '60'  step = '0.00001' style = {{width:'90px'}}></input>
                                    <span>" </span>
                                    <select name = 'lng' id = 'lng'>
                                        <option value = 'O'>O</option>
                                        <option value = 'E'>E</option>
                                    </select>
                                </div>
                                    : 
                                    <div>
                                        <p>Format DD</p>
                                    </div>
                            </div>
                            <div>
                                <label htmlFor='constribution__description'>Description: </label><br/>
                                <textarea type = "text" id = "contribution__description" name = 'contribution__description' required placeholder='Très joli volcan'></textarea><br/><br />
                            </div>
                            
                                <div>                        
                                    <input type = 'radio' id = 'contribution__type1' value = "Explosif"  name = "contribution__volcanoType" required></input>
                                    <label htmlFor = "contribution__type1" >Explosif</label>
                                    <input type = 'radio' id = 'contribution__type2' value = 'Effusif' name = 'contribution__volcanoType'></input>
                                    <label htmlFor = 'contribution__type2'>Effusif</label>
                                </div>   
                           
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