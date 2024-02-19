import React from 'react'
import '../main.css';
import '../stylesheet/carrousel.scss';
import WeatherIcon from './WeatherIcon';

const Week = ({name, weather, temperature, action}) => {
    return (
      
          <div className="days" onClick={action}>
              <h3>{name}</h3>
              {/* <img src={weather} alt="" /> */}
              {weather && <WeatherIcon currentWeather={weather} />}
              <h3>{temperature}°C</h3>
          </div>
      
    )
  }

export default Week