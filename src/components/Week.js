import React from 'react'
import WeatherIcon from './WeatherIcon';

//ce composant permet d'afficher la première page du carrousel avec la météo globale et la température moyenne de la journée
//onClick = open Modal pour détails
//modif name => day et date pour l'affichage formatté du jour et de la date
const Week = ({ day , date, weather, temperature, onClick }) => {
    return (
        // test inversement des elements à voir sur le rendu avec la maquette
        <div className="days" onClick={onClick}>
            <h4>{day} {date}</h4>
            <h6>{temperature}°C</h6>
            {weather && <WeatherIcon code={weather} isDay={true} />}
        </div>
    );
};

export default Week;