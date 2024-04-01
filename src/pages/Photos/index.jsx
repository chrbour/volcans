import React from "react";
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram from '../../components/Pictogram';

function Photos({connected}){
    return(
        <div>
            <Banner/>
            <Pictogram connected = {connected}/>
            <Navbar/>
            <h1 className = 'Photos__Title'>VOS PLUS BEAUX PARTAGES DE VOLCANS:</h1>
        </div>
    )
}
export default Photos;