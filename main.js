import weatherUi, { changeWeather } from "./js/weather-ui.js";
import { weatherFetch } from "./js/weather-api.js";

(async function init() {
  const currentCity = "moscow";
  let weather = [
    { type: "snow", name: "Snow" },
    { type: "wind", name: "Windy" },
    { type: "rain", name: "Rain" },
    { type: "thunder", name: "Storms" },
    { type: "sun", name: "Sunny" },
  ];

  const weatherNames = {
    113: "Sunny",
    116: "Partly cloudy",
    119: "Cloudy",
    122: "Overcast",
    143: "Mist",
    248: "Fog",
    200: "Thundery outbreaks possible",
    305: "Heavy rain at times",
    308: "Heavy rain",
    176: "Patchy rain possible",
    263: "Patchy light drizzle",
    266: "Light drizzle",
    293: "Patchy light rain",
    296: "Light rain",
    299: "Moderate rain at times",
    302: "Moderate rain",
    179: "Patchy snow possible",
    182: "Patchy sleet possible",
    185: "Patchy freezing drizzle possible",
    227: "Blowing snow",
    230: "Blizzard",
    260: "Freezing fog",
    281: "Freezing drizzle",
    284: "Heavy freezing drizzle",
    311: "Light freezing rain",
  };
  const weatherCodes = {
    sun: [113],
    wind: [116, 119, 122, 143, 248],
    thunder: [200, 305, 308],
    rain: [176, 263, 266, 293, 296, 299, 302],
    snow: [179, 182, 185, 227, 230, 260, 281, 284, 311],
  };

  let currentWeather = "snow";
  let weatherData = await weatherFetch(currentCity);
  for (const weatherName in weatherCodes) {
    if (weatherCodes[weatherName].includes(weatherData.weather_code)) {
      currentWeather = weather.find((w) => weatherName == w.type);
    }
  }
  currentWeather = {
    type: currentWeather.type,
    name: weatherNames[weatherData.weather_code],
  };
  weatherUi(currentWeather);
  setWeatherDetail(weatherData);
  function setWeatherDetail(weatherData) {
    const temp = document.querySelector(".degree");
    temp.textContent = weatherData.temperature;

    const windSpeed = document.querySelector(".windSpeed");
    windSpeed.textContent = weatherData.wind_speed;

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    const date = document.querySelector("#date");
    date.textContent = day + "/" + month + "/" + year;

    const time = document.querySelector("#time");
    time.textContent = weatherData.observation_time;
  }
  document.querySelector(".cityName").value = currentCity;
  document.addEventListener("click", getWeatherCity);

  async function getWeatherCity() {
    const cityName = document.querySelector(".cityName").value;
    weatherData = await weatherFetch(cityName);
    for (const weatherName in weatherCodes) {
      if (weatherCodes[weatherName].includes(weatherData.weather_code)) {
        currentWeather = weather.find((w) => weatherName == w.type);
      }
    }
    currentWeather = {
      type: currentWeather.type,
      name: weatherNames[weatherData.weather_code],
    };

    weatherUi(currentWeather);
    setWeatherDetail(weatherData);
  }
})();
