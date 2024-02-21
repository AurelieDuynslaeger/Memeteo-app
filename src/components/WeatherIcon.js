import React from "react"
import { WiNightClear, WiDaySunny, WiDaySunnyOvercast, WiDayFog, WiNightFog, WiNightAltPartlyCloudy, WiDayRainMix, WiNightAltRainMix, WiNightAltSnow, WiDaySnow, WiDaySleet, WiNightAltSleet, WiCloudy, WiDayRainWind, WiNightRainWind, WiSnowflakeCold, WiNightAltStormShowers, WiDayThunderstorm, WiDust, WiSnow, WiDayShowers, WiNightAltShowers, WiDaySnowWind, WiNightAltSnowWind, WiSnowWind, WiNightAltThunderstorm, WiNightAltSnowThunderstorm, WiDaySnowThunderstorm } from "react-icons/wi";
import { GiSnowing } from "react-icons/gi";
import { MdSevereCold } from "react-icons/md";
import { LiaCloudMoonRainSolid, LiaCloudRainSolid, LiaCloudShowersHeavySolid } from "react-icons/lia";
import { BsCloudRainHeavyFill, BsCloudRainHeavy, BsCloudSleetFill, BsCloudSleet } from "react-icons/bs";



const weatherIcons = [
  {
    "code": 1000,
    "day": "Sunny",
    "icon": <WiDaySunny />,
    "nightIcon": <WiNightClear />,

  },
  {
    "code": 1003,
    "day": "Partly cloudy",
    "icon": <WiCloudy />,
    "nightIcon": <WiNightAltPartlyCloudy />,

  },
  {
    "code": 1006,
    "day": "Cloudy",
    "icon": <WiCloudy />,
    "nightIcon": <WiNightAltPartlyCloudy />,

  },
  {
    "code": 1009,
    "day": "Overcast",
    "icon": <WiDaySunnyOvercast />,
    "nightIcon": <WiNightAltPartlyCloudy />,

  },
  {
    "code": 1030,
    "day": "Mist",
    "icon": <WiDust />,
    "nightIcon": <WiDust />,

  },
  {
    "code": 1063,
    "day": "Patchy rain possible",
    "icon": <WiDayRainMix />,
    "nightIcon": <WiNightAltRainMix />,

  },
  {
    "code": 1066,
    "day": "Patchy snow possible",
    "icon": <WiDaySnow />,
    "nightIcon": <WiNightAltSnow />,

  },
  {
    "code": 1069,
    "day": "Patchy sleet possible",
    "icon": <WiDaySleet />,
    "nightIcon": <WiNightAltSleet />,

  },
  {
    "code": 1072,
    "day": "Patchy freezing drizzle possible",
    "icon": <WiDayRainWind />,
    "nightIcon": <WiNightRainWind />,

  },
  {
    "code": 1087,
    "day": "Thundery outbreaks possible",
    "icon": <WiDayThunderstorm />,
    "nightIcon": <WiNightAltStormShowers />,

  },
  {
    "code": 1114,
    "day": "Blowing snow",
    "icon": <WiSnowflakeCold />,
    "nightIcon": <WiSnowflakeCold />,

  },
  {
    "code": 1117,
    "day": "Blizzard",
    "icon": <GiSnowing />,
    "nightIcon": <GiSnowing />,


  },
  {
    "code": 1135,
    "day": "Fog",
    "icon": <WiDayFog />,
    "nightIcon": <WiNightFog />,

  },
  {
    "code": 1147,
    "day": "Freezing fog",
    "icon": <WiDayFog />,
    "nightIcon": <WiNightFog />,

  },
  {
    "code": 1150,
    "day": "Patchy light drizzle",
    "icon": <WiDayRainWind />,
    "nightIcon": <WiNightRainWind />,

  },
  {
    "code": 1153,
    "day": "Light drizzle",
    "icon": <WiDayRainWind />,
    "nightIcon": <WiNightRainWind />,

  },
  {
    "code": 1168,
    "day": "Freezing drizzle",
    "icon": <MdSevereCold />,
    "nightIcon": <MdSevereCold />,

  },
  {
    "code": 1171,
    "day": "Heavy freezing drizzle",
    "icon": <MdSevereCold />,
    "nightIcon": <MdSevereCold />,

  },
  {
    "code": 1180,
    "day": "Patchy light rain",
    "icon": <LiaCloudRainSolid />,
    "nightIcon": <LiaCloudMoonRainSolid />,

  },

  {
    "code": 1183,
    "day": "Light rain",
    "icon": <LiaCloudRainSolid />,
    "nightIcon": <LiaCloudRainSolid />,

  },
  {
    "code": 1186,
    "day": "Moderate rain at times",
    "icon": <WiDayRainMix />,
    "nightIcon": <WiNightAltRainMix />,

  },
  {
    "code": 1189,
    "day": "Moderate rain",
    "icon": <WiDayRainMix />,
    "nightIcon": <WiNightAltRainMix />,

  },
  {
    "code": 1192,
    "day": "Heavy rain at times",
    "icon": <BsCloudRainHeavy />,
    "nightIcon": <BsCloudRainHeavyFill />,

  },
  {
    "code": 1195,
    "day": "Heavy rain",
    "icon": <BsCloudRainHeavy />,
    "nightIcon": <BsCloudRainHeavyFill />,

  },
  {
    "code": 1198,
    "day": "Light freezing rain",
    "icon": <WiDayRainMix />,
    "nightIcon": <WiNightAltRainMix />,

  },
  {
    "code": 1201,
    "day": "Moderate or heavy freezing rain",
    "icon": <BsCloudRainHeavy />,
    "nightIcon": <BsCloudRainHeavyFill />,

  },
  {
    "code": 1204,
    "day": "Light sleet",
    "icon": <BsCloudSleet />,
    "nightIcon": <BsCloudSleetFill />,

  },
  {
    "code": 1207,
    "day": "Moderate or heavy sleet",
    "icon": <BsCloudSleet />,
    "nightIcon": <BsCloudSleetFill />,

  },
  {
    "code": 1210,
    "day": "Patchy light snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1213,
    "day": "Light snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1216,
    "day": "Patchy moderate snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1219,
    "day": "Moderate snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1222,
    "day": "Patchy heavy snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1225,
    "day": "Heavy snow",
    "icon": <WiSnow />,
    "nightIcon": <WiSnow />,

  },
  {
    "code": 1237,
    "day": "Ice pellets",
    "icon": <WiSnowflakeCold />,
    "nightIcon": <WiSnowflakeCold />,

  },
  {
    "code": 1240,
    "day": "Light rain shower",
    "icon": <WiDayShowers />,
    "nightIcon": <WiNightAltShowers />,

  },
  {
    "code": 1243,
    "day": "Moderate or heavy rain shower",
    "icon": <WiDayShowers />,
    "nightIcon": <WiNightAltShowers />,

  },
  {
    "code": 1246,
    "day": "Torrential rain shower",
    "icon": <LiaCloudShowersHeavySolid />,
    "nightIcon": <LiaCloudShowersHeavySolid />,

  },
  {
    "code": 1249,
    "day": "Light sleet showers",
    "icon": <LiaCloudShowersHeavySolid />,
    "nightIcon": <LiaCloudShowersHeavySolid />,

  },
  {
    "code": 1252,
    "day": "Moderate or heavy sleet showers",
    "icon": <LiaCloudShowersHeavySolid />,
    "nightIcon": <LiaCloudShowersHeavySolid />,

  },
  {
    "code": 1255,
    "day": "Light snow showers",
    "icon": <WiDaySnowWind />,
    "nightIcon": <WiNightAltSnowWind />,

  },
  {
    "code": 1258,
    "day": "Moderate or heavy snow showers",
    "icon": <WiSnowWind />,
    "nightIcon": <WiSnowWind />,

  },
  {
    "code": 1261,
    "day": "Light showers of ice pellets",
    "icon": <WiSnowWind />,
    "nightIcon": <WiSnowWind />,

  },
  {
    "code": 1264,
    "day": "Moderate or heavy showers of ice pellets",
    "icon": <WiSnowWind />,
    "nightIcon": <WiSnowWind />,

  },
  {
    "code": 1273,
    "day": "Patchy light rain with thunder",
    "icon": <WiDayThunderstorm />,
    "nightIcon": <WiNightAltThunderstorm />
  },
  {
    "code": 1276,
    "day": "Moderate or heavy rain with thunder",
    "icon": <WiDayThunderstorm />,
    "nightIcon": <WiNightAltThunderstorm />
  },
  {
    "code": 1279,
    "day": "Patchy light snow with thunder",
    "icon": <WiDaySnowThunderstorm />,
    "nightIcon": <WiNightAltSnowThunderstorm />
  },
  {
    "code": 1282,
    "day": "Moderate or heavy snow with thunder",
    "icon": <WiDaySnowThunderstorm />,
    "nightIcon": <WiNightAltSnowThunderstorm />
  },
];



const WeatherIcon = ({ currentWeather }) => {
  const currentCode = currentWeather?.current?.condition?.code;
  const isDay = currentWeather?.current?.is_day === 1;

  const icon = weatherIcons.find(icon => icon.code === currentCode);
  if (!icon) return null;

  const selectedIcon = isDay ? icon.icon : icon.nightIcon;

  return <div className="icon-display">{selectedIcon}</div>;
};


export default WeatherIcon;