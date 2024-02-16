import React from 'react'
import '../stylesheet/carrousel.scss';
import '../main.css';

const Day = ({time, weather, temperature}) => {
  return (
    <div className="hour">
        <p>{time}</p>
        <img src={weather} alt="" />
        <p>{temperature}°C</p>
    </div>
  )
}

export default Day