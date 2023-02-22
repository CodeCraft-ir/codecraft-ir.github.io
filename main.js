import weatherUi, { changeWeather } from "./js/weather-ui.js";
import { weatherFetch } from "./js/weather-api.js";

(async function init() {
  const currentCity = "paris";
  let weather = [
    { type: "snow", name: "Snow" },
    { type: "wind", name: "Windy" },
    { type: "rain", name: "Rain" },
    { type: "thunder", name: "Storms" },
    { type: "sun", name: "Sunny" },
  ];

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
  weatherUi(currentWeather);
  setWeatherDetail(weatherData)
  function setWeatherDetail(weatherData){
    
  const temp = document.querySelector(".degree");
  temp.textContent = weatherData.temperature;

  const windSpeed = document.querySelector(".windSpeed");
  windSpeed.textContent = weatherData.wind_speed ;

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  const date = document.querySelector("#date");
  date.textContent = day + "/" + month + "/" + year;

  const time = document.querySelector("#time");
  time.textContent = weatherData.observation_time;

  }
  document.querySelector(".cityName").value = currentCity
  document.addEventListener("click", getWeatherCity);

  async function getWeatherCity() {
    const cityName = document.querySelector(".cityName").value;
      weatherData = await weatherFetch(cityName);
      for (const weatherName in weatherCodes) {
        if (weatherCodes[weatherName].includes(weatherData.weather_code)) {
          currentWeather = weather.find((w) => weatherName == w.type);
        }
      }
      weatherUi(currentWeather);
      setWeatherDetail(weatherData)
  
  }
})();


