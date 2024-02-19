import React from 'react';
import '../main.css';
import '../stylesheet/carrousel.scss';
import WeatherIcon from './WeatherIcon';


//onClick = open Modal pour détails
const Week = ({ name, weather, temperature, onClick }) => {
    return (
        <div className="days" onClick={onClick}>
            <h3>{name}</h3>
            {weather && <WeatherIcon code={weather} isDay={true} />}
            <h3>{temperature}°C</h3>
        </div>
    );
};

export default Week;