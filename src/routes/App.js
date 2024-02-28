import React, { useEffect, useState } from "react";

//import composant Ant Design et React Icons
import { Carousel, Drawer, Radio, Switch } from 'antd';
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatTime, hourConvert, formatDay } from '../utils/functions.js';
import weatherConditionsGroup from '../datas/weatherConditionsGroup.js';

//import des composants
import Alerts from "../components/Alerts.js";
import CurrentCity from "../components/CurrentCity.js";
import Day from "../components/Day.js";
import SearchBox from "../components/SearchBox.js";
import Modal from "../components/Modal.js";
import RainDrop from "../components/RainDrop";
import WeatherImage from "../components/WeatherImage.js";
import WeatherMeme from "../components/WeatherMeme.js";
import WeatherSkeleton from "../components/WeatherSkeleton.js";
import Week from "../components/Week.js";

//import des feuilles de styles
import "../stylesheet/Root.scss";

const App = () => {

  const apiWeather = process.env.REACT_APP_WEATHER_API_KEY;

  /////////////////// HOOKS d'états (true/false) ///////////////////

  //Darkmode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Sound
  const [isMuted, setIsMuted] = useState(true);
  //toggle qui permet l'utilisateur de diffuser ou non le son, par défaut il est désactivé
  //Fonction pour activer/désactiver le mute
  const toggleMute = () => {
    console.log(isMuted)
    setIsMuted(!isMuted);
  };

  //NavBAr => true clik sur la ville
  const [showNavBar, setShowNavBar] = useState(false);

  //permet l'affichage ou non du weather skeletton
  const [loadingCity, setLoadingCity] = useState(false);
  
  //Drawer
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left'); //par défaut sur la gauche, modifiable au onClick sur l'icone Settings
  const showDrawer = (placementValue) => {
    setPlacement(placementValue);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //Etat des Infos Modal
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  
  //Etat des données météo
  const [weatherData, setWeatherData] = useState({});
  //Etat de l'input de la SeachBox
  const [weatherInput, setWeatherInput] = useState("");
  //Etat des Memes
  const [memes, setMemes] = useState([]);
  //Etat des Sons
  const [musiques, setMusiques] = useState([]);
  //toggle qui permet l'utilisateur de diffuser ou non le son, par défaut il est désactivé
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  //carousel dots, le right va indiquer le côté où mettre les points
  const [dotPosition, setDotPosition] = useState("right");
  //ce qui va permettre de passer à une slide du carrousel en cliquant sur le point
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  //permet l'affichage ou non du weather skeletton
  const [loadingCity, setLoadingCity] = useState(false);
  //état du background
  const [backgroundClass, setBackgroundClass] = useState("");

  /////////////////// HOOKS d'effets (WeatherData, Background, Memes/Sons) ///////////////////
  //fetch des données météo
  useEffect(() => {
    const fetchWeatherData = async () => {
      let apiUrl;
      if (weatherInput) {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiWeather}&q=${weatherInput}&days=5&aqi=no&alerts=yes`;
      } else {
        apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiWeather}&q=Lille&days=5&aqi=no&alerts=yes`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
      // console.log("Nouvelles données de prévisions 7 jours :", data);
    };
    fetchWeatherData();
  }, [weatherInput, apiWeather]);

  //Fetch pour aller chercher les memes et les sons sur notre API
  const fetchData = async (endpoint) => {
    const apiUrl = `https://memeteo-api.onrender.com/${endpoint}`;
    // https://memeteo-api.onrender.com/memes
    const response = await fetch(apiUrl);
    return response.json();
  };
  useEffect(() => {
    const fetchMemeSoundData = async () => {
      const displayMeme = await fetchData("memes");
      setMemes(displayMeme);

      const displaySound = await fetchData("musiques");
      setMusiques(displaySound);
    };
    fetchMemeSoundData();
  }, []);

  //couleur background dynamique
  useEffect(() => {
    //si le text des conditions météo est dans notre tableau weatherConditionsGroup
    if (currentWeatherText in weatherConditionsGroup) {
      // on récup la class du background à mettre dans la className
      const weatherBackgroundClass =
        weatherConditionsGroup[currentWeatherText].background;
        // console.log(weatherBackgroundClass) = rain-backgroung
      // on met à jour l'état du background dans le state
      setBackgroundClass(weatherBackgroundClass);
    } else {
      // Sinon on affiche les erreurs
      console.error(
        `Aucune correspondance trouvée pour les conditions météorologiques actuelles : ${currentWeatherText}`
      );
    }
  }, [currentWeatherText]);


  //carousel dots
  const [dotPosition, setDotPosition] = useState("right");
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  
  /*Navbar qui apparait au clik avec l'input pour la saisie d'une ville*/
  const handleCityClick = () => {
    setShowNavBar(true);
  };

  //saisie input et à la soumission la Navbar disparait
  const handleWeatherInput = async (city) => {
    setLoadingCity(true);
    setWeatherInput(city);
    // Appel de l'API avec la city soumise dans la nav
    setWeatherInput(city);
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiWeather}&q=${city}&days=5&aqi=no&alerts=yes`);
      const data = await response.json();

      setWeatherData(data);
      setShowNavBar(false);
      setLoadingCity(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setLoadingCity(false);
    }
  };

  // Au clik sur un des jours (props day) de prévisions dans le Carousel, la modal apparait avec le résumé des prévisions pour ce jour
  const handleDayClick = (day) => {
    const date = format(day.date, "eeee dd LLLL", { locale: fr });
    console.log(date);
    const sunrise = hourConvert(day.astro.sunrise);
    console.log(day.astro.sunset); //06:16 PM
    const sunset = hourConvert(day.astro.sunset);
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const rain = day.day.totalprecip_mm;
    const wind = day.day.maxwind_kph;
    const wind_dir = weatherData?.current?.wind_dir;
    const wind_dir_text = weatherData?.current?.wind_dir;
    const avgtemp_c = day.day.avgtemp_c;
    const avghumidity = day.day.avghumidity;
    const uv = day.day.uv;
    setSelectedDayInfo({ date, sunrise, sunset, maxTemp, minTemp, rain, wind, wind_dir,wind_dir_text, avgtemp_c, avghumidity, uv });
  };
  const handleCloseModal = () => {
    setSelectedDayInfo(null);
  };

  ///// Carrousel page 1 pour la météo des 5 prochains jours /////
  const days = weatherData.forecast?.forecastday?.map((day, index) => {
    const dayDate = new Date(day.date);
    // console.log(format(day.date, 'dd', { locale: fr }));
    return (
      <div className="week" key={index}>
        {/* //récupération du composant week */}
        <Week
          key={index}
          day={formatDay(dayDate)}
          date={format(day.date, "dd", { locale: fr })}
          weather={day.day.condition.code}
          temperature={day.day.avgtemp_c}
          onClick={() => handleDayClick(day)}
        />
      </div>
    );
  });

//on récupère la date actuelle
  const currentDate = new Date().toISOString().split('T')[0];
  // currentDate = 2024-02-26
  //on récupère l'heure actuelle
  const currentTime = new Date().getHours();
  // currentTime = 21
  //on filtre les prévisions par heure à PARTIR de l'heure actuelle
  const filteredHours =
    forecastWeather.forecast &&
    forecastWeather.forecast.forecastday &&
    forecastWeather.forecast.forecastday.map((day, index) => (
      <div className="MiniCards" key={index}>
        {/* substr extrait une partie de la chaîne de caractères hour.time. Elle commence à l'index 11 (pour obtenir les deux premiers caractères de l'heure) et extrait 2 caractères (pour obtenir les heures). */}
        {day.hour
          .filter((hour) => parseInt(hour.time.substr(11, 2)) > currentTime)
          .map((hour, index) => (
            //récupération du composant day
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
  const rainPercent =
    forecastWeather &&
    forecastWeather.forecast &&
    forecastWeather.forecast.forecastday &&
    forecastWeather.forecast.forecastday.map((day, index) => (
      <>
        {day.hour
          .filter((hour) => parseInt(hour.time.substr(11, 2)) > currentTime)
          .map((hour, index) => (
            <div>
              <p className="rain-time">{formatTime(hour.time)}</p>
              {/* //récupération du composant RainDrop */}
              <RainDrop pourcentage={hour.chance_of_rain} />
            </div>
          ))}
      </>
    ));

  // Utilisation du WeatherSkeleton si loadingCity (chargement de la ville) = true
  if (loadingCity) {
    return <WeatherSkeleton />;
  } else {
    return (
      <div className={isDarkMode ? `container dark-mode` : `container ${backgroundClass}`}>
          {/* HEADER = searchBox + params (light/dark mode + sound) */}
          <header>
            {/* composant Navbar qui apparait au clik sur la ville et permet la saisie d'une ville ou la geolocalisation */}
            {showNavBar && (
              <SearchBox
                onWeatherInput={handleWeatherInput}
                setLoadingCity={setLoadingCity}
              />
            )}
          </header>

        <MdOutlineSettingsSuggest className='settings-icon' onClick={() => showDrawer('left')}/>
        <>
          <Drawer title="Paramètres" placement={placement} onClose={onClose} open={open}>
              <div className='icon'>
                <p>🔆</p>
                <Switch onClick={toggleDarkMode} />
                <p>🌙</p>
              </div>
              <div className='sound-display'>
                <Switch
                  checked={!isMuted}
                  onClick={toggleMute}
                  className={isMuted ? 'muted-switch' : 'unmuted-switch'}
                />
              </div>
          </Drawer>
        </>

        {/* MAIN*/}
        <main>
            <div className="group">
                <section className="currentWeatherForecast">
                  {/* Composant qui reprend le display de la ville actuelle (Location Name, Current Temp, et Icon Display*/}
                  <CurrentCity
                    currentWeather={weatherData}
                    handleCityClick={handleCityClick}
                  />
                  {/* test de placement de la div alerts afin qu'elle soit tjr sous la ville desktop OU mobile  */}
                <div className='alerts'>
                  {alertsList}
                </div>
                </section>


                <section className="currentWeatherImage">
                  {weatherData && <WeatherImage currentWeather={weatherData}/>}
                </section>       
                <section className="meme">
                {/* Composant Weather Meme qui gère l'affichage du meme et le lancement du son selon les conditions météo*/}
                <WeatherMeme currentWeatherText={currentWeatherText} memes={memes} musiques={musiques} isMuted={isMuted}/>
                </section>
            </div>

            <div>
              <section className="carousel">
                <div className="carousel-container">

                  {/* //radio.group va permettre de définir le mode de changement de diapo et la position des points */}
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
                        {rainPercent}
                      </div>
                    </div>
                  </Carousel>
                </div>
                <>
                  {/* modal déclenchée au clik sur un jour du carousel */}
                  {selectedDayInfo && <Modal onClose={handleCloseModal} dayInfo={selectedDayInfo} />}
                </>
              </section>
            </div>
          </main>
      </div>
    )
  }
};

export default App;
