import Week from '../components/Week.js';
import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import '../main.css';
import { formatTime } from '../utils/dateUtils.js';
import Day from '../components/Day.js';
import nonprecip from '../assets/icons/nonPrecipitation.svg';
import precip from '../assets/icons/precipitation.svg';




const App = () => {
  const [forecastWeather7, setForecastWeather7] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});

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
  //   console.log(currentSlide)
  // }

  const days = forecastWeather7.forecast && forecastWeather7.forecast.forecastday && forecastWeather7.forecast.forecastday.map((day, index) =>
  (
    <Week
        key={index}
        name={format(new Date(day.date), 'EEEE', { locale: fr })}
        weather={day.day.condition.icon}
        temperature={day.day.avgtemp_c}
      />
  ))

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



  return (
    <div>

      <div className="week">
        {days}
      </div>

      <div>
        {hours}
      </div>


    </div>

  )
}


export default App