import React from 'react'

const CurrentCity = ({ currentWeather }) => {
  // Vérifie si currentWeather est défini
  if (!currentWeather) return null;

  return (
    <div className="city">
      <h3 className="current-temp">{currentWeather.current?.temp_c}°</h3>
      <div className='city-search'>
        <h3 className="city-name" >
          {currentWeather.location?.name} 
        </h3>
      </div>
    </div>
  );
};

export default CurrentCity;