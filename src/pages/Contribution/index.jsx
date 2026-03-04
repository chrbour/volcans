import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Banner from '../../components/Banner';
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
    const goToAccueil = () => {
        navigate("/Accueil/");
    }

    const testingName = (e) => {
        if (e.target.value === '') return;
        const name = e.target.value.toLowerCase();
        const mots = name.split(' ');
        if (mots[0] ==='le' || mots[0] === 'la' || mots[0] === 'les' || mots[0] === 'l\''){
            mots.shift();
        }
        let word = mots[0].split('');
        word[0] = word[0].toUpperCase();
        mots[0] = word.join('');
        for (let i=1; i < mots.length; i++){
            if (mots[i] === 'de' || mots[i] === 'du' || mots[i] === 'des' || mots[i] === 'd\'' || mots[i] === 'et' || mots[i] === 'à' || mots[i] === 'au' || mots[i] === 'aux' || mots[i] === 'le' || mots[i] === 'la' || mots[i] === 'les' || mots[i] === 'l\''){}
            else {
                word = mots[i].split('');
                word[0] = word[0].toUpperCase();
                mots[i] = word.join('')
            }
        }
        e.target.value = mots.join(' ');
        let testExistItem;
        let http = "https://fr.wikipedia.org/w/api.php?action=query&titles=" + e.target.value.split(' ').join('%20') + "&prop=coordinates&redirects=1&format=json&origin=*";
        console.log("http : ",http);
        fetch(http)
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then((data) => {   
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0];
                testExistItem = pageId;
                const coords = pages[pageId].coordinates[0];
                e.target.value = pages[pageId].title;
                console.log("PAGE 1 :");
                console.log("pages:", pages);
                console.log("pageId:", pageId);
                console.log("coordinates:", coords);
                console.log("Latitude:", coords.lat);
                console.log("Longitude:", coords.lon);
                http = "https://fr.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + e.target.value.split(' ').join('%20') + "%20volcano&prop=coordinates&redirects=1&format=json&origin=*";
                console.log("http : ",http);
                fetch(http)
                    .then((res) => {
                        if (res.ok){
                            return res.json();
                        }
                    })
                    .then((data) => {   
                        const pages = data.query.pages;
                        const pageId = Object.keys(pages);
                        
                        console.log("PAGE 2 :");
                        console.log("pages:", pages);
                        console.log("Correspondance: ", pageId.includes(testExistItem));
                        if(!pageId.includes(testExistItem)){
                            e.target.value = '';
                            window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                        } 
                    })
                    .catch((err) => {
                        console.log(err);
                        window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                        e.target.value = '';
                    })                 
            })
            .catch((err) => {
                console.log(err);
                window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                e.target.value = '';
            });
        
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
            .then (() => {
                    
                        navigate("/Accueil")
                   
            })
            .catch((res,err) => {
                console.log(err);
                alert("Une erreur est survenue, veuillez réessayer plus tard");
        })
    }     
    const btnFormat = (e) => {console.log(e.target.value);
        if (e.target.value === 'DMS'){
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
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        {connected === 'Connected'?
            <div id = 'contribution__Page'>
                <form id = 'contribution__formContainer' onSubmit =  {createVolcano} enctype = 'multipart/form-data'>
                    <div id = "contribution__form">
                        <div id = "contribution__form--details" >
                            <div>
                                <label htmlFor='volcanoName'>Nom du volcan: </label>
                                <input type = "text" id = "volcanoName" name = 'volcanoName' placeholder = 'Nom' required onBlur = {testingName}></input>
                            </div>
                            <br/>
                            {/* <div>
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
                            </div> */}
                            <div>
                                <label htmlFor='constribution__description'>Description: </label><br/>
                                <textarea type = "text" id = "contribution__description" name = 'contribution__description' required placeholder='Très joli volcan'></textarea><br/><br />
                            </div>
                            
                            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>  
                                <img id = 'contribution__volcanoTypeImage' src = {typeVolcan} alt = "Type d'éruption"></img>                      
                                <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <h2>Type de volcan :</h2>
                                    <br />
                                    <div>
                                        <input type = 'radio' id = 'contribution__type1' value = "Explosif"  name = "contribution__volcanoType" required></input>
                                        <label htmlFor = "contribution__type1" >Explosif</label>
                                    </div>
                                    <div>
                                        <input type = 'radio' id = 'contribution__type2' value = 'Effusif' name = 'contribution__volcanoType'></input>
                                        <label htmlFor = 'contribution__type2'>Effusif</label>
                                    </div>
                                </div>
                            </div>   
                           
                        </div>
                        <div id = "contribution__form--imgContainer" >
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
                    <div>
                        {pictures.length > 0 ? 
                            <input id = 'contribution__button--submit' type = 'submit' value = 'Enregistrer' name = 'contribution__save'></input> 
                            : null
                        }
                        <input id = 'contribution__button--cancel' type="button" value = "Annuler" onClick = {goToAccueil}/>
                    </div>
                </form>
                
            </div>
            :
            <div id = 'contribution__NoConnected'>
                <br/>
                <h1 id = 'contribution__NoConnected'>Vous devez être connecté pour ajouter une nouvelle contribution.</h1>
                <button id = 'contribution__NoConnected--btn' onClick = {goToAccueil}>Retour à l'accueil</button>
            </div>
            }
    </>
)
}
export default Contribution;