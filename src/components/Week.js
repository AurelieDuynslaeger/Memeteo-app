import React from 'react'
import WeatherIcon from './WeatherIcon';

//ce composant permet d'afficher la première page du carrousel avec la météo globale et la température moyenne de la journée
//onClick = open Modal pour détails
//modif name => day et date pour l'affichage formatté du jour et de la date
const Week = ({ day , date, weather, temperature, onClick }) => {
    return (
        // test inversement des elements à voir sur le rendu avec la maquette
        <div className="days" onClick={onClick}>
            <p className='day-date'>{day} {date}</p>
            <p>{temperature}°C</p>
            {weather && <WeatherIcon code={weather} isDay={true} />}
        </div>
    );
};

export default Week;