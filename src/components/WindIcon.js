import React from 'react'
import { TbNavigation } from "react-icons/tb";

// 0° — north wind (N)
// 22.5° — north-northeast wind (NNE)
// 45° — northeast wind (NE)
// 67.5° — east-northeast wind (ENE)
// 90°— east wind (E)
// 112.5° — east-southeast wind (ESE)
// 135° — southeast wind (SE)
// 157.5° — south-southeast wind (SSE)
// 180° — south wind (S)
// 202.5° — south-southwest wind (SSW)
// 225° — southwest wind (SW)
// 247.5° — west-southwest wind (WSW)
// 270° — west wind (W)
// 292.5° — west-northwest wind (WNW)
// 315° — northwest wind (NW)
// 337.5° — north-northwest wind (NNW)
// 360° — north wind (N)

const WindIcon = ({direction, wind_dir}) => {
    //WindIcon récupère sur app la direction du vent de l'appel api =>  weatherData?.current?.wind_dir => "WSW"
    const getIcon = (direction) => {
        //fonction qui va trier quelle icone afficher selon la direction qu'on lui donne à consommer
        //j'ai  simplement pris une seule icone et je l'ai fait tourner selon les directions récupérés des différents vents listés ci dessus
        switch (direction) {
            case 'N':
                return <TbNavigation />;
            case 'NNE' :
                return <TbNavigation style={{ transform: 'rotate(-22.5deg)' }}/>;
            case 'NE':
                return <TbNavigation style={{ transform: 'rotate(-45deg)' }}/>;
            case 'ENE' :
                return <TbNavigation style={{ transform: 'rotate(-67.5deg)' }}/>;
            case 'E' :
                return <TbNavigation style={{ transform: 'rotate(-90deg)' }}/>;
            case 'ESE':
                return <TbNavigation style={{ transform: 'rotate(-112.5deg)' }}/>;
            case 'SE':
                return <TbNavigation style={{ transform: 'rotate(-135deg)' }}/>;
            case 'SSE' : 
                return <TbNavigation style={{ transform: 'rotate(-157.5deg)' }}/>;
            case 'S' : 
                return <TbNavigation style={{ transform: 'rotate(-180deg)' }}/>;
            case 'SSW':
                return <TbNavigation style={{ transform: 'rotate(-202.5deg)' }}/>;
            case 'SW' : 
                return <TbNavigation style={{ transform: 'rotate(-225deg)' }}/>;
            case 'WSW' : 
                return <TbNavigation style={{ transform: 'rotate(-247.5deg)' }}/>;
            case 'W' : 
                return <TbNavigation style={{ transform: 'rotate(-270deg)' }}/>; 
            case 'WNW' : 
                return <TbNavigation style={{ transform: 'rotate(-292.5deg)' }}/>; 
            case 'NW' : 
                return <TbNavigation style={{ transform: 'rotate(-315deg)' }}/>;
            case 'NNW' : 
                return <TbNavigation style={{ transform: 'rotate(-337.5deg)' }}/>;     
            default:
                return null;
        }
    }
  return (
    <div className='wind-icon-dir'>
        {getIcon(direction)} {wind_dir}
    </div>
  )
}

export default WindIcon