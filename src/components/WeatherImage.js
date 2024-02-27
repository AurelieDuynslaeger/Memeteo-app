import React from "react"
import blizzard from "../assets/Weather Icons/blizzard.png";
// import blowingSnow from "../assets/Weather Icons/blowingSnow.png";
import cloudyDay from "../assets/Weather Icons/cloudyDay.png";
import cloudyNight from "../assets/Weather Icons/cloudyNight.png";
import fogDay from "../assets/Weather Icons/fogDay.png";
import fogNight from "../assets/Weather Icons/fogNight.png";
import freezingDrizzleDay from "../assets/Weather Icons/freezingDrizzleDay.png";
import freezingDrizzleNight from "../assets/Weather Icons/freezingDrizzleNight.png";
import freezingFogDay from "../assets/Weather Icons/freezingFogDay.png";
import freezingFogNight from "../assets/Weather Icons/freezingFogNight.png";
import heavyRain from "../assets/Weather Icons/heavyRain.png";
import heavyRainAtTime from "../assets/Weather Icons/heavyRainAtTime.png";
import icePellets from "../assets/Weather Icons/icePellets.png";
import lightDrizzleDay from "../assets/Weather Icons/LightDrizzleDay.png";
import lightDrizzleNight from "../assets/Weather Icons/LightDrizzleNight.png";
import lightFreezinRain from "../assets/Weather Icons/lightFreezingRain.png";
// import lightRain from "../assets/Weather Icons/lightRain.png";
import lightRainShowerDay from "../assets/Weather Icons/lightRainShowerDay.png";
import lightRainShowerNight from "../assets/Weather Icons/lightRainShowerNight.png";
// import lightSleet from "../assets/Weather Icons/lightSleet.png";
import lightSleetDay from "../assets/Weather Icons/lightSleetDay.png";
import lightSleetNight from "../assets/Weather Icons/lightSleetNight.png";
import lightSnowShowerDay from "../assets/Weather Icons/lightSnowShowerDay.png";
import lightSnowShowerNight from "../assets/Weather Icons/lightSnowShowerNight.png";
import mist from "../assets/Weather Icons/mist.png";
import ModerateOrHeavyFreezingRain from "../assets/Weather Icons/moderateOrHeavyFreezingRain.png";
import ModerateOrHeavyRainShower from "../assets/Weather Icons/moderateOrHeavyRainShower.png";
import moderateOrHeavyRainwithThunderDay from "../assets/Weather Icons/moderateOrHeavyRainwithThunderDay.png";
import moderateOrHeavySleetShower from "../assets/Weather Icons/ModerateOrHeavySleetShower.png";
import moderateOrHeavySnowShower from "../assets/Weather Icons/ModerateOrHeavySnowShower.png";
import moderateOrHeavySnowWithThunder from "../assets/Weather Icons/ModerateOrHeavySnowWithThunder.png";
import moderateSnow from "../assets/Weather Icons/moderateSnow.png";
import overcastDay from "../assets/Weather Icons/overcastDay.png";
import overcastNight from "../assets/Weather Icons/overcastNight.png";
import partlyCloudyDay from "../assets/Weather Icons/partlyCloudyDay.png";
import partlyCloudyNight from "../assets/Weather Icons/partlyCloudyNight.png";
import patchlyLightRainWithThunder from "../assets/Weather Icons/patchlyLightRainWithThunder.png";
import patchlyLightSnowWithThunder from "../assets/Weather Icons/patchlyLightSnowWithThunder.png";
import patchyFreezingDrizzlePossibleDay from "../assets/Weather Icons/patchyFreezingDrizzlePossibleDay.png";
import patchyFreezingDrizzlePossibleNight from "../assets/Weather Icons/patchyFreezingDrizzlePossibleNight.png";
import patchlyLightDrizzleDay from "../assets/Weather Icons/patchyLightDrizzleDay.png";
import patchyLightDrizzleKnight from "../assets/Weather Icons/patchyLightDrizzleNight.png";
import patchyRainPossibleDay from "../assets/Weather Icons/patchyRainPossibleDay.png";
import patchyRainPossibleNight from "../assets/Weather Icons/patchyRainPossibleNight.png";
import patchySleetPossibleDay from "../assets/Weather Icons/patchySleetPossibleDay.png";
import patchySleetPossibleNight from "../assets/Weather Icons/patchySleetPossibleNight.png";
import patchySnowPossibleDay from "../assets/Weather Icons/patchySnowPossibleDay.png";
import patchySnowPossibleNight from "../assets/Weather Icons/patchySnowPossibleNight.png";
import pluieEparse from "../assets/Weather Icons/pluieEparse.png";
// import pollution from "../assets/Weather Icons/pollution.png";
import SunnyDay from "../assets/Weather Icons/SunnyDay.png";
import SunnyNight from "../assets/Weather Icons/SunnyNight.png";
import ThunderyOutbreaksPossibleDay from "../assets/Weather Icons/ThunderyOutbreaksPossibleDay.png";
import ThunderyOutbreaksPossibleNight from "../assets/Weather Icons/ThunderyOutbreaksPossibleNight.png";
import torrentialRainShower from "../assets/Weather Icons/torrentialRainShower.png";
// import Wind from "../assets/Weather Icons/Wind.png";



const weatherImages = [
    {
        "code": 1000,
        "day": "Sunny",
        "dayDisplay": SunnyDay ,
        "nightDisplay": SunnyNight 
    },
    {
        "code": 1003,
        "day": "Partly cloudy",
        "dayDisplay":  partlyCloudyDay ,
        "nightDisplay": partlyCloudyNight 
    },
    {
        "code": 1006,
        "day": "Cloudy",
        "dayDisplay": cloudyDay ,
        "nightDisplay": cloudyNight ,
    },
    {
        "code": 1009,
        "day": "Overcast",
        "dayDisplay": overcastDay ,
        "nightDisplay": overcastNight 
    },
    {
        "code": 1030,
        "day": "Mist",
        "dayDisplay": mist ,
        "nightDisplay": mist ,
    },
    {
        "code": 1063,
        "day": "Patchy rain possible",
        "dayDisplay": patchyRainPossibleDay ,
        "nightDisplay": patchyRainPossibleNight ,
    },
    {
        "code": 1066,
        "day": "Patchy snow possible",
        "dayDisplay": patchySnowPossibleDay,
        "nightDisplay": patchySnowPossibleNight,
    },
    {
        "code": 1069,
        "day": "Patchy sleet possible",
        "dayDisplay": patchySleetPossibleDay,
        "nightDisplay": patchySleetPossibleNight,
    },
    {
        "code": 1072,
        "day": "Patchy freezing drizzle possible",
        "dayDisplay": patchyFreezingDrizzlePossibleDay,
        "nightDisplay": patchyFreezingDrizzlePossibleNight,
    },
    {
        "code": 1087,
        "day": "Thundery outbreaks possible",
        "dayDisplay": ThunderyOutbreaksPossibleDay,
        "nightDisplay": ThunderyOutbreaksPossibleNight,
    },
    {
        "code": 1114,
        "day": "Blowing snow",
        "dayDisplay": blowingSnow,
        "nightDisplay": blowingSnow,
    },
    {
        "code": 1117,
        "day": "Blizzard",
        "dayDisplay": blizzard,
        "nightDisplay": blizzard,

    },
    {
        "code": 1135,
        "day": "Fog",
        "dayDisplay": fogDay,
        "nightDisplay": fogNight,
    },
    {
        "code": 1147,
        "day": "Freezing fog",
        "dayDisplay": freezingFogDay,
        "nightDisplay": freezingFogNight,
    },
    {
        "code": 1150,
        "day": "Patchy light drizzle",
        "dayDisplay": patchlyLightDrizzleDay,
        "nightDisplay": patchyLightDrizzleKnight,
    },
    {
        "code": 1153,
        "day": "Light drizzle",
        "dayDisplay":  lightDrizzleDay,
        "nightDisplay": lightDrizzleNight,
    },
    {
        "code": 1168,
        "day": "Freezing drizzle",
        "dayDisplay": freezingDrizzleDay,
        "nightDisplay": freezingDrizzleNight,
    },
    {
        "code": 1171,
        "day": "Heavy freezing drizzle",
        "dayDisplay": freezingDrizzleDay,
        "nightDisplay": freezingDrizzleNight,
    },
    {
        "code": 1180,
        "day": "Patchy light rain",
        "dayDisplay": pluieEparse,
        "nightDisplay": pluieEparse,
    },

    {
        "code": 1183,
        "day": "Light rain",
        "dayDisplay": lightRainShowerDay,
        "nightDisplay": lightRainShowerNight,
    },
    {
        "code": 1186,
        "day": "Moderate rain at times",
        "dayDisplay": heavyRainAtTime,
        "nightDisplay": heavyRainAtTime,
    },
    {
        "code": 1189,
        "day": "Moderate rain",
        "dayDisplay": ModerateOrHeavyRainShower,
        "nightDisplay": ModerateOrHeavyRainShower,
    },
    {
        "code": 1192,
        "day": "Heavy rain at times",
        "dayDisplay": heavyRainAtTime,
        "nightDisplay": heavyRainAtTime,
    },
    {
        "code": 1195,
        "day": "Heavy rain",
        "dayDisplay": heavyRain,
        "nightDisplay": heavyRain,
    },
    {
        "code": 1198,
        "day": "Light freezing rain",
        "dayDisplay": lightFreezinRain,
        "nightDisplay": lightFreezinRain,
    },
    {
        "code": 1201,
        "day": "Moderate or heavy freezing rain",
        "dayDisplay": ModerateOrHeavyFreezingRain,
        "nightDisplay": ModerateOrHeavyFreezingRain,
    },
    {
        "code": 1204,
        "day": "Light sleet",
        "dayDisplay": lightSleetDay,
        "nightDisplay": lightSleetNight,
    },
    {
        "code": 1207,
        "day": "Moderate or heavy sleet",
        "dayDisplay": moderateOrHeavySleetShower,
        "nightDisplay": moderateOrHeavySleetShower,
    },
    {
        "code": 1210,
        "day": "Patchy light snow",
        "dayDisplay": lightSnowShowerDay,
        "nightDisplay": lightSnowShowerNight,
    },
    {
        "code": 1213,
        "day": "Light snow",
        "dayDisplay": lightSnowShowerDay,
        "nightDisplay": lightSnowShowerNight,
    },
    {
        "code": 1216,
        "day": "Patchy moderate snow",
        "dayDisplay": patchySnowPossibleDay,
        "nightDisplay": patchySnowPossibleNight,
    },
    {
        "code": 1219,
        "day": "Moderate snow",
        "dayDisplay": moderateSnow,
        "nightDisplay": moderateSnow,
    },
    {
        "code": 1222,
        "day": "Patchy heavy snow",
        "dayDisplay": patchySnowPossibleDay,
        "nightDisplay": patchySnowPossibleNight,
    },
    {
        "code": 1225,
        "day": "Heavy snow",
        "dayDisplay": moderateOrHeavySnowShower,
        "nightDisplay": moderateOrHeavySnowShower,
    },
    {
        "code": 1237,
        "day": "Ice pellets",
        "dayDisplay": icePellets,
        "nightDisplay": icePellets,
    },
    {
        "code": 1240,
        "day": "Light rain shower",
        "dayDisplay": lightRainShowerDay,
        "nightDisplay": lightRainShowerNight,
    },
    {
        "code": 1243,
        "day": "Moderate or heavy rain shower",
        "dayDisplay": ModerateOrHeavyRainShower,
        "nightDisplay": ModerateOrHeavyRainShower,
    },
    {
        "code": 1246,
        "day": "Torrential rain shower",
        "dayDisplay": torrentialRainShower,
        "nightDisplay": torrentialRainShower,
    },
    {
        "code": 1249,
        "day": "Light sleet showers",
        "dayDisplay": lightSleetDay,
        "nightDisplay": lightSleetNight,
    },
    {
        "code": 1252,
        "day": "Moderate or heavy sleet showers",
        "dayDisplay": moderateOrHeavySleetShower,
        "nightDisplay": moderateOrHeavySleetShower,
    },
    {
        "code": 1255,
        "day": "Light snow showers",
        "dayDisplay": lightSnowShowerDay,
        "nightDisplay": lightSnowShowerNight,
    },
    {
        "code": 1258,
        "day": "Moderate or heavy snow showers",
        "dayDisplay": moderateOrHeavySnowShower,
        "nightDisplay": moderateOrHeavySnowShower,
    },
    {
        "code": 1261,
        "day": "Light showers of ice pellets",
        "dayDisplay": icePellets,
        "nightDisplay": icePellets,
    },
    {
        "code": 1264,
        "day": "Moderate or heavy showers of ice pellets",
        "dayDisplay": icePellets,
        "nightDisplay": icePellets,
    },
    {
        "code": 1273,
        "day": "Patchy light rain with thunder",
        "dayDisplay": patchlyLightRainWithThunder,
        "nightDisplay": patchlyLightRainWithThunder,

    },
    {
        "code": 1276,
        "day": "Moderate or heavy rain with thunder",
        "dayDisplay": moderateOrHeavyRainwithThunderDay,
        "nightDisplay": moderateOrHeavyRainwithThunderDay,
    },
    {
        "code": 1279,
        "day": "Patchy light snow with thunder",
        "dayDisplay": patchlyLightSnowWithThunder,
        "nightDisplay": patchlyLightSnowWithThunder,
    },
    {
        "code": 1282,
        "day": "Moderate or heavy snow with thunder",
        "dayDisplay": moderateOrHeavySnowWithThunder,
        "nightDisplay": moderateOrHeavySnowWithThunder,
    },
];



const WeatherImage = ({ currentWeather }) => {
    const currentCode = currentWeather?.current?.condition?.code;
    const isDay = currentWeather?.current?.is_day === 1;

    const image = weatherImages.find(image => image.code === currentCode);
    if (!image) return null;

    const selectedImage = isDay ? image.dayDisplay : image.nightDisplay;

    return <div className="images-display">
        <img className="image-display" src={selectedImage} alt="" />
    </div>;
};


export default WeatherImage;