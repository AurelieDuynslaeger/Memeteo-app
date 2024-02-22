import React, { useState, useEffect } from 'react';
import WeatherConditionsGroup from '../datas/weatherConditionsGroup'; // Import du fichier contenant les données de WeatherMappings
import { Switch } from 'antd';

const WeatherMeme = ({ currentWeatherText, memes, musiques, isMuted }) => {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [selectedMusique, setSelectedMusique] = useState(null);
 

  useEffect(() => {
    const weatherConditionsMap = WeatherConditionsGroup; //WeatherMemeMap => données de WeatherConditionsGroup

  if (currentWeatherText && memes.length > 0) {
    const filteredMemes = memes.filter(meme => {
      const memeName = weatherConditionsMap[currentWeatherText];
      return memeName && meme.name.toLowerCase() === memeName.meme;
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

  useEffect(() => {
    const weatherConditionsMap = WeatherConditionsGroup; //WeatherSoundMap => données de WeatherConditionsGroup

    if (currentWeatherText && musiques.length > 0) {
      const musiqueName = weatherConditionsMap[currentWeatherText];
      // console.log(musiqueName.sound); //cloudy
      const selectedMusique = musiques.find(musique => musique.name.toLowerCase() === musiqueName.sound);
      setSelectedMusique(selectedMusique || null);
    } else {
      setSelectedMusique(null);
    }
  }, [currentWeatherText, musiques]);

  // console.log(selectedMeme); // => memeName.name
  // console.log(selectedMusique); // => musiqueName.sound
  
 
  return (
    <div className="weather-meme">
      {selectedMeme && (
        <div>
          <img src={selectedMeme.image} alt={selectedMeme.name} className="meme-display" />
        </div>
      )}
      {selectedMusique && (
        <div>
          <audio src={selectedMusique.musique} autoPlay loop muted={isMuted} />
        </div>
      )}
    </div>
  );
};

export default WeatherMeme;


