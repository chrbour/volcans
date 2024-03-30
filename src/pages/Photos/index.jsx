import React from "react";
import Banner from '../../components/Banner';
import Navbar from '../../components/Navbar';
import Pictogram, {tester} from '../../components/Pictogram';

function Photos(){console.log({tester})
    return(
        <div>
            <Banner/>
            <Pictogram/>
            <Navbar/>
            <h1 className = 'Photos__Title'>VOS PLUS BEAUX PARTAGES DE VOLCANS:</h1>
        </div>
    )
}
export default Photos;