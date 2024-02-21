import React, { useEffect, useState } from 'react'

import nonprecip from '../assets/icons/nonPrecipitation.svg';
import precip from '../assets/icons/precipitation.svg';

//import composant Ant Design et React Icons
import { Carousel, Radio } from 'antd';
import { PiSoundcloudLogo } from "react-icons/pi";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatTime, hourConvert, formatDay } from '../utils/functions.js';
import weatherConditionsGroup from '../datas/weatherConditionsGroup.js';

//import des composants
import WeatherSkeleton from '../components/WeatherSkeleton.js';
import Week from '../components/Week.js';
import Day from '../components/Day.js';
import HeaderNav from '../components/HeaderNav.js';
import Precipitation from '../components/Precipitation.js';
import CurrentCity from '../components/CurrentCity.js'
import Modal from '../components/Modal.js'
import WeatherMeme from '../components/WeatherMeme.js';


//import des feuilles de styles
import '../main.css';
import "../stylesheet/Root.scss";
import '../stylesheet/carrousel.scss';



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
  //modal Infos Prévisions / Current
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);



  const [dotPosition, setDotPosition] = useState('right');

  //permet l'affichage ou non du weather skeletton
  const [loadingCity, setLoadingCity] = useState(false);

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  //Recupération du Meme
  const [memes, setMemes] = useState([]);
  //Récupération du son
  const [musiques, setMusiques] = useState([]);
  //couleur background dynamique
  // const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('default-background'); 

  //toggle qui permet l'utilisateur de diffuser ou non le son, par défaut il est désactivé
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  // Constante pour stocker le texte des conditions météos actuelles
  //gestion du background, des memes et des sons
  const currentWeatherText = currentWeather?.current?.condition?.text;
  console.log(currentWeatherText);


  //Fetch pour aller chercher les memes et les sons sur notre API
  const fetchData = async (endpoint) => {
    const apiUrl = `http://localhost:3500/${endpoint}`;
    const response = await fetch(apiUrl);
    return response.json()
  }
  useEffect(()=> {
    const fetchMemeSoundData = async () => {
      const displayMeme = await fetchData('memes');
      setMemes(displayMeme);

      const displaySound = await fetchData('musiques');
      setMusiques(displaySound)
    };

    fetchMemeSoundData();

  }, []);


  const getWeatherBackgroundClass = () => {
    const backgroundClass = weatherConditionsGroup[currentWeatherText];
    // console.log(backgroundClass.background);
    return backgroundClass.background || 'default-background';
  };


   //fetch current data weather
   useEffect(() => {
    const weatherData = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&aqi=yes&alerts=yes`;
      } else {
        apiUrl = `http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=Lille&aqi=yes&alerts=yes`;
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
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&days=1&aqi=yes&alerts=yes`;
      } else {
        apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=1&aqi=yes&alerts=yes';
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForecastWeather(data);
      // console.log("Nouvelles données de prévisions 24h :", data);
    };
    weatherDataForecast();
  }, [weatherInput]);

  /*fetch forecast 5jrs*/
  useEffect(() => {
    const weatherForecast7 = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&days=7&aqi=no&alerts=yes`;
      } else {
        apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=Lille&days=7&aqi=no&alerts=yes';
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setForecastWeather7(data);
      // console.log("Nouvelles données de prévisions 7 jours :", data);
    };
    weatherForecast7();
  }, [weatherInput]);


  /*Navbar qui apparait au clik avec l'input pour la saisie d'une ville*/
  const handleCityClick = () => {
    console.log("déclenché");
    setShowNavBar(true);
  }

  //saisie input et à la soumission la Navbar disparait
  const handleWeatherInput = async (city) => {
  setLoadingCity(true);
  setWeatherInput(city);
    // Appel de l'API avec la city soumise dans la nav
    setWeatherInput(city);
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${city}&aqi=yes`);
      const data = await response.json();

      setCurrentWeather(data);
      setShowNavBar(false);
      setLoadingCity(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      setLoadingCity(false);
    }
  }


  // Au clik sur un des jours de prévisions dans le Carousel, la modal apparait avec le résumé des prévisions pour ce jour  
  const handleDayClick = (day) => {
    const date = format(day.date, 'eeee dd LLLL', { locale: fr });
    console.log(date);
    const sunrise = hourConvert(day.astro.sunrise);
    console.log(day.astro.sunset); //06:16 PM
    const sunset = hourConvert(day.astro.sunset);
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const rain = day.day.totalprecip_mm;
    const wind = day.day.maxwind_kph;
    const avgtemp_c = day.day.avgtemp_c;
    const avghumidity = day.day.avghumidity;
    const uv = day.day.uv;
    setSelectedDayInfo({ date, sunrise, sunset, maxTemp, minTemp, rain, wind, avgtemp_c, avghumidity, uv });
};
const handleCloseModal = () => {
    setSelectedDayInfo(null);
};


  ///// Carrousel page 1 pour la météo des 5 prochains jours /////
  const days = forecastWeather7.forecast?.forecastday?.map((day, index) => {
    const dayDate = new Date(day.date);
    return (
      <div className="week" key={index}>
        <Week
          day={formatDay(dayDate)}
          date={format(day.date, 'dd', { locale: fr })}
          weather={day.day.condition.code}
          temperature={day.day.avgtemp_c}
          onClick={() => handleDayClick(day)}
        />
      </div>
    );
  });


