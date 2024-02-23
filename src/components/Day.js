import React from 'react'
import '../stylesheet/carrousel.scss';
import WeatherIcon from './WeatherIcon';

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