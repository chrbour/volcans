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
    const [creator, updateCreator] = useState();
    const [images, updateImages] = useState([]);
    const [comment, updateComment] = useState('');
    const [likes, updateLikes] = useState('');
    const [dislikes, updtaeDislikes] = useState('');
    const [adress, updateAdress] = useState('');
    const [summary, updateSummary] = useState('');
    
    function fetchVolcanoWiki(name){
        fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${name}`)
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then((data) => {
                updateSummary(data.extract);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    function fetchVolcanoAPI(){
        fetch (`http://localhost:3000/api/volcans/${volcanoId}`)
            .then((res) => {console.log(res.status);
                if (res.ok){
                    return res.json()
                }
            })
            .then ((value) => {
                updateVolcan(value.name);
                updateImages(value.imagesUrl);
                updateComment(value.description);
                updateCreator(value.userId);
                updateLikes(value.likes);
                updtaeDislikes(value.dislikes);
                updateAdress('https://fr.wikipedia.org/wiki/'+ value.name);
                fetchVolcanoWiki(value.name.split(' ').join('%20'));
            })
            .catch ((err) => {
                console.log('erreur ',err);
                navigate('/Error');
            })
        }

        const token = localStorage.getItem("token");console.log('token', token);
        let user = '';
    
        useEffect(() => {
            fetchVolcanoAPI();
        },[volcanoId,navigate,volcan,token]);
        
        const tokenExists = new Promise((resolve, reject) => {
            if(token){
                const payload = token.split('.')[1];   // partie payload
                const decoded = atob(payload);         // decode base64
                user = JSON.parse(decoded).userId;
                console.log("creator: ",creator,"\n", "userId: ", user);
                console.log(decoded.userId);
                resolve("Token OK");
            }
            else{
                reject("Pas de token");
            }
        })
       tokenExists
        .then(result => console.log("Résultat: ",result))
        .catch(erreur => console.log("Erreur: ", erreur))

    return (
        <>
            <Pictogram connected = {connected}/>
            <h1>{volcan}</h1>
            <Navbar />
            <div id = "description">       
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
                    {creator === user? <button >Modifier les photos</button> : null}
                </div>
                <div>
                    <MapWrapper name = {volcan} typeView = "global"/>
                    <MapWrapper name = {volcan} typeView = "volcan"/> 
                </div>
                <div id = "description__text">
                    <div id = "description__details">
                        <h2>Description de ce Volcan :  <a href={adress} rel ="noreferrer" target = "_blank">Détail</a></h2><br />
                        <p>{summary}</p>
                    </div>
                    <div id = "description__comment">
                        <h2>Commentaire partagé :</h2>
                        <p>{comment}</p>   
                    </div>
                    {/* <div id = "description__likesDislikes">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <p>{likes}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <i class="fa-regular fa-thumbs-down"></i>
                        {dislikes}
                    </div> */}
                    {creator === user?<button >Modifier commentaire</button> : null}
                </div>
                
            </div>
            <div id = "description1">{creator === user?<button >Supprimer cette fiche</button>:null}</div>
            
        </>
    )
}

export default Description;