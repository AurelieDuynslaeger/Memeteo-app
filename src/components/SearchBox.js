import React, { useState } from "react";

//import composant Ant Design et React Icons
import { FaStar } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

// import des assets
import Logo from "../assets/memteo-logo-base.png";
import LogoNega from "../assets/memteo-logo-base_nega.png";

//import des feuilles de styles
import "../stylesheet/_searchBox.scss";
import "../stylesheet/_suggestionBox.scss";

//import des composants
import SuggestionBox from "./SuggestionBox.js";

export const SearchBox = ({ onWeatherInput, setLoadingCity, isDarkMode }) => {
  const [city, setCity] = useState("");

  // Suggestions de villes
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFavoris, setShowFavoris] = useState(false);

  async function handleInputChange(value) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=5929e663f6c74ae192890247240802&q=${value}`
        );
        if (!response.ok) {
          throw new Error("Ville non trouvée");
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
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  //soumission du formulaire ou la props reprends le nom de la city pour la véhiculer sur App
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Formulaire soumis", city);
    if (error) {
      setError("Location not found");
    } else {
      setError("");
      // Appel de la fonction de gestion de la ville dans l'app component
      onWeatherInput(city);
      // Effacer l'input après la soumission
      setCity("");
      setShowSuggestions(false);
      setShowFavoris(false);
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
      <img src={isDarkMode ? `${LogoNega}` : `${Logo}`} alt="Logo Memetéo" className="logo" />
      <div class="setCity">
        <div>
          <MdMyLocation
            title="Votre position actuelle" // légende affichée lors du hover
            onClick={handleGeolocation}
            className="iconLarger"
          />
        </div>
        <div>
          <FaStar
            title="Vos favoris" // légende affichée lors du hover
            onClick={() => {setShowFavoris(!showFavoris);}}
            className="iconLarger"
          />
        </div>
        <form>
          <input
            placeholder="Tapez votre recherche ici..."
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{ showSuggestions, suggestions, handleSuggestionClick, error }}
          />
          <button htmlType="submit" onClick={(e) => handleFormSubmit(e)}>
            <IoSearch class="iconSearch" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