//on récupre l'heure actuelle
const currentTime = new Date().getHours();
//on filtre les prévisions par heure à PARTIR de l'heure actuelle
const filteredHours = forecastWeather.forecast && forecastWeather.forecast.forecastday && forecastWeather.forecast.forecastday.map((day, index) =>
  (
    <div className="MiniCards" key={index}>
      {/* substr extrait une partie de la chaîne de caractères hour.time. Elle commence à l'index 11 (pour obtenir les deux premiers caractères de l'heure) et extrait 2 caractères (pour obtenir les heures). */}
      {day.hour.filter(hour => parseInt(hour.time.substr(11, 2)) > currentTime).map((hour, index) => (
        <Day
          key={index}
          time={formatTime(hour.time)}
          weather={hour.condition.code}
          temperature={hour.temp_c}
        />
      ))}
    </div>
  ));


  ///// Carrousel page 3 pour les précipitations des 24 prochaines heures /////
  const minutes = forecastWeather && forecastWeather.forecast && forecastWeather.forecast.forecastday &&
    forecastWeather.forecast.forecastday.map((day, index) =>
    (
      <div className="precip" key={index}>
       {day.hour.filter(hour => parseInt(hour.time.substr(11, 2)) > currentTime).map((hour, index) => (
          <Precipitation
            key={index}
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
      <div className={`container ${getWeatherBackgroundClass()}`}>
        {/* composant Navbar qui apparait au clik sur la ville et permet la saisie d'une ville ou la geolocalisation */}
        {showNavBar && <HeaderNav onWeatherInput={handleWeatherInput} setLoadingCity={setLoadingCity} />}

       {/* test pour activer le son, désactivé par défaut */}
       <div className='sound-display'>
          <label >
            <PiSoundcloudLogo className='sound-icon'/>
          </label>
          <input
            type="checkbox"
            checked={autoplayEnabled}
            onChange={(e) => setAutoplayEnabled(e.target.checked)}
            className='sound-check'
          />
       </div>

        {/* Composant qui reprend le display de la ville actuelle (Location Name, Current Temp, et Icon Display*/}
        <CurrentCity 
        currentWeather={forecastWeather}  
        handleCityClick={handleCityClick} 
        />

         {/* Composant Weather Meme qui gère l'affichage du meme et le lancement du son selon les conditions météo*/}
        <WeatherMeme currentWeatherText={currentWeatherText} memes={memes} musiques={musiques}/>
  

        <div className='carousel-container'>
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
              <div className="week">
                {days}
              </div>
            </div>


            <div>
              <div className="MiniCards">
                {filteredHours}
              </div>
            </div>

            <div>
              <div className="precip">
                {minutes}
              </div>
            </div>


          </Carousel>
        </div>
        <>
        {selectedDayInfo && <Modal onClose={handleCloseModal} dayInfo={selectedDayInfo} />}
        </>
      </div>

    )
  }
}


export default App