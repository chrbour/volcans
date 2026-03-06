import React, {useContext, useState, useEffect} from 'react';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import { VolcanoContext } from '../../utils/context/VolcanoProvider';
import { useNavigate } from 'react-router-dom';
import { Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Pictogram from '../../components/Pictogram';
import Navbar from '../../components/Navbar';
import MapWrapper from '../../components/MapWrapper'

function Description(){
    const {connected} = useContext(ConnectedContext);
    const {volcanoId} = useContext(VolcanoContext);
    const navigate = useNavigate();
    const [volcan, updateVolcan] = useState('');
    const [images, updateImages] = useState([]);
    const [adress, updateAdress] = useState('');
    const [coords, updateCoords] = useState([]);
    

    
    useEffect(() => {
        fetch ('http://localhost:3000/api/volcans/')
        .then((res) => {
            if (res.ok){
                return res.json()
            }
        })
        .then ((value) => {
            let volcano = value.volcans.filter((e) => e._id === volcanoId);
            updateVolcan(volcano[0].name);
            updateImages(volcano[0].imagesUrl);
            updateAdress('https://fr.wikipedia.org/wiki/'+ volcano[0].name);
        })
        .catch ((err) => {
            console.log('erreur ',err);
            navigate('/Error');
        })
    },[volcanoId,navigate,volcan]);
    return (
        <>
            <Pictogram connected = {connected}/>
            <h1>{volcan}</h1>
            <Navbar />
            <div style = {{display: 'flex'}}>
                <div>
                    <Carousel className = "crsl">
                        {images.map((e, index) =>{
                            return (
                                <div>
                                    <img src= {e} alt = {index} ></img>
                                    <p className = 'legend' key={index}>Image n°{index+1}</p>
                                </div>
                                )}
                            )}  
                    </Carousel>
                    <h3>c'est un test</h3>
                    <form action={adress} target = "_blank">
                        <button type='submit' >BOUTON</button>
                    </form>
                </div>
                <div>
                    <MapWrapper name = {volcan} typeView = "global"/>
                    <MapWrapper name = {volcan} typeView = "volcan"/> 
                </div>
            </div>
        </>
    )
}

export default Description;