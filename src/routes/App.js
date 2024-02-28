import React, { Fragment, useEffect, useState } from "react";

//import composant Ant Design et React Icons
import { Carousel, Drawer, Radio, Switch } from "antd";
import { FiSettings } from "react-icons/fi";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatTime, hourConvert, formatDay } from "../utils/functions.js";
import weatherConditionsGroup from "../datas/weatherConditionsGroup.js";

//import des composants
import Alerts from "../components/Alerts.js";
import CurrentCity from "../components/CurrentCity.js";
import Day from "../components/Day.js";
import Logo from "../components/Logo.js";
import Modal from "../components/Modal.js";
import RainDrop from "../components/RainDrop";
import SearchBox from "../components/SearchBox.js";
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
    setIsMuted(!isMuted);
  };

  //Drawer
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right"); //par défaut sur la droite, modifiable au onClick sur l'icone Settings
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
  //gestion du background, des memes et des sons grâce aux conditions actuelles renvoyées par l'api
  const currentWeatherText = weatherData?.current?.condition?.text;
  // console.log(currentWeatherText) = Light rain
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
        apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiWeather}&q=${weatherInput}&days=5&aqi=no&alerts=yes`;
      } else {
        apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiWeather}&q=Lille&days=5&aqi=no&alerts=yes`;
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
    }
  }, [currentWeatherText]);

  // ajout dynamique de la classe sur le body
  useEffect(() => {
    // on récupère le tag body
    const body = window.document.getElementsByTagName('body')[0] || null;

    // si body existe (cas contraire qui n'arrivera jamais mais bon)
    if (body) {
      // on supprime toutes les classes
      for (let value of body.classList.values()) {
        body.classList.remove(value)
      }
      
      // ici, on ajoute la classe 'dark-mode' ou 'backgroundClass' (pour la couleur dynamique)
      if (isDarkMode || backgroundClass) body.classList.add(isDarkMode ? 'dark-mode' : backgroundClass)
    }
  }, [backgroundClass, isDarkMode]) // dès qu'une de ces valeurs change, le code dans le useEffect sera executé




  //saisie input et à la soumission la Navbar disparait
  const handleWeatherInput = async (city) => {
    setLoadingCity(true);
    setWeatherInput(city);
    // Appel de l'API avec la city soumise dans la nav
    setWeatherInput(city);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5929e663f6c74ae192890247240802&q=${city}&days=5&aqi=no&alerts=yes`);
      const data = await response.json();

      setWeatherData(data);
      setLoadingCity(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setLoadingCity(false);
    }
  };

  // Au clik sur un des jours (props day) de prévisions dans le Carousel, la modal apparait avec le résumé des prévisions pour ce jour
  const handleDayClick = (day) => {
    const date = format(day.date, "eeee dd LLLL", { locale: fr });
    //console.log(date);
    const sunrise = hourConvert(day.astro.sunrise);
    // console.log(day.astro.sunset); //06:16 PM
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
    setSelectedDayInfo({date, sunrise, sunset, maxTemp, minTemp, rain, wind, wind_dir, wind_dir_text, avgtemp_c, avghumidity, uv});
  };
  const handleCloseModal = () => {
    setSelectedDayInfo(null);
  };

  ///// Carrousel page 1 pour la météo des 5 prochains jours /////
  const days = weatherData.forecast?.forecastday?.map((day, index) => {
    const dayDate = new Date(day.date);
    // console.log(format(day.date, 'dd', { locale: fr }));
    return (
        <Week
          key={index}
          day={formatDay(dayDate)}
          date={format(day.date, "dd", { locale: fr })}
          weather={day.day.condition.code}
          temperature={day.day.avgtemp_c}
          onClick={() => handleDayClick(day)}
        />
    );
  });


//step 1 get current_time_epoch en timestamp pour le comparer au timestamp unix de l'api "hour.time_epoch"
const current_time_epoch = Math.floor(Date.now()/1000); //millisecondes en secondes à l'entier inférieur le plus proche
// = 1709045760
// 24h de + = diff de 86 400 millisecondes
//récupérer le time_epoch à 24h de plus
const next_day_time_epoch = current_time_epoch + 86400; 


//Step 2 mapper et filtrer jusqu'au next_day_time_epoch
const filteredHours = weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday.map((day, index1) => (
  <Fragment key={index1}>
    {day.hour.filter(hour => {
      // Conversion du timestamp de l'heure de la prévision en seconde
      const hour_time_epoch = parseInt(hour.time_epoch);

      // Filtre les heures à partir de l'heure actuelle jusqu'à celle du lendemain à la même heure
      return hour_time_epoch >= current_time_epoch && hour_time_epoch <= next_day_time_epoch;
    }).map((hour, index2) => (
      <Day
        key={index2}
        time={formatTime(hour.time)}
        weather={hour.condition.code}
        isDay={hour.is_day}
        temperature={hour.temp_c}
      />
    ))}
  </Fragment>
));

  //test composant RainDrop pour le % de pluie
  // const rainTest = weatherData?.forecast?.forecastday;
  // console.log('log du test pluie' ,rainTest);
  ///// Carrousel page 3 pour les précipitations des 24 prochaines heures /////
  const rainPercent = weatherData && weatherData.forecast && weatherData.forecast.forecastday &&
    weatherData.forecast.forecastday.map((day, index) =>
    (
      <React.Fragment key={index}> 
      {day.hour.filter(hour => {
      // Conversion du timestamp de l'heure de la prévision en seconde
      const hour_time_epoch = parseInt(hour.time_epoch);

      // Filtre les heures à partir de l'heure actuelle jusqu'à celle du lendemain à la même heure
      return hour_time_epoch >= current_time_epoch && hour_time_epoch <= next_day_time_epoch;
    }).map((hour, index) => (
      <div key={index}>
        <p className='rain-time'>{formatTime(hour.time)}</p>
        <RainDrop pourcentage={hour.chance_of_rain} />
      </div>
    ))}
  </React.Fragment>
));

  //affichage des alertes si l'api en renvoit
  const alertsList =
    weatherData.forecast &&
    weatherData.alerts &&
    weatherData.alerts.alert.map((alert, index) => {
      return <Alerts key={index} event={alert.event} expires={alert.expires} />;
    });

  // Utilisation du WeatherSkeleton si loadingCity (chargement de la ville) = true
  if (loadingCity) {
    return <WeatherSkeleton />;
  } else {
    return (
      <div className="container">
        {/* HEADER = logo + searchBox + params (light/dark mode + sound) */}
        <header>
          <Logo isDarkMode={isDarkMode}></Logo>

          {/* Affichage des params */}
          <div className="settings"><FiSettings className="settings-icon" onClick={() => showDrawer("right")} /></div>
            <Drawer title="Paramètres" placement={placement} onClose={onClose} open={open}>
              <div className="icon-display">
                <Switch checked={isDarkMode} onClick={toggleDarkMode} className={isDarkMode ? "darkmode-switch" : "lightmode-switch"} />
              </div>
              <div className="sound-display">
                <Switch checked={!isMuted} onClick={toggleMute} className={isMuted ? "muted-switch" : "unmuted-switch"}/>
              </div>
            </Drawer>

          {/* composant Navbar qui permet la saisie d'une ville ou la geolocalisation */}
          <SearchBox onWeatherInput={handleWeatherInput} setLoadingCity={setLoadingCity} />
          
        </header>

        {/* MAIN*/}
        <main>
          <div className="group">
            
            <section className="currentWeatherForecast">
              {/* Composant qui reprend le display de la ville actuelle (Location Name, Current Temp, et Icon Display*/}
              <CurrentCity currentWeather={weatherData}
              />
              {/* Ajout d'une condition pour n'afficher la div des alerts que s'il y a des alertes */}
              <div className={(alertsList && alertsList.length>0) ? "alerts" : "alerts hidden"}>{alertsList}</div>
            </section>

            <section className="currentWeatherImage">
              {weatherData && <WeatherImage currentWeather={weatherData} />}
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
    );
  }
};

export default App;
