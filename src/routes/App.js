import React, { useEffect, useState } from 'react'
/* import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; */
import { Modal } from 'antd';
import airQualityIcon from "../assets/icons/airquality.svg"
import feelsLikeIcon from "../assets/icons/feelslike.svg"
import humidityIcon from "../assets/icons/humidity.svg"
import uvIcon from "../assets/icons/uv.svg"
import windIcon from "../assets/icons/wind.svg";
import { FaSearchLocation } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { Drawer, Form, Input, Row, Col, Space, Button } from 'antd';
import { TiInfoLarge } from "react-icons/ti";
import { formatTime } from '../utils/dateUtils';
import "../stylesheet/Root.scss";
import WeatherSkeleton from '../components/WeatherSkeleton.js';


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {


    
  //météo a l'instant T
  const [currentWeather, setCurrentWeather] = useState({});
  //météo prévisions 24h (pluie et heure par heure)
  const [forecastWeather, setForecastWeather] = useState({});
  //météo prévisions 7 (jour-temps-icon)
  const [forecastWeather7, setForecastWeather7] = useState({});
  //meme conditionné sur les prévisions
  // const [memeWeather, setmemeWeather] = useState({});
  //modal détails du jour
  const [isModalOpen, setIsModalOpen] = useState(false);
  //menu input pour saisie de la ville
  const [open, setOpen] = useState(false);
  const [weatherInput, setWeatherInput] = useState('');

  const [loadingCity, setLoadingCity] = useState(false);


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

  // useEffect(() => {
  //   const weatherMeme = async () => {
  //     const response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=NhMenzJ8ulP0QRBmKtl0MFPfJFfyoVTF&q=cold&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips").then(response => response.json());
  //     const data = response;
  //     setmemeWeather(data);
  //   };
  //   weatherMeme();
  // });

  //modal open et fermeture
const showModal = () => {
  setIsModalOpen(true);
}
const handleOk = () => {
  setIsModalOpen(false);
};

//menu open sur input ville
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};

//fetch pour la saisie d'une nouvelle localité
const submitCity = () => {
  const weatherData = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&aqi=yes&lang=fr`).then(response => response.json());
    const data = response;
    setCurrentWeather(data);
  };
  weatherData();
}

const handleInputChange = (e) => {
setWeatherInput(e.target.value);
};

const handleFormSubmit = (e) => {
e.preventDefault();
submitCity();
};

/* geolocalisation */
function handleCurrentLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position)=>{
      const { latitude, longitude } = position.coords;
      setWeatherInput(`${latitude},${longitude}`);
      
      try {
          setLoadingCity(true);
          const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${weatherInput}&aqi=yes&lang=fr`).then(response => response.json()); 
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

// Utilisation du WeatherSkeleton si loadingCity (chargement de la ville) = true
if (loadingCity) {
  return <WeatherSkeleton />;
} else {
  return (
    <div className="container">
        <>
      <Drawer
        title="Saisir une autre ville"
        width={450}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
            height:30,
          },
        }}
      >
        <MdMyLocation 
          title="Votre position actuelle" // when you hover, you can see this title
          onClick={handleCurrentLocation}
         />
        <Form layout="vertical" onSubmit={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label=""
                rules={[
                  {
                    required: !!weatherInput,
                    message: 'Tapez votre recherche',
                  },
                ]}
              >
                <Input placeholder="Tapez votre recherche ici..." value={weatherInput} onChange={handleInputChange}/>
                {/* <Space>
                  <Button type="primary" htmlType='submit'>
                  <FaSearchLocation/>
                  </Button>
                </Space> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
        </>
      <div className='city'>
            {/* <CiSettings/> */}
            {/* onClick = navigation vers les paramètres */}
            {/* <h4>{format(parseISO(dataWeather?.location?.localtime))}</h4> */}
            <h3 className='city-name' onClick={showDrawer}>{currentWeather?.location?.name}</h3>
            <h3 className='current-temp' onClick={showModal}>{currentWeather?.current?.temp_c}°C <TiInfoLarge width={3} height={3}/></h3>
            
            <img src={currentWeather?.current?.condition?.icon} alt="current weather condition icon" className='icon-weather-display'/>
            <p>{currentWeather?.current?.condition?.text}</p>
      </div>
      <Modal open={isModalOpen} onOk={handleOk}>
            <div className="forecast">
              <h4>Détails Temps Actuel</h4>
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
      </Modal>
      <div className="weather-meme">

      </div>
    </div>
  )
}}

export default App