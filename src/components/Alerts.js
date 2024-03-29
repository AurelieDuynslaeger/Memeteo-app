import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BsCircleFill } from 'react-icons/bs';

import "../stylesheet/_alerts.scss";

const Alerts = (alertInfo) => {
    const { event, expires } = alertInfo;
    let iconColor = '';
    let eventTranslate = '';

    //alertes météo les plus courantes récupérées sur Meteo france
    // Violent wind = vents violents
    // Wind = Vent
    // Rain-Flood = Pluie-Inondations
    // Flood = Inondations/Crues
    // Thunderstorms = "Orage"
    // Snow = "Neige"
    // black ice = "Verglas"
    // Avalanches = "Avalanches"
    // Heat wave = "Canicule"
    // Extreme cold = "Grand Froid"
    // Dense Fog = "Brouillard Intense"

    // Traduction de l'événement
    //si dans la chaine retournée par l'api => weatherData.alerts.alert.event = "Green Warning for wind" où "wind" (=true) alors au lieu de wind on affiche Vent etc...
    switch (true) {
        case event.includes("violent wind"):
            eventTranslate = "Vents Violents";
            break;
        case event.includes("wind"):
            eventTranslate = "Vent";
            break;
        case event.includes("flood"):
            eventTranslate = "Inondations";
            break;
        case event.includes("rain"):
            eventTranslate = "Pluie";
        break;
        case event.includes("thunderstorm"):
            eventTranslate = "Orage";
            break;
        case event.includes("snow"):
            eventTranslate = "Neige";
            break;
        case event.includes("black ice"):
            eventTranslate = "Verglas";
            break;
        case event.includes("avalanche"):
            eventTranslate = "Avalanches";
            break;
        case event.includes("heat wave"):
            eventTranslate = "Canicule";
            break;
        case event.includes("extreme cold"):
            eventTranslate = "Grand Froid";
            break;
        case event.includes("Fog"):
            eventTranslate = "Brouillard";
            break;
        case event.includes("Current"):
            eventTranslate = "Courants Dangereux";
            break;
        case event.includes("Wind Chill"):
            eventTranslate = "Vents Glaciaux";
            break;
        default:
            eventTranslate = "";
    }

    // Couleur de l'icône en fonction de l'événement de l'alerte (green, yellow, orange, red)
    //si dans la chaine retournée par l'api => weatherData.alerts.alert.event = "Green Warning for wind" où "Green" (=true) alors au lieu de Green on affiche un circle icone Vert...
    switch (true) {
        case event.includes("Green"):
            iconColor = 'green';
            break;
        case event.includes("Yellow") || event.includes("Moderate"):
            iconColor = 'yellow';
            break;
        case event.includes("Orange") || event.includes("Dense"):
            iconColor = 'orange';
            break;
        case event.includes("Severe") || event.includes("Red") || event.includes("Rip") || event.includes("Advisory"):
            iconColor = 'red';
            break;
        default:
            iconColor = "transparent"; 
    }

    return (
        <div key={event} className='alerts-display'>
            <p className='alert-event'>
                Vigilance 
            </p>
            {/* couleur de l'icone react dynamique en fonction de ce qui est retournée dans la chaine de l'api pour l'event */}
            <BsCircleFill color={iconColor} />
            <p className='alert-event'>
                {/* alert.event.includes="wind" ou "flood" ou "thunderstorms", alors l'event est traduit grace au switch du dessus */}
                {eventTranslate} jusque {format(expires, 'HH', { locale: fr })}h
            </p>
        </div>
    );
}

export default Alerts;


