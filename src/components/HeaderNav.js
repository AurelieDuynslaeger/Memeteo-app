import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaCheck } from "react-icons/fa";
import Logo from "../assets/memteo-logo-base.png";
import { MdMyLocation } from "react-icons/md";


//import des feuilles de styles
import "../stylesheet/HeaderNav.scss";
import "../stylesheet/_suggestionBox.scss";

//import des composants
import SuggestionBox from "./SuggestionBox.js";


export const HeaderNav = ({ onWeatherInput, setLoadingCity }) => {
  const [city, setCity] = useState("");


  // Suggestions de villes
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  async function handleInputChange(value) {
    setCity(value);
    //console.log("Input value after :", value);
    if(value.length >= 3) {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=5929e663f6c74ae192890247240802&q=${value}`);
        if (!response.ok) {
          throw new Error('Ville non trouvée');
        }

        const data = await response.json();

        const suggestions = data.map((item) => `${item.name}, ${item.country}`);
        // console.log(suggestions);
        setSuggestions(suggestions || []);
        setError("");
        setShowSuggestions(true);

      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  //soumission du formulaire ou la props reprends le nom de la city pour la véhiculer sur App
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Formulaire soumis", city);
    if(error) {
      setError("Location not found");
    } else {
      setError("");
      // Appel de la fonction de gestion de la ville dans l'app component
      onWeatherInput(city);
      // Effacer l'input après la soumission
      setCity("");
      setShowSuggestions(false);
    }
  };


  function handleSuggestionClick(value) {
    setCity(value);
    setShowSuggestions(false);
  }

  /* geolocalisation */
  const handleGeolocation = (e) => {
    setLoadingCity(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        onWeatherInput(`${latitude},${longitude}`);
      });
    }
  };

  return (
    <div className="navbar">
      <img src={Logo} alt="Logo Memetéo" className="logo" />

      <Form layout="inline">
        <Form.Item>
          <MdMyLocation
            title="Votre position actuelle" // when you hover, you can see this title
            onClick={handleGeolocation}
            className='geolocalisationIcon'
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Tapez votre recherche ici..."
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{showSuggestions,
              suggestions,
              handleSuggestionClick,
              error}}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={(e) => handleFormSubmit(e)}>
            <FaCheck color="#51ADCE" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderNav;
