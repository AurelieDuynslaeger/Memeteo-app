import React from 'react'
import WeatherIcon from './WeatherIcon';

//ce composant permet d'afficher la deuxième page du carrousel avec les prévisions heure par heure de la journée
const Day = ({time, weather, temperature}) => {
  return (
    <div className="hour">
        <p>{time}</p>
        {/* intégration des icones perso comme pour les prévisions par jour, pour l'heure par heure */}
        {weather && <WeatherIcon code={weather} isDay={true} />}
        <p>{temperature}°C</p>
    </div>
  )
}

export default Day