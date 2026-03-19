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
    const navigate = useNavigate();
    const {connected} = useContext(ConnectedContext);
    const {volcanoId} = useContext(VolcanoContext);
    const [volcan, updateVolcan] = useState();
    const [creator, updateCreator] = useState();
    const [images, updateImages] = useState([]);
    const [imagesModified, updateImagesModified] = useState([]);
    const [comment, updateComment] = useState();
    const [commentModified, updateCommentModified]= useState();
    const [address, updateaddress] = useState();
    const [summary, updateSummary] = useState();
    const [modifyOrDelete, updateModifyOrDelete] = useState();
    
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
            .then((res) => {
                if (res.ok){
                    return res.json()
                }
            })
            .then ((value) => {
                updateVolcan(value.name);
                updateImages(value.imagesUrl);
                updateComment(value.description);
                updateCreator(value.userId);
                updateaddress('https://fr.wikipedia.org/wiki/'+ value.name);
                fetchVolcanoWiki(value?.name.split(' ').join('%20'));
            })
            .catch ((err) => {
                console.log('erreur ',err);
                navigate('/Error');
            })
        }

    const token = localStorage.getItem("token");
    let user = '';

    useEffect(() => {
        fetchVolcanoAPI();
    },[volcanoId,navigate,volcan,token]);
    
    const tokenExists = new Promise((resolve, reject) => {
        if(token && connected === 'Connected'){
            const payload = token.split('.')[1];   // partie payload
            const decoded = atob(payload);         // decode base64
            user = JSON.parse(decoded).userId;
            resolve("Token OK");
        }
        else{
            localStorage?.remove('token');
            reject("Pas de token");
        }
    })
    tokenExists
    .then(result => console.log("Résultat: ",result))
    .catch(erreur => console.log("Erreur: ", erreur));

    const deleteFile = ((e) => {
        e.preventDefault();
        updateModifyOrDelete("confirmDelete");
        e.target.classList.add("hidden");
        document.querySelector('#description__modifyPhotos--label').classList.add('hidden');
        document.querySelector('#modifyCommentButton').classList.add('hidden');
    })

    const deleteCanceled = ((e) => {
        e.preventDefault();
        document.querySelector("#deleteButton").classList.remove("hidden");
        document.querySelector('#description__modifyPhotos--label').classList.remove('hidden');
        document.querySelector('#modifyCommentButton').classList.remove('hidden');
        updateModifyOrDelete('');
    })

    const deleteConfirmed = (() => {
        fetch (`http://localhost:3000/api/volcans/${volcanoId}`, {
            method: "DELETE",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
                "content-Type": 'application/json'
            }
        })
        .then((res) => {
            return res.json();
        }
        )
        .then(() => {
            document.querySelector("#deleteFile").innerHTML = "<p>Volcan supprimé</p>";
            setTimeout(()=> {document.querySelector("#carousel").classList.add("hidden")}, 1000);
            setTimeout(()=> {document.querySelector("#globeMap").classList.add("hidden")}, 1200);
            setTimeout(()=> {document.querySelector("#description__text").classList.add("hidden")}, 1400);
            setTimeout(()=> {navigate("/Accueil")}, 2000);
        })
        .catch(() => alert("Problème de suppression de la fiche. Veuillez réessayer plus tard."))
    });

    const modifyComment = () => {
        updateCommentModified(comment);
        updateModifyOrDelete('modifyComment');
        document.querySelector("#deleteButton").classList.add("hidden");
        document.querySelector('#description__modifyPhotos--label').classList.add('hidden');
        document.querySelector('#modifyCommentButton').classList.add('hidden');
        document.querySelector('#description__comment').classList.add('hidden');
    }
    const modifyCommentCanceled = () => {
        updateModifyOrDelete('');
        document.querySelector("#deleteButton").classList.remove("hidden");
        document.querySelector('#description__modifyPhotos--label').classList.remove('hidden');
        document.querySelector('#modifyCommentButton').classList.remove('hidden');
        document.querySelector('#description__comment').classList.remove('hidden');
    }

    const modifyCommentChangeText = (e) => {
        e.preventDefault();
        updateCommentModified(e.target.value);
    }

    const modifyCommentConfirm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const comment = formData.get('textareaComment');
        fetch(`http://localhost:3000/api/volcans/${volcanoId}`,{
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({description: comment})
        }) 
        .then((res) => {
            if (res.ok){
                return res.json()
            }
        })
        .then(() => {
            updateComment(commentModified);
            updateModifyOrDelete('');
            document.querySelector("#deleteButton").classList.remove("hidden");
            document.querySelector('#description__modifyPhotos--label').classList.remove('hidden');
            document.querySelector('#modifyCommentButton').classList.remove('hidden');
            document.querySelector('#description__comment').classList.remove('hidden');
        })
        .catch((err) => {
                console.log(err);
                alert("Une erreur est survenue, veuillez réessayer plus tard");
        })
    }

    const changingImages = (e) => { 
        if (e.target.files.length > 6) {
            window.alert("Vous ne pouvez pas ajouter plus de 6 images.");
            return;
        }
         document.querySelector('#description__modifyPhotos--label').innerHTML = "Modifier les images";
        const filesArray = Array.from(e.target.files);

        const promises = filesArray.map((file) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = URL.createObjectURL(file);

                img.onload = () => {
                    if (img.width > img.height) {
                        resolve({ file, error: false });
                    } else {
                        resolve({ file, error: true });
                    }

                    URL.revokeObjectURL(img.src);
                };
            });
        });

        Promise.all(promises).then(results => {

            const validFiles = results
                .filter(r => !r.error)
                .map(r => r.file);
            
            const formData = new FormData();

            validFiles.forEach(file => {
                formData.append("imagesUrl", file);
            });
            if (validFiles != ''){
                fetch(`http://localhost:3000/api/volcans/${volcanoId}/images`,{
                    method: 'PUT',
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
                .then((value) => {
                    updateImages(value.images);
                    document.querySelector("#deleteButton").classList.remove("hidden");
                    document.querySelector('#description__modifyPhotos--label').classList.remove('hidden');
                    document.querySelector('#modifyCommentButton').classList.remove('hidden');
                })
                .catch((err) => {
                        console.log(err);
                        alert("Une erreur est survenue, veuillez réessayer plus tard");
                })
            }
        });        
    }
    return (
        <>
            <Pictogram connected = {connected}/>
            <h1>{volcan}</h1>
            <Navbar />
            <div id = "description">       
                <div id = "carousel">
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
                    {creator === user? 
                        <>
                            <div id = 'description__modifyPhotos--container'>
                                <label htmlFor = "description__modifyPhotos--button" id = "description__modifyPhotos--label">Modifier les images</label>
                                <input type ='file' id = "description__modifyPhotos--button" name = 'changeImages' onChange = {changingImages} accept = "image/jpeg, image/jpg, image/png" multiple></input>
                            </div>
                            <p>Seules les images horizontales seront ajoutées</p>
                        </>
                        : null
                    }
                </div>
                <div id = "globeMap">
                    <MapWrapper name = {volcan} typeView = "global"/>
                    <MapWrapper name = {volcan} typeView = "volcan"/> 
                    {creator === user?<button id = "deleteButton" onClick = {deleteFile}>Supprimer ce volcan</button>:null}
                </div>
                <div id = "description__text">
                    <div id = "description__details">
                        <h2>Description de ce Volcan :  <a href={address} rel ="noreferrer" target = "_blank">Détail</a></h2><br />
                        <p>{summary}</p>
                    </div>
                    {modifyOrDelete === 'modifyComment'?
                    <form id = 'description__modifyComment--container' onSubmit = {modifyCommentConfirm}>
                        <h2>Modification du commentaire:</h2>
                        <textarea id = 'description__modifyComment--textarea' name = "textareaComment" type="text" value = {commentModified} onChange = {modifyCommentChangeText}/>
                        <div id = 'description__modifyComment--buttons'>
                            <input type="submit" value = 'Valider'/>
                            <input type="button" value = 'annuler' onClick = {modifyCommentCanceled}/>
                        </div>
                    </form>
                    :null }
                    <div id = "description__comment">
                        <h2>Commentaire partagé :</h2>
                        <p>{comment}</p>   
                    </div>
                    {creator === user?<button id = "modifyCommentButton" onClick = {modifyComment}>Modifier commentaire</button> : null}
                </div>
            </div>
            <div id = "description1"></div>
            {modifyOrDelete === "confirmDelete"?
                <div id = "deleteFile">
                    <p>Confirmez-vous la suppression de cette fiche?</p>
                    <button onClick = {deleteConfirmed}>Oui</button>
                    <button onClick = {deleteCanceled}>non</button>
                </div>:
                null
}
        </>
    )
}

export default Description;