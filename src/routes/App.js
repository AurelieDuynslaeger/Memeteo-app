import Week from '../components/Week.js';
import { Carousel, Button, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import '../main.css';
import { formatTime } from '../utils/dateUtils.js';
import Day from '../components/Day.js';
import nonprecip from '../assets/icons/nonPrecipitation.svg';
import precip from '../assets/icons/precipitation.svg';
import Precipitation from '../components/Precipitation.js';
import '../stylesheet/carrousel.scss';

const contentStyle = {
  height: '300px',
  lineHeight: '300px',
  textAlign: 'center',
};



const App = () => {
  const [dotPosition, setDotPosition] = useState('right');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  const [forecastWeather7, setForecastWeather7] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});


  /////Appel API pour 7 jours/////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=7&aqi=yes&alerts=yes").then(response => response.json());

        const weatherDataForecast = response;
        setForecastWeather7(weatherDataForecast);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });


  ///// Appel API pour 1 jour /////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=1&aqi=yes&alerts=yes").then(response => response.json());

        const weatherDataForecast = response;
        setForecastWeather(weatherDataForecast);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });


  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };

  ///// Carrousel page 1 pour la météo des 5 prochains jours /////
  const days = forecastWeather7.forecast && forecastWeather7.forecast.forecastday && forecastWeather7.forecast.forecastday.map((day, index) =>
  (
    <div className="week">
      <Week
        key={index}
        name={format(new Date(day.date), 'EEEE', { locale: fr })}
        weather={day.day.condition.icon}
        temperature={day.day.avgtemp_c}
      />
    </div>

  ))

  ///// Carrousel page 2 pour la météo des 24 prochaines heures /////
  const hours = forecastWeather.forecast && forecastWeather.forecast.forecastday && forecastWeather.forecast.forecastday.map((day, index) =>
  (
    <div className="MiniCards" key={index}>
      {day.hour.map((hour, index) => (
        <Day
          key={index}
          time={formatTime(hour.time)}
          weather={`http:${hour.condition.icon}`}
          temperature={hour.temp_c}
        />
      ))}
    </div>
  ))

  ///// Carrousel page 3 pour les précipitations des 24 prochaines heures /////
  const minutes = forecastWeather && forecastWeather.forecast && forecastWeather.forecast.forecastday &&
    forecastWeather.forecast.forecastday.map((day, index) =>
    (
      <div className="precip" key={index}>
        {day.hour.map((hour, idx) => (
          <Precipitation
            key={idx}
            minutes={formatTime(hour.time)}
            rain={hour.chance_of_rain > 0 ? (
              <img src={precip} alt="Precipitating" />) :
              (<img src={nonprecip} alt="Not Precipitating" />)}
          />
        ))}
      </div>

    )
    )



  return (
    <div>
      <Radio.Group
        onChange={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      >

      </Radio.Group>

      <Carousel dotPosition={dotPosition}>
        <div>
          <p>Temps sur 7 jours</p>
          <div className="week">
            {days}
          </div>
        </div>


        <div>
          <p>Temps sur 24h</p>
          <div  className="MiniCards">
            {hours}
          </div>
        </div>

        <div>
          <p>Précipitations dans l'heure</p>
          <div  className="precip">
            {minutes}
          </div>
          </div>


      </Carousel>

    </div>

  )
}


export default App