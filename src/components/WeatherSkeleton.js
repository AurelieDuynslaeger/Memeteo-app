import React from 'react';

const WeatherSkeleton = () => {
  return (
    <div className="weather-skeleton">
      <div className="container">
        <div className="city">
          <div className="city-name"></div>
          <div className="current-temp"></div>
          <div className="icon-weather-display"></div>
          <div className="weather-details">
            <div className="details-card"></div>
            <div className="details-card"></div>
            <div className="details-card"></div>
            <div className="details-card"></div>
            <div className="details-card"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
