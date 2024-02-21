import React from 'react'
import '../stylesheet/carrousel.scss';
import WeatherIcon from './WeatherIcon';

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