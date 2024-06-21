import React, {useContext, useState, useEffect} from 'react';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import { VolcanoContext } from '../../utils/context/VolcanoProvider';
import { useNavigate } from 'react-router-dom';
import { Carousel} from 'react-responsive-carousel';
import Pictogram from '../../components/Pictogram';

function Description(){
    const {connected} = useContext(ConnectedContext);
    const {volcanoId} = useContext(VolcanoContext);
    const navigate = useNavigate();
    const [volcan, updateVolcan] = useState([]);
    const [images, updateImages] = useState([]);

    useEffect(() => {
        fetch ('http://localhost:3000/api/volcans/')
        .then((res) => {
            if (res.ok){
                return res.json()
            }
        })
        .then ((value) => {console.log(value.volcans[0]._id," ",volcanoId);
            let volcano = value.volcans.filter((e) => e._id === volcanoId);
            updateVolcan(volcano[0].name);
            updateImages(volcano[0].imagesUrl);
            console.log(volcano[0].imagesUrl);
        })
        .catch ((err) => {
            console.log('erreur ',err);
            navigate('/Error');
        })
    },[])
    return (
        <>
            <Pictogram connected = {connected}/>
            <h1>{volcan}</h1>
            {images.map((e,index) => <img src= {e} alt = {index} style = {{width: 300}}></img>)}

        </>
    )
}

export default Description;