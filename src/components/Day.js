import React from 'react'
import WeatherIcon from './WeatherIcon';

//ce composant permet d'afficher la deuxième page du carrousel avec les prévisions heure par heure de la journée
const Day = ({time, weather, temperature, isDay}) => {
  return (
    <div className="hour">
        <p>{time}</p>
        <p>{temperature}°C</p>
        {/* intégration des icones perso comme pour les prévisions par jour, pour l'heure par heure */}
        {weather && <WeatherIcon code={weather} isDay={isDay} />}
    </div>
  )
}

export default Day