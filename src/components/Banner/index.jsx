import React from "react";
import photoBanner from "../../assets/volcanic-eruption-7730998_1920.webp";

function Banner(){
    return(
        <div className = 'containerBanner'>
            <img src ={photoBanner} alt = 'Volcan en éruption' className = 'imageBanner' />
        </div>
    )
}

export default Banner;