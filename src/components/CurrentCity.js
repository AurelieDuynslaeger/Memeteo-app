import React from 'react'
import { TbCloudQuestion } from "react-icons/tb";
import WeatherIcon from './WeatherIcon'

const CurrentCity = ({ currentWeather, handleCityClick, handleMobileIconClick }) => {
  // Vérifie si currentWeather est défini
  if (!currentWeather) return null;

  // Extrait le code de condition et l'indicateur de jour/nuit
  const code = currentWeather.current?.condition?.code;
  const isDay = currentWeather.current?.is_day === 1;

  return (
    <div className="city">
      <h3 className="city-name" onClick={handleCityClick}>
        {currentWeather.location?.name}
      </h3>
      <h3 className="current-temp">{currentWeather.current?.temp_c}°C</h3>

      {/* Icône mobile visible uniquement sur les appareils mobiles */}
      <TbCloudQuestion className="mobile-icon" onClick={handleMobileIconClick} />

      {/* Composant qui prend le code de condition météo et l'indicateur de jour/nuit pour display la bonne icone */}
      <WeatherIcon code={code} isDay={isDay} />
    </div>
  );
};

export default CurrentCity;