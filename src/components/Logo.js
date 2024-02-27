import React, { useState } from "react";

// import des assets
import ImgLogo from "../assets/memteo-logo-base.png";
import ImgLogoNega from "../assets/memteo-logo-base_nega.png";

const Logo = ({ isDarkMode }) => {

    return (
        <div>
             <img src={isDarkMode ? `${ImgLogoNega}` : `${ImgLogo}`} alt="Logo Memetéo" className="logo" />
        </div>
    )
};

export default Logo;