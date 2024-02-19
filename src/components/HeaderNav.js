import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaCheck } from "react-icons/fa";
import Logo from "../assets/logoMemteo.png";
import "../stylesheet/HeaderNav.scss";
import { MdMyLocation } from "react-icons/md";

export const HeaderNav = ({ onWeatherInput }) => {
  const [city, setCity] = useState("");
  //const [loadingCity, setLoadingCity] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("Input value :", value);
    setCity(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis", city);
    // Appel de la fonction de gestion de la ville dans l'app component
    onWeatherInput(city);
    // Effacer l'input après la soumission
    setCity("");
  };

  /* geolocalisation */
  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        //setLoadingCity(true);
        setCity(`${latitude}, ${longitude}`);
        try {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=5929e663f6c74ae192890247240802&q=${latitude},${longitude}&aqi=yes`
          ).then((response) => response.json());
          setTimeout(() => {
            const data = response;
            onWeatherInput(city);
            //setLoadingCity(false);
          }, 500);
        } catch (error) {
          //setLoadingCity(false);
        }
      });
    }
  }

  return (
    <div className="navbar">
      <img src={Logo} alt="Logo Memetéo" className="logo" />

      <Form layout="inline">
        <Form.Item>
            <MdMyLocation
            title="Votre position actuelle" // when you hover, you can see this title
            onClick={handleCurrentLocation}
            className='geolocalisationIcon'
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Tapez votre recherche ici..."
            value={city}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleFormSubmit}>
            <FaCheck color="#51ADCE" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderNav;
