import React from 'react'
import WeatherIcon from './WeatherIcon'
import { FaMagnifyingGlass } from "react-icons/fa6";

const CurrentCity = ({ currentWeather, handleCityClick, handleMobileIconClick }) => {
  // Vérifie si currentWeather est défini
  if (!currentWeather) return null;

  // Extrait le code de condition météo et l'indicateur de jour/nuit
  const code = currentWeather.current?.condition?.code;
  const isDay = currentWeather.current?.is_day === 1;

  return (
    <div className="city">
      <h3 className="current-temp">{currentWeather.current?.temp_c}°</h3>
      <h3 className="city-name" onClick={handleCityClick}>
        {currentWeather.location?.name} <FaMagnifyingGlass className='search-icon'/>
      </h3>

      {/* Composant qui prend le code de condition météo et l'indicateur de jour/nuit pour display de la bonne icone */}
      <WeatherIcon code={code} isDay={isDay} />
    </div>
  );
};

export default CurrentCity;