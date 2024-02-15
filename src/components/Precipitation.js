import React from 'react'
import '../stylesheet/carrousel.scss';
import '../main.css';

const Precipitation = ({minutes, rain}) => {
  return (
    <div className="rain">
        <p>{minutes}</p>
        <p>{rain}</p>
    </div>
  )
}

export default Precipitation