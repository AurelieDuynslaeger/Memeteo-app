import React from 'react'
import '../stylesheet/carrousel.scss';

const Day = ({time, weather, temperature}) => {
  return (
    <div className="hour">
        <p>{time} </p>
        <img src={weather} alt="" />
        <p>{temperature}°C</p>
    </div>
  )
}

export default Day