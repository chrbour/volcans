import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Banner from '../../components/Banner';
import Pictogram from '../../components/Pictogram';
import { ConnectedContext } from '../../utils/context/ConnectedProvider';

function Contribution(){
    const {connected} = useContext(ConnectedContext);
    const [pictures, setPictures] = useState([]);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const previewImage = (e) => {
        let fileList = [];
        if(e.target.files.length > 6){
            window.alert("Vous ne pouvez pas ajouter plus de 6 images.");
            return;
        }
        for (let i=0; i < e.target.files.length; i++){console.log(typeof e.target.files,e.target.files[i]);
            const img = new Image();
            img.src = URL.createObjectURL(e.target.files[i]);
            img.key = `ima_${i+1}`;
            img.onload = () => {
                if(img.width > img.height){
                    fileList.push(e.target.files[i]);
                    setPictures(fileList);
                }
                else {
                    let filesArray = Array.from(e.target.files);
                    filesArray.splice(i,1);
                    let dt = new DataTransfer();
                    filesArray.forEach(file => {
                        dt.items.add(file);
                    });
                    e.target.files = dt.files;
                }
            } 
            window.URL.revokeObjectURL(e.target.files[i]);  
        }
    }
    const goToAccueil = () => {
        navigate("/Accueil/");
    }

    const testingName = (e) => {
        if (e.target.value === '') {
            setChecked(false);
            return;
        }const name = e.target.value.toLowerCase();
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
                http = "https://fr.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + e.target.value.split(' ').join('%20') + "%20volcano&prop=coordinates&redirects=1&format=json&origin=*";
                fetch(http)
                    .then((res) => {
                        if (res.ok){
                            return res.json();
                        }
                    })
                    .then((data) => {   
                        const pages = data.query.pages;
                        const pageId = Object.keys(pages);
                        if(!pageId.includes(testExistItem)){
                            e.target.value = '';
                            window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                            setChecked(false);
                        } 
                        else {
                            setChecked(true);
                            volcanoTypes(e.target.value);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                        e.target.value = '';
                        setChecked(false);
                    })                 
            })
            .catch((err) => {
                console.log(err);
                window.alert("Le nom du volcan n'a pas été trouvé sur Wikipédia, veuillez vérifier l'orthographe.");
                e.target.value = '';
                setChecked(false);
            });
        
    }
    const volcanoTypes = (name) => {
        console.log('volcanoTypes', name);
        fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${name}`)
        .then((res) => {
            if (res.ok){
                return res.json();
            }
        })
        .then((data) => {
            console.log("Datas : ", data.extract,data.extract.includes('actif'));
        })
        .catch((err) => {
            console.log(err);
        })
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
return(
    <>
        <Banner/>
        <Pictogram connected = {connected}/>
        <h1 className = "contribution__title">CONTRIBUTION</h1>
        {connected === 'Connected'?
            <div id = 'contribution__Page'>
                <form id = 'contribution__formContainer' onSubmit =  {createVolcano} encType = 'multipart/form-data'> 
                    <div id = "contribution__form">
                        <div id = "contribution__form--details" >
                            <div>
                                <label htmlFor='volcanoName'>Nom du volcan: </label>
                                <input type = "text" id = "volcanoName" name = 'volcanoName' placeholder = 'Nom' required onBlur = {testingName}></input>
                                {checked === true ? <span style = {{color: 'green', fontSize: '20px', marginLeft: '10px'}}>&#10003;</span> : null
                                }
                            </div>
                            <br/>
                            <div>
                                <label htmlFor='constribution__description'>Description: </label><br/>
                                <textarea type = "text" id = "contribution__description" name = 'contribution__description' required placeholder='Partage-nous ton expérience'></textarea><br/><br />
                            </div>
                        </div>
                        <div id = "contribution__form--imgContainer" >
                            <div id = "contribution__form--imgContainer--input">
                                <label id = 'contribution__imgBtn' htmlFor = 'contribution__volcanoFiles'>Choisir une image</label><br/>
                                <input type = 'file' onChange = {previewImage} onClick = {() => setPictures([])} id = 'contribution__volcanoFiles' name = "uploadedFiles" accept = "image/jpeg, image/jpg, image/png" multiple ></input><br/>
                                <p>Seules les images horizontales seront ajoutées</p>
                            </div>
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