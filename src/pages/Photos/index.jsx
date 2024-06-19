import React, { useContext, useState } from "react";
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";

function Photos(){
    const {connected} = useContext(ConnectedContext);
    const [executedPage, updateExecutedPage] = useState(0);
    const [countImage, updateCountImage] = useState(0);
    const [images, updateImages] = useState({});
    const [volcanoNames, updateVolcanoNames] = useState ([]);
    const [selectedImages, updateSelectedImages] = useState({});
    const [displayImages, updateDisplayImages] = useState([]);
    const [identification, updateIdentification] = useState('');
    const [selectionNamesSize, updateSelectionNamesSize] = useState(4);

    let tab = [];
    let names = [];

    function selectImage(e){
        console.log('image',e.target.dataset.selectImageId);
        updateIdentification(e.target.dataset.selectImageId)
    }

    function handleLeft(e){
        e.preventDefault();
        updateCountImage(countImage-4);
        updateDisplayImages(selectedImages.slice(countImage-4, countImage));
    }

    function handleRight(e){
        e.preventDefault();
        updateCountImage(countImage+4);
        updateDisplayImages(selectedImages.slice(countImage+4, countImage+8));
        console.log('handleRight');
    }

    const typeSelection = (e) => {
        let selection = e.target.value;
        console.log(selection);
        updateSelectionNamesSize(4);
        switch (selection){
            case 'Tous':
                console.log('Tous est sélectionné') ;
                console.log(images);
                updateSelectedImages(images);
                updateCountImage(0);
                updateDisplayImages(images.slice(0, 4));
                names = images.map((e) => e.name);
                names = names.filter((element, index , arr) => arr.indexOf(element) === index);console.log("names ", names);
                updateVolcanoNames(names);
                break;
            case 'Effusif':
                console.log('Effusif est sélectionné') ;
                let effusifSelected = images.filter((element) => {
                    return element.type === 'Effusif'
                });
                console.log('effusifSelected ',effusifSelected);
                updateSelectedImages(effusifSelected);
                updateCountImage(0);
                updateDisplayImages(effusifSelected.slice(0, 4));
                names = effusifSelected.map((e) => e.name);
                names = names.filter((element, index , arr) => arr.indexOf(element) === index);console.log("names ", names);
                updateVolcanoNames(names);
                break;
            case 'Explosif':
                console.log('Explosif est sélectionné') ;
                let explosifSelected = images.filter((element) => {
                    return element.type === 'Explosif'
                });
                console.log(explosifSelected);
                updateSelectedImages(explosifSelected);
                updateCountImage(0);
                updateDisplayImages(explosifSelected.slice(0, 4));
                names = explosifSelected.map((e) => e.name);
                names = names.filter((element, index , arr) => arr.indexOf(element) === index);console.log("names ", names);
                updateVolcanoNames(names);
                break;    
            default: break;
        }
    }

    const volcanoNameSelection = (e) => {
        console.log(e.target.value);
        let selection = images.filter((el) => el.name === e.target.value);
        updateSelectedImages(selection);
        updateCountImage(0);
        updateDisplayImages(selection.slice(0, 4));
        updateVolcanoNames([e.target.value]);
        updateSelectionNamesSize(1);
    }
    const reinitialization = (e) => {
        updateSelectedImages(images);
        updateCountImage(0);
        updateDisplayImages(images.slice(0, 4));
        names = images.map((e) => e.name);
        names = names.filter((element, index , arr) => arr.indexOf(element) === index);console.log("names ", names);
        updateVolcanoNames(names);
        updateSelectionNamesSize(4);
        updateExecutedPage(0);
    }
    
    if (executedPage === 0){fetch('http://localhost:3000/api/volcans/') 
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
            })
            .then ((value) => {
                updateExecutedPage(1);
                for (let i=0; i<value.volcans.length; i++){
                    for (let j=0; j<value.volcans[i].imagesUrl.length; j++){
                        tab.push({id: value.volcans[i]._id, userId: value.volcans[i].userId, name: value.volcans[i].name, type: value.volcans[i].type, description: value.volcans[i].description, picture: value.volcans[i].imagesUrl[j], likes: value.volcans[i].likes, dislikes: value.volcans[i].dislikes});
                        names.push(value.volcans[i].name);
                    }
                }
                names = names.filter((val, index, arr) => arr.indexOf(val) === index);
                console.log("Nombre de volcans",value.volcans.length);
                console.log("names", names);
                updateImages(tab);console.log('tab',tab);
                updateSelectedImages(tab);
                updateVolcanoNames(names);
                if (tab.length >= 4){
                    updateDisplayImages (tab.slice(countImage, countImage+4));
                    console.log("display", tab.slice(countImage, countImage+4));
                }
                else {
                    updateDisplayImages (tab.slice(countImage));
                    console.log("display", tab.slice(countImage));
                }
                
                
            })
            .catch((res,err) => {
                console.log(err)
        });
    }      
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
            <Navbar/>
            <h1 className = 'Photos__Title'>APERCU DE VOS PLUS BEAUX PARTAGES DE VOLCANS:</h1>
            <div className="photo__body">
                <div className = "photos__container">
                    {countImage >=4?<p className = 'photos__arrowsContainer'><i className="photos__arrows fa-solid fa-caret-left" onClick={handleLeft}></i></p>:null}
                    {selectedImages.length > 0?
                        displayImages.map((e) => {
                            return <img onClick = {selectImage} className = 'photos__image' src={e.picture} alt = {e.name} data-selectImageId = {e.id} ></img>  
                        })
                        : null
                    }
                    {countImage+4 <= selectedImages.length-1 ? <p className = 'photos__arrowsContainer'><i className = "photos__arrows fa-solid fa-caret-right" onClick={handleRight}></i></p> : null}
                </div>
            </div>
            <h2 className = 'filtres__Section'>FILTRES:</h2>            
            <div className = "filtres__Container">
                <form className = "filtres__Type" >
                    {executedPage === 0? <input type="radio" name = 'volcanoType' id = 'volcanoType--tous' value = 'Tous' checked/>
                    :<input type="radio" name = 'volcanoType' id = 'volcanoType--Tous' value = 'Tous' onChange = {typeSelection}/>}
                    <label htmlFor = 'volcanoType--Tous'>Tous</label><br />
                    <input type = 'radio' name = 'volcanoType' id = 'volcanoType--Effusif' value = 'Effusif' onChange = {typeSelection}/>
                    <label htmlFor = 'volcanoType--Effusif'> Effusif</label><br/>
                    <input type = 'radio' name = 'volcanoType' id = 'volcanoType--Explosif' value = 'Explosif' onChange = {typeSelection}/>
                    <label htmlFor = 'volcanoType--Explosif'> Explosif</label><br/>
                </form>
                <form>
                    <h3>Nom du volcan</h3>
                    <select name="volcanoName" id="volcanoSelected" size = {selectionNamesSize}>
                        {volcanoNames.length>0?volcanoNames.map((e)=><option value = {e} onClick = {volcanoNameSelection}>{e}</option>):null}
                    </select>
                </form>
                <i className="fa-regular fa-circle-xmark volcanoNameReinitialization" onClick = {reinitialization}></i>

            </div>
        </div>
    )
}
export default Photos;