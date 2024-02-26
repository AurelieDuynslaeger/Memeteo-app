import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BsCircleFill } from 'react-icons/bs';

import "../stylesheet/_alerts.scss";

const Alerts = (alertInfo) => {
    const { event, expires } = alertInfo;
    let iconColor = '';
    let eventTranslate = '';

    // Violent wind = vents violents
    // Wind = Vent
    // Rain-Flood = Pluie-Inondations
    // Flood = Inondations/Crues
    // Thunderstorms = "Orage"
    // Snow = "Neige"
    // black ice = "Verglas"
    // Avalanches = "Avalanches"
    // Heat wave = "Chaleur"
    // Extreme cold = "Grand Froid"

    // Traduction de l'événement
    switch (true) {
        case event.includes("violent wind"):
            eventTranslate = "Vents Violents";
            break;
        case event.includes("wind"):
            eventTranslate = "Vent";
            break;
        case event.includes("flood"):
            eventTranslate = "Pluie-Inondations";
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
            eventTranslate = "Chaleur";
            break;
        case event.includes("extreme cold"):
            eventTranslate = "Grand Froid";
            break;
        default:
            eventTranslate = "Autre";
    }

    // Couleur de l'icône en fonction de l'événement de l'alerte (green, yellow, orange, red)
    switch (true) {
        case event.includes("Green"):
            iconColor = 'green';
            break;
        case event.includes("Yellow") || event.includes("Moderate"):
            iconColor = 'yellow';
            break;
        case event.includes("Orange"):
            iconColor = 'orange';
            break;
        case event.includes("Severe") || event.includes("Red"):
            iconColor = 'red';
            break;
        default:
            iconColor = 'gray'; 
    }

    return (
        <div key={event} className='alerts-display'>
            <p className='alert-event'>
                Vigilance 
            </p>
            <BsCircleFill color={iconColor} />
            <p className='alert-event'>
                {eventTranslate} jusque {format(expires, 'HH', { locale: fr })}h
            </p>
        </div>
    );
}

export default Alerts;


