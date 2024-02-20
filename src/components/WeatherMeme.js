import React, { useState, useEffect } from 'react';
import WeatherConditionsGroup from '../datas/weatherConditionsGroup'; // Import du fichier contenant les données de WeatherMappings

const WeatherMeme = ({ currentWeatherText, memes, musiques }) => {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [selectedMusique, setSelectedMusique] = useState(null);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('default-background'); 

  useEffect(() => {
    const weatherMemeMap = WeatherConditionsGroup; //WeatherMemeMap => données de WeatherConditionsGroup

    if (currentWeatherText && memes.length > 0) {
      const memeName = weatherMemeMap[currentWeatherText];
      const filteredMemes = memes.filter(meme => meme.name.toLowerCase() === memeName);
      const randomIndex = Math.floor(Math.random() * filteredMemes.length);
      const randomMeme = filteredMemes[randomIndex];
      setSelectedMeme(randomMeme);

      // Mise à jour de l'état du fond d'écran en fonction de la condition météorologique actuelle
      const backgroundColor = weatherMemeMap[currentWeatherText] || 'default-background';
      setSelectedBackgroundColor(backgroundColor);
    } else {
      setSelectedMeme(null);
      setSelectedBackgroundColor('default-background');
    }
  }, [currentWeatherText, memes]);

  useEffect(() => {
    const weatherSoundMap = WeatherConditionsGroup; //WeatherSoundMap => données de WeatherConditionsGroup

    if (currentWeatherText && musiques.length > 0) {
      const musiqueName = weatherSoundMap[currentWeatherText];
      const selectedMusique = musiques.find(musique => musique.name.toLowerCase() === musiqueName);
      setSelectedMusique(selectedMusique || null);
    } else {
      setSelectedMusique(null);
    }
  }, [currentWeatherText, musiques]);


  return (
    <div className="weather-meme">
      {selectedMeme && (
        <div>
          <img src={selectedMeme.image} alt={selectedMeme.name} className="meme-display" />
        </div>
      )}
      {selectedMusique && (
        <div>
          <audio src={selectedMusique.musique} autoPlay />
        </div>
      )}
    </div>
  );
};

export default WeatherMeme;


