import React from 'react'
import { TbCloudQuestion } from "react-icons/tb";
import WeatherIcon from './WeatherIcon'

const CurrentCity = ({ currentWeather, handleCityClick, handleMobileIconClick }) => {
  return (
    <div className='city'>
      <h3 className='city-name' onClick={handleCityClick}>
        {currentWeather?.location?.name}
      </h3>
      <h3 className='current-temp'>{currentWeather?.current?.temp_c}°C </h3>

      {/* Icône mobile visible uniquement sur les appareils mobiles */}
      <TbCloudQuestion className="mobile-icon" onClick={handleMobileIconClick} />
     
      {currentWeather && <WeatherIcon currentWeather={currentWeather} />}
    </div>
  )
}

export default CurrentCity