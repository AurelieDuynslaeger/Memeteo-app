import React from 'react'

const Precipitation = ({minutes, rain}) => {
  return (
    <div className="rain">
        <p>{minutes}</p>
        <p>{rain}</p>
    </div>
  )
}

export default Precipitation