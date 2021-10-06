import React from "react";
import preloaderImage from '../../../assets/image/preloader.svg'

const Preloader = (props) => {
    return (
        <div>
            <img src={preloaderImage} alt={"Preloader"}/>
        </div>
    );
}

export default Preloader;
