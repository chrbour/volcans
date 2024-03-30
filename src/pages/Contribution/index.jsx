import React, { useState } from 'react';
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';

function Contribution(){
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
        <Pictogram/>
        <Navbar/>
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        <form style = {{display:'flex', justifyContent: 'center'}} className = "contribution__form">
            <div>
                <label htmlFor='volcanoName'>Nom du volcan: </label><br/>
                <input type = "text" id = "volcanoName" placeholder='Nom'></input><br/><br /><br />
                <label htmlFor='volcanoDescription'>Description: </label><br/>
                <textarea type = "text" id = "volcanoDescription" placeholder='Très joli volcan' style = {{backgroundColor:'#8CC152', width: 500, height: 300}}></textarea><br/>
            </div>
            <div>
                <label style = {{cursor: 'pointer', color: '#00b1ca', fontWeight: 'bold'}} htmlFor = 'volcanoFile'>Choisir une image</label><br/>
                <input type = 'file' onChange = {previewImage} id = 'volcanoFile' style = {{display: 'none'}} name = "file" accept = "image/jpeg, image/jpg, image/png" multiple></input><br/>
                <div style = {{display: 'flex'}}>
                    {pictures.map((e,index) =>{console.log(pictures);
                    return <>
                                <img src = {URL.createObjectURL(e)} alt = {`Volcan n°${index+1}`} key = {`image_${index+1}`} style = {{width: 150, height: 100, margin: '0px 30px'}}/>
                            </>
                }
                )}
                </div>
            </div>
        </form>
    </>
)
}
export default Contribution;