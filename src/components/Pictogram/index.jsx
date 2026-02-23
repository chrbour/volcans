import pictoN from "../../assets/pictoNoir.jpg";
import pictoV from "../../assets/pictoVert.jpg";

function Pictogram({connected}){
        let picto = pictoN;
        let pictoAlt = "Pictogramme Noir";
        if (connected === 'Connected'){
            picto = pictoV;
            pictoAlt = "Pictogramme Vert";
        }
        return(
            <img className = "picto" src = {picto} alt = {pictoAlt} title = {connected}></img>
        )
}

export default Pictogram;

