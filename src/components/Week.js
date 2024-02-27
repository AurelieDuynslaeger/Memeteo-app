import React from 'react'
import WeatherIcon from './WeatherIcon';


//onClick = open Modal pour détails
//modif name => day et date pour l'affichage formatté du jour et de la date
const Week = ({ day , date, weather, temperature, onClick }) => {
    return (
        // test inversement des elements à voir sur le rendu avec la maquette
        <div className="days" onClick={onClick}>
            <p>{day} {date}</p>
            <p>{temperature}°C</p>
            {weather && <WeatherIcon code={weather} isDay={true} />}
        </div>
    );
};

export default Week;