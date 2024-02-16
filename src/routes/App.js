import React, { useEffect, useState } from 'react'

//import des icones
import airQualityIcon from "../assets/icons/airquality.svg"
import feelsLikeIcon from "../assets/icons/feelslike.svg"
import humidityIcon from "../assets/icons/humidity.svg"
import uvIcon from "../assets/icons/uv.svg"
import windIcon from "../assets/icons/wind.svg";
import nonprecip from '../assets/icons/nonPrecipitation.svg';
import precip from '../assets/icons/precipitation.svg';
// import sunsetIcon from "../assets/icons/sunset.svg";
// import sunriseIcon from "../assets/icons/sunrise.svg";

//import composant Ant Design et React Icons
import { Carousel, Radio} from 'antd';
import { TbCloudQuestion } from "react-icons/tb";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatTime } from '../utils/dateUtils';

//import des composants
import WeatherSkeleton from '../components/WeatherSkeleton.js';
import Week from '../components/Week.js';
import Day from '../components/Day.js';
import HeaderNav from '../components/HeaderNav.js';
import DetailCard from '../components/DetailCard.js';
import Precipitation from '../components/Precipitation.js';

//import des feuilles de styles
import '../main.css';
import "../stylesheet/Root.scss";
import '../stylesheet/carrousel.scss';

const contentStyle = {
  height: '300px',
  lineHeight: '300px',
  textAlign: 'center',
};


const App = () => {
    
  //météo a l'instant T
  const [currentWeather, setCurrentWeather] = useState({});
  //météo prévisions 24h (pluie et heure par heure)
  const [forecastWeather, setForecastWeather] = useState({});
  //météo prévisions 7 (jour-temps-icon)
  const [forecastWeather7, setForecastWeather7] = useState({});

  //état de la navBar à false, passe à true au clik sur la ville
  const [showNavBar, setShowNavBar] = useState(false);
  //menu input pour saisie de la ville
  const [weatherInput, setWeatherInput] = useState('');
  //div Détails Météo qui n'apparait qu'au clik sur mobile, et qui est en display sur tablette et desktop
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const [loadingCity, setLoadingCity] = useState(false);
   const [dotPosition, setDotPosition] = useState('right');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  
 /*fetch current weather condittionné (si saisie input sinon default => Lille */
  useEffect(() => {
    const weatherData = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&aqi=yes&lang=fr`;
      } else {
        apiUrl = `http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=Lille&aqi=yes&lang=fr`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCurrentWeather(data);
    };
  
    weatherData();
  }, [weatherInput]);

  /*fetch forecast 24h*/
  useEffect(() => {
    const weatherDataForecast = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&days=1&aqi=yes&alerts=yes&lang=fr`;
      } else {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=1&aqi=yes&alerts=yes&lang=fr`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForecastWeather(data);
    };
    weatherDataForecast();
  }, [weatherInput]);

    /*fetch forecast 5jrs*/
  useEffect(() => {
    const weatherForecast7 = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&days=7&aqi=no&alerts=yes&lang=fr`;
      } else {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=7&aqi=no&alerts=yes&lang=fr`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForecastWeather7(data);
    };
    weatherForecast7();
  }, [weatherInput]);


/*Navbar qui apparait au clik avec l'input pour la saisie d'une ville*/
const handleCityClick = () => {
  console.log("déclenché");
  setShowNavBar(true);

//saisie input et à la soumission la Navbar disparait
const handleWeatherInput = async (city) => {
    // Appel de l'API avec la city soumise dans la nav
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${city}&aqi=yes&lang=fr`);
      const data = await response.json();
      setCurrentWeather(data);
      setShowNavBar(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
    }
  };

  /*icone pour details Météo (mobile => on clik ; tablette/desktop => display)*/
  const handleMobileIconClick = () => {
    setShowMobileDetails(!showMobileDetails);
  };


/* geolocalisation */
function handleCurrentLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position)=>{
      const { latitude, longitude } = position.coords;
       setLoadingCity(true);
       setWeatherInput('');
      try {
          const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${latitude},${longitude}&aqi=yes&lang=fr`).then(response => response.json()); 
          setTimeout(() => {
            const data = response;
            setCurrentWeather(data);
            setLoadingCity(false);
          }, 500);
      } catch(error) {
        setLoadingCity(false);
      }
    });
  }
}
  
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

// Utilisation du WeatherSkeleton si loadingCity (chargement de la ville) = true
if (loadingCity) {
  return <WeatherSkeleton />;
} else {
  return (
    <div className="container">

      {/* composant Navbar qui n'apparait que si on clik sur la ville */}
      {showNavBar && <HeaderNav onWeatherInput={handleWeatherInput} />}
      <div className='city'>

            <h3 className='city-name'  onClick={handleCityClick}>{currentWeather?.location?.name}</h3>
            <h3 className='current-temp'>{currentWeather?.current?.temp_c}°C </h3>

            {/* Icône mobile visible uniquement sur les appareils mobiles */}
            <TbCloudQuestion className="mobile-icon" onClick={handleMobileIconClick} />
            {/* <BiMessageSquareDetail className="mobile-icon" onClick={handleMobileIconClick} /> */}

            <img src={currentWeather?.current?.condition?.icon} alt="" />
            <p>{currentWeather?.current?.condition?.text}</p>
      </div>

      {/* Div des détails de la météo */}
      <div className={`weather-details ${showMobileDetails ? 'show-mobile' : ''}`}>
        {/* Contenu des détails de la météo */}
        <div className="forecast">
          <div className='forecast-details'>
            <DetailCard iconSrc={windIcon} description="Vitesse du vent" value={`${currentWeather?.current?.wind_kph} km/h`} />
            <DetailCard iconSrc={humidityIcon} description="Humidité" value={`${currentWeather?.current?.humidity} %`} />
            <DetailCard iconSrc={uvIcon} description="Indice UV" value={currentWeather?.current?.uv} />
            <DetailCard iconSrc={feelsLikeIcon} description="Ressenti" value={`${currentWeather?.current?.feelslike_c} °C`} />
            <DetailCard iconSrc={airQualityIcon} description="Qualité de l'air" value={`indice ${currentWeather?.current?.air_quality['gb-defra-index']}`} />
          </div>
        </div>
      </div>

      <div className="weather-meme">

      </div>

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
    </div>

  )
}}
}
export default App