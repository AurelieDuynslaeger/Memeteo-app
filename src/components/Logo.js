import React from "react";

// import des assets
import ImgLogo from "../assets/memteo-logo-base.png";
import ImgLogoNega from "../assets/memteo-logo-base_nega.png";

const Logo = ({ isDarkMode }) => {

    return (
        <div className="logo">
             <img src={isDarkMode ? `${ImgLogoNega}` : `${ImgLogo}`} alt="Logo Memetéo"  />
        </div>
    )
};

export default Logo;