import React from 'react'
import WeatherIcon from './WeatherIcon';


//onClick = open Modal pour détails
//modif name => day et date pour l'affichage formatté du jour et de la date
const Week = ({ day , date, weather, temperature, onClick }) => {
    return (
        <div className="days" onClick={onClick}>
            <h3>{day} {date}</h3>
            {weather && <WeatherIcon code={weather} isDay={true} />}
            <h3>{temperature}°C</h3>
        </div>
    );
};

export default Week;