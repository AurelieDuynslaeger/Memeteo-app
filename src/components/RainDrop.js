import React from 'react';
import '../stylesheet/Root.scss'; 

//ce composant va permettre d'afficher la troisième page du carrousel avec les précipitations heure par heure de la journée

const RainDrop = ({ pourcentage }) => {
  // Le style dynamique pour le remplissage de la goutte
  //sur le scss la height de la div en absolute n'est pas défini pour etre défini ici = remplissage
  //pourcentage est récupéré sur app => hour.chance_of_rain = 89% de l'api météo
  const styleRemplissage = {
    //alors height = 89%
    height: `${pourcentage}%`
  };

  return (
    <div className="rain-drop">
      <div className="filled-raindrop" style={styleRemplissage}>
        <span>{pourcentage}%</span>
      </div>
    </div>
  );
};

export default RainDrop;

