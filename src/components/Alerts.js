import React from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BsCircleFill } from "react-icons/bs";

import "../stylesheet/_alerts.scss"

const Alerts = (alertInfo) => {
    const {event, expires} = alertInfo;
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

    if (event.includes("violent wind")) {
      eventTranslate = "Vents Violents ";
  } else if (event.includes("wind")) {
      eventTranslate = "Vent ";
  } else if (event.includes("flood")) {
      eventTranslate = "Pluie-Inondations ";
  } else if (event.includes("rain")) {
    eventTranslate = "Pluie ";
  }else if (event.includes("thunderstorm")) {
      eventTranslate = "Orage ";
  } else if (event.includes("snow")) {
      eventTranslate = "Neige ";
  } else if (event.includes("black ice")) {
      eventTranslate = "Verglas ";
  } else if (event.includes("avalanche")) {
      eventTranslate = "Avalanches ";
  } else if (event.includes("heat wave")) {
      eventTranslate = "Chaleur ";
  } else if (event.includes("extreme cold")) {
      eventTranslate = "Grand Froid ";
  }
  
    //couleur du svg react icons en fonction de l'événement de l'alerte (green, yellow, orange, red)
  if (event.includes("green")) {
    iconColor = "#008000";
  } else if (event.includes("yellow") || event.includes("moderate")) {
    iconColor = "#FFFF00";
  } else if (event.includes("orange")) {
    iconColor = "#FFA500";
  } else if (event.includes("severe") || event.includes("red")) {
    iconColor = "#FF0000";
  }
  
  return (
    <div key={event} className='alerts-display'>
      <p className='alert-event'>{"Vigilance "}</p>
      <BsCircleFill color={iconColor} />
      <p className='alert-event'>{eventTranslate}  {" jusque "} {format(expires, 'HH', { locale: fr })}h</p>
    </div>
  )
}

export default Alerts
