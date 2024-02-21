import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const CurrentCity = ({ currentWeather, handleCityClick }) => {
  // Vérifie si currentWeather est défini
  if (!currentWeather) return null;

  return (
    <div className="city">
      <h3 className="current-temp">{currentWeather.current?.temp_c}°</h3>
      
      <div className='city-search'>
        <h3 className="city-name" onClick={handleCityClick}>
          {currentWeather.location?.name} 
        </h3>
        <FaMagnifyingGlass className='search-icon'/>
      </div>

      
    </div>
  );
};

export default CurrentCity;