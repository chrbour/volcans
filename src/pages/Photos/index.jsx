import { useContext, useState } from "react";
import Banner from '../../components/Banner';
import { useNavigate } from 'react-router-dom';
import Pictogram from '../../components/Pictogram';
import { ConnectedContext } from "../../utils/context/ConnectedProvider";
import { VolcanoContext } from '../../utils/context/VolcanoProvider';

function Photos(){
    const {connected} = useContext(ConnectedContext);
    const {setVolcanoId} = useContext(VolcanoContext);
    const [executedPage, updateExecutedPage] = useState(0);
    const [countImage, updateCountImage] = useState(0);
    const [images, updateImages] = useState({});
    const [volcanoNames, updateVolcanoNames] = useState ([]);
    const [selectedImages, updateSelectedImages] = useState({});
    const [displayImages, updateDisplayImages] = useState([]);
    const [selectionNamesSize, updateSelectionNamesSize] = useState(4);
    
    const navigate = useNavigate();
    let tab = [];
    let names = [];
    
    function selectImage(e){
        setVolcanoId(e.target.dataset.selectimageid);
        navigate('/Description');
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
    }

    const volcanoNameSelection = (e) => {
        let selection = images.filter((el) => el.name === e.target.value);
        updateSelectedImages(selection);
        updateCountImage(0);
        updateDisplayImages(selection.slice(0, 4));
        updateVolcanoNames([e.target.value]);
        updateSelectionNamesSize(1);
    }
    const reinitialization = () => {
        updateSelectedImages(images);
        updateCountImage(0);
        updateDisplayImages(images.slice(0, 4));
        names = images.map((e) => e.name);
        names = names.filter((element, index , arr) => arr.indexOf(element) === index);
        updateVolcanoNames(names);
        updateSelectionNamesSize(4);
        updateExecutedPage(0);
    }
    if (executedPage === 0){
        fetch('http://localhost:3000/api/volcans/') 
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
                updateImages(tab);
                updateSelectedImages(tab);
                updateVolcanoNames(names);
                if (tab.length >= 4){
                    updateDisplayImages (tab.slice(countImage, countImage+4));
                }
                else {
                    updateDisplayImages (tab.slice(countImage));
                }   
            })
            .catch((res,err) => {
                console.log(err);
                alert("Une erreur est survenue, les photos ne peuvent pas s'afficher pour le moment, veuillez réessayer plus tard");
        });
    };
          
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
            <h1 className = 'Photos__Title'>APERCU DE VOS PLUS BEAUX PARTAGES DE VOLCANS:</h1>
            <div className="photo__body">
                <div className = "photos__container">
                    {countImage >=4?<p className = 'photos__arrowsContainer'><i className="photos__arrows fa-solid fa-caret-left" onClick={handleLeft}></i></p>:null}
                    {selectedImages.length > 0?
                        displayImages.map((e, index) => {
                            return <img className = 'photos__image' onClick = {selectImage} src={e.picture} alt = {e.name} data-selectimageid = {e.id} key = {`Image ${index}`}></img>
                        })
                        : null
                    }
                    {countImage+4 <= selectedImages.length-1 ? <p className = 'photos__arrowsContainer'><i className = "photos__arrows fa-solid fa-caret-right" onClick={handleRight}></i></p> : null}
                </div>
            </div>
            <h2 className = 'filtres__Section'>Filtrer par Nom de Volcan:</h2>            
            <div className = "filtres__Container">
                <form>
                    <select name="volcanoName" className="volcanoSelected" size = {selectionNamesSize}>
                        {volcanoNames.length>0?volcanoNames.map((e, index)=> {
                            return <option value = {e} onClick = {volcanoNameSelection} key = {`Photo ${index}`} >{e}</option>
                        }):null
                        }
                    </select>
                </form>
                {selectionNamesSize === 1? <i className="fa-regular fa-circle-xmark volcanoNameReinitialization" onClick = {reinitialization}></i>
                    : <i className="fa-regular fa-circle-xmark volcanoNameReinitialization" style = {{visibility : 'hidden'}}></i>
                }
            </div>
            <br />
            <div className = "photos__btnContainer">
                <input type="button" value = "Retour" className = "photos__btn--cancel" onClick = {() => navigate('/Accueil')}/>
            </div>
        </div>
    )
}
export default Photos;