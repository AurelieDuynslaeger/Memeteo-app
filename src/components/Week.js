import React from 'react'
import '../main.css';
import '../stylesheet/carrousel.scss';

const Week = ({name, weather, temperature}) => {
    return (
      
          <div className="days">
              <h3>{name}</h3>
              <img src={weather} alt="" />
              {/* {weather &&<WeatherIcon dataSource="forecastWeather7" weatherData={weather} />} */}
              <h3>{temperature}°C</h3>
          </div>
    )
  }

export default Week