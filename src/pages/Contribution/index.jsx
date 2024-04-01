import React, { useState, Fragment } from 'react';
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';

function Contribution({connected}){
    const [pictures, setPictures] = useState([]);
    const previewImage = (e) => {
        let fileList = [];
        for (let i=0; i<e.target.files.length; i++){
            fileList.push(e.target.files[i])
        }
        setPictures(fileList);
    }
    
return(
    <>
        <Banner/>
        <Pictogram connected = {connected}/>
        <Navbar/>
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        {connected === 'Connected'?
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <form id = "contribution__form">
                    <div >
                        <div>
                            <label htmlFor='volcanoName'>Nom du volcan: </label>
                            <input type = "text" id = "volcanoName" placeholder='Nom'></input>
                        </div><br/>
                        <div>
                            <label htmlFor='constribution__description'>Description: </label><br/>
                            <textarea type = "text" id = "contribution__description" placeholder='Très joli volcan'></textarea><br/><br />
                        </div>
                        <fieldset id = 'contribution__volcanoType'>
                            <legend>Type de Volcan</legend>
                            <div>
                                <input type = 'radio' id = 'contribution__type1' value = "Explosif" name = "volcanoType" checked></input>
                                <label htmlFor = "contribution__type1">Explosif</label>
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
                </form>
                {pictures.length>0? <input type = 'submit' value = 'Enregistrer' style = {{fontSize: '18px'}} name = 'contribution__save'></input> : null}
            </div>
            :
            <h1 id = 'contribution__NoConnected'>Vous devez être connecté pour ajouter une nouvelle contribution.</h1>
            }
    </>
)
}
export default Contribution;