import React, { useEffect, useState } from 'react'
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import sunsetIcon from "../assets/icons/sunset.svg";
// import sunriseIcon from "../assets/icons/sunrise.svg";
import airQualityIcon from "../assets/icons/airquality.svg"
import feelsLikeIcon from "../assets/icons/feelslike.svg"
import humidityIcon from "../assets/icons/humidity.svg"
import uvIcon from "../assets/icons/uv.svg"
import windIcon from "../assets/icons/wind.svg";
import { BiMessageSquareDetail } from "react-icons/bi";
// import { formatTime } from '../utils/dateUtils';
import "../stylesheet/Root.scss";
import HeaderNav from '../components/HeaderNav';

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

   //fetch current data weather
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
    //fetch forecast 24h
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

    //fetch forecast 5jrs
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


//Navbar qui apparait au clik avec l'input pour la saisie d'une ville
const handleCityClick = () => {
  setShowNavBar(true);
};

//saisie input et à la soumission la Navbar disparait
const handleWeatherInput = async (city) => {
    // Appel de l'API avec la city soumise
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${city}&aqi=yes&lang=fr`);
      const data = await response.json();
      setCurrentWeather(data);
      setShowNavBar(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
    }
  };

  const handleMobileIconClick = () => {
    setShowMobileDetails(!showMobileDetails);
  };


//fetch pour la saisie d'une nouvelle localité
// const submitCity = () => {
//   const weatherData = async () => {
//     const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&aqi=yes&lang=fr`).then(response => response.json());
//     const data = response;
//     setCurrentWeather(data);
    
//     // Réinitialiser le champ de saisie et masquer l'input
//     setWeatherInput('');
//     setShowInput(false);
//     console.log('Ville soumise:', weatherInput);
//   };
//   weatherData();
// };


//récup du tableau astro pour lever et couher de soleil - à voir
const astro = forecastWeather && forecastWeather.forecast && forecastWeather.forecast.forecastday && 
  forecastWeather.forecast.forecastday;
  console.log(astro);
  // console.log(astro[0].astro.sunrise);
  

  return (
    <div className="container">
      {/* composant Navbar qui n'apparait que si on clik sur la ville */}
      {showNavBar && <HeaderNav onWeatherInput={handleWeatherInput} />}
      <div className='city'>

            <h3 className='city-name'  onClick={handleCityClick}>{currentWeather?.location?.name}</h3>
            <h3 className='current-temp'>{currentWeather?.current?.temp_c}°C </h3>

            {/* Icône mobile visible uniquement sur les appareils mobiles */}
            <BiMessageSquareDetail className="mobile-icon" onClick={handleMobileIconClick} />

            <img src={currentWeather?.current?.condition?.icon} alt="" />
            <p>{currentWeather?.current?.condition?.text}</p>
      </div>
      {/* Div des détails de la météo */}
      <div className={`weather-details ${showMobileDetails ? 'show-mobile' : ''}`}>
        {/* Contenu des détails de la météo */}
        <div className="forecast">
              {/* <h4>Détails Temps Actuel</h4> */}
              <div className='forecast-details'>
                <div className='details-card'>
                  {/* créer un composant DetailWeatherCard */}
                  {/* props : src width height data  */}
                  <img src={windIcon} alt="" width={40} height={40} /> 
                  <p>{currentWeather?.current?.wind_kph} km/h</p>
                  {/* {currentWeather?.current?.wind_dir} = Ouest (condtionnement à venir) */}
                </div>
                <div className='details-card'>
                  <img src={humidityIcon} alt="" width={40} height={40} />
                  <p>Humidité : {currentWeather?.current?.humidity} %</p>
                </div>
                <div className='details-card'>
                  <img src={uvIcon} alt="" width={40} height={40} />
                  <p>Indice : {currentWeather?.current?.uv}</p> 
                </div>
                <div className='details-card'>
                  <img src={feelsLikeIcon} alt="" width={40} height={40} /> <p>Ressenti : {currentWeather?.current?.feelslike_c} °C </p>
                </div>
                <div className='details-card'>
                  <img src={airQualityIcon} alt="" width={40} height={40} /> <p> Qualité de l'air : indice {currentWeather?.current?.air_quality['gb-defra-index']} </p>
                </div>
              </div>
            </div>
      </div>
      <div className="weather-meme">

      </div>
      {/* 
      <div className='sun-display'>
            <div className="sun-infos">
              <div className='sun-couple'>
                  <img src={sunriseIcon} className="sun-icons" alt="" />
                  <p className='sun-hours'>{astro[0].astro.sunrise}</p>
              </div>
              <div className='sun-couple'>
                  <img src={sunsetIcon} className="sun-icons"alt="" />
                  <p className='sun-hours'>{astro[0].astro.sunset}</p>
              </div> 
            </div>
      </div> */}

    </div>

  )
}

export default App