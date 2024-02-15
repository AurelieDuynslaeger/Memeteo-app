import React from 'react'
import '../main.css';
import '../stylesheet/carrousel.scss';

const Week = ({name,weather, temperature}) => {
    return (
      
          <div className="days">
              <h3>{name}</h3>
              <img src={weather} alt="" />
              <h3>{temperature}°C</h3>
          </div>
      
    )
  }

export default Week