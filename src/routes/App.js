import React, { useEffect, useState } from 'react'


import nonprecip from '../assets/icons/nonPrecipitation.svg';
import precip from '../assets/icons/precipitation.svg';


//import composant Ant Design et React Icons
import { Carousel, Radio } from 'antd';
import { format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatTime } from '../utils/dateUtils';

//import des composants
import WeatherSkeleton from '../components/WeatherSkeleton.js';
import Week from '../components/Week.js';
import Day from '../components/Day.js';
import HeaderNav from '../components/HeaderNav.js';
import Precipitation from '../components/Precipitation.js';
import CurrentCity from '../components/CurrentCity.js'
import Modal from '../components/Modal.js'
// import WeatherMeme from '../components/WeatherMeme.js';

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
  //toggle qui permet l'utilisateur de diffuser ou non le son, par défaut il est désactivé
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  //Constante pour filtrer les sons
  const [selectedMusique, setSelectedMusique] = useState(null);
  //Constante pour filtrer les memes
  const [selectedMeme, setSelectedMeme] = useState(null);
  // Constante pour stocker le texte des conditions météos actuelles
  const currentWeatherText = currentWeather?.current?.condition?.text;
  //Fetch pour aller chercher les memes sur notre API
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('http://localhost:7000/memes');
        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des memes:', error);
      }
    };

    fetchMemes();
  }, []);
  //Fetch pour aller chercher les sons sur notre API
  useEffect(() => {
    const fetchMusiques = async () => {
      try {
        const response = await fetch('http://localhost:7000/musiques');
        const data = await response.json();
        setMusiques(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des musiques:', error);
      }
    };

    fetchMusiques();
  }, []);
  
  //Conditionnement pour que la description de la condition météo soit le meme que le nom du meme. 
  useEffect(() => {
    const  weatherMemeMap  = {
      'Sunny': 'sun',
      'Partly cloudy': 'cloudy',
      'Cloudy': 'cloudy',
      'Overcast': 'cloudy',
      'Patchy rain possible': 'rain',
      'Moderate or heavy freezing rain': 'rain',
      'Light freezing rain': 'rain',
      'Heavy rain': 'rain',
      'Heavy rain at times': 'rain',
      'Moderate rain': 'rain',
      'Moderate rain at times': 'rain',
      'Light rain': 'rain',
      'Light rain shower': 'rain',
      'Moderate or heavy rain shower': 'rain',
      'Patchy light rain': 'rain',
      'Torrential rain shower': 'rain',
      'Wind': 'wind',
      'Blowing snow': 'snow',
      'Patchy snow possible': 'snow',
      'Patchy sleet possible': 'snow',
      'Blizzard': 'snow',
      'Light snow showers': 'snow',
      'Moderate or heavy snow showers': 'snow',
      'Patchy light snow with thunder': 'snow',
      'Moderate or heavy snow with thunder': 'snow',
      'Moderate or heavy sleet': 'snow',
      'Patchy light snow': 'snow',
      'Light snow': 'snow',
      'Patchy moderate snow': 'snow',
      'Moderate snow': 'snow',
      'Patchy heavy snow': 'snow',
      'Heavy snow': 'snow',
      'Patchy freezing drizzle possible': 'freezing',
      'Freezing drizzle': 'freezing',
      'Light sleet': 'freezing',
      'Light sleet showers': 'freezing',
      'Moderate or heavy sleet showers': 'freezing',
      'Light showers of ice pellets': 'freezing',
      'Ice pellets': 'verglas',
      'Thundery outbreaks possible': 'thunderstorm',
      'Patchy light rain with thunder': 'thunderstorm',
      'Moderate or heavy rain with thunder': 'thunderstorm',
      'Heatwave': 'heatwave',
      'Fog': 'fog',
      'Mist': 'fog',
      'Freezing fog': 'fog',
      'Patchy light drizzle': 'fog',
      'Light drizzle': 'fog',
    };

    if (currentWeatherText && memes.length > 0) {
      const filteredMemes = memes.filter(meme => {
        const memeName = weatherMemeMap[currentWeatherText];
        return memeName && meme.name.toLowerCase() === memeName;
      });

      if (filteredMemes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMemes.length);
        const randomMeme = filteredMemes[randomIndex];
        setSelectedMeme(randomMeme);
      } else {
        setSelectedMeme(null);
      }
    } else {
      setSelectedMeme(null);
    }
  }, [currentWeatherText, memes]);

  //Conditionnement pour que la description de la condition météo soit le meme que le nom du son.
  useEffect(() => {
    const weatherSoundMap = {
      'Sunny': 'sun',
      'Partly cloudy': 'cloudy',
      'Cloudy': 'cloudy',
      'Overcast': 'cloudy',
      'Patchy rain possible': 'rain',
      'Moderate or heavy freezing rain': 'rain',
      'Light freezing rain': 'rain',
      'Heavy rain': 'rain',
      'Heavy rain at times': 'rain',
      'Moderate rain': 'rain',
      'Moderate rain at times': 'rain',
      'Light rain': 'rain',
      'Light rain shower': 'rain',
      'Moderate or heavy rain shower': 'rain',
      'Patchy light rain': 'rain',
      'Torrential rain shower': 'rain',
      'Wind': 'wind',
      'Blowing snow': 'snow',
      'Patchy snow possible': 'snow',
      'Patchy sleet possible': 'snow',
      'Blizzard': 'snow',
      'Light snow showers': 'snow',
      'Moderate or heavy snow showers': 'snow',
      'Patchy light snow with thunder': 'snow',
      'Moderate or heavy snow with thunder': 'snow',
      'Moderate or heavy sleet': 'snow',
      'Patchy light snow': 'snow',
      'Light snow': 'snow',
      'Patchy moderate snow': 'snow',
      'Moderate snow': 'snow',
      'Patchy heavy snow': 'snow',
      'Heavy snow': 'snow',
      'Patchy freezing drizzle possible': 'freezing',
      'Freezing drizzle': 'freezing',
      'Light sleet': 'freezing',
      'Light sleet showers': 'freezing',
      'Moderate or heavy sleet showers': 'freezing',
      'Light showers of ice pellets': 'freezing',
      'Ice pellets': 'verglas',
      'Thundery outbreaks possible': 'thunderstorm',
      'Patchy light rain with thunder': 'thunderstorm',
      'Moderate or heavy rain with thunder': 'thunderstorm',
      'Heatwave': 'heatwave',
      'Fog': 'fog',
      'Mist': 'fog',
      'Freezing fog': 'fog',
      'Patchy light drizzle': 'fog',
      'Light drizzle': 'fog',
    };

    if (currentWeatherText && musiques.length > 0) {
      const musiqueName = weatherSoundMap[currentWeatherText];
      const selectedMusique = musiques.find(musiques => musiques.name.toLowerCase() === musiqueName);

      setSelectedMusique(selectedMusique || null);
    } else {
      setSelectedMusique(null);
    }
  }, [currentWeatherText, musiques]);

  const weatherBackgrounds = {
    'Sunny': 'sun-background',
    'Partly cloudy': 'cloudy-background',
    'Cloudy': 'cloudy-background',
    'Overcast': 'cloudy-background',
    'Patchy rain possible': 'rain-background',
    'Moderate or heavy freezing rain': 'rain-background',
    'Light freezing rain': 'rain-background',
    'Heavy rain': 'rain-background',
    'Heavy rain at times': 'rain-background',
    'Moderate rain': 'rain-background',
    'Moderate rain at times': 'rain-background',
    'Light rain': 'rain-background',
    'Light rain shower': 'rain-background',
    'Moderate or heavy rain shower': 'rain-background',
    'Patchy light rain': 'rain-background',
    'Torrential rain shower': 'rain-background',
    'Wind': 'wind-background',
    'Blowing snow': 'snow-background',
    'Patchy snow possible': 'snow-background',
    'Patchy sleet possible': 'snow-background',
    'Blizzard': 'snow-background',
    'Light snow showers': 'snow-background',
    'Moderate or heavy snow showers': 'snow-background',
    'Patchy light snow with thunder': 'snow-background',
    'Moderate or heavy snow with thunder': 'snow-background',
    'Moderate or heavy sleet': 'snow-background',
    'Patchy light snow': 'snow-background',
    'Light snow': 'snow-background',
    'Patchy moderate snow': 'snow-background',
    'Moderate snow': 'snow-background',
    'Patchy heavy snow': 'snow-background',
    'Heavy snow': 'snow-background',
    'Patchy freezing drizzle possible': 'freezing-background',
    'Freezing drizzle': 'freezing-background',
    'Light sleet': 'freezing-background',
    'Light sleet showers': 'freezing-background',
    'Moderate or heavy sleet showers': 'freezing-background',
    'Light showers of ice pellets': 'freezing-background',
    'Ice pellets': 'verglas-background',
    'Thundery outbreaks possible': 'thunderstorm-background',
    'Patchy light rain with thunder': 'thunderstorm-background',
    'Moderate or heavy rain with thunder': 'thunderstorm-background',
    'Heatwave': 'heatwave-background',
    'Fog': 'fog-background',
    'Mist': 'fog-background',
    'Freezing fog': 'fog-background',
    'Patchy light drizzle': 'fog-background',
    'Light drizzle': 'fog-background',
  };
  const getWeatherBackgroundClass = () => {
    return weatherBackgrounds[currentWeatherText] || 'default-background';
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
      console.log("Nouvelles données de prévisions 24h :", data);
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
      console.log("Nouvelles données de prévisions 7 jours :", data);
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


  // fonction de formattage des am-pm en heures : on récup une chaine de caractères de l'api '06:16 PM'
  const hourConvert = (hour)=> {
    const [time, update] = hour.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (update === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}h${minutes}`;
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



  //formattage du jour (date-fns) isToday
  const formatDay = (date) => {
    //si la date récupéré est Today alors on affiche 'auj.' au lieu de l'abbraviation du jour
    if(isToday(date)) {
      return 'auj.';
    } else {
      return format(date, 'E',{ locale: fr })
    }
  }

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
        <label>
            Lecture automatique :
            <input
              type="checkbox"
              checked={autoplayEnabled}
              onChange={(e) => setAutoplayEnabled(e.target.checked)}
            />
        </label>


        {/* Composant qui reprend le display de la ville actuelle (Location Name, Current Temp, et Icon Display*/}
        <CurrentCity 
        currentWeather={forecastWeather}  
        handleCityClick={handleCityClick} 
        />
 
        {/* <WeatherMeme currentWeatherText={currentWeatherText} memes={memes} musiques={musiques} /> */}
        <div className="weather-meme">
          {selectedMeme && (
            <div>
              <img src={selectedMeme.image} alt={selectedMeme.name} class="meme-display"/>
            </div>
          )}
          {selectedMusique && (
            <div>
              <audio src={selectedMusique.musique} autoPlay={autoplayEnabled} />
            </div>
          )}
        </div>
  

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