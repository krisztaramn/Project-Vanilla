function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return hours + ":" + minutes;
}
function showDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return day;
}
function displayWeather(response) {
  let currentTemperature = document.querySelector(".current-temperature");
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let currentDay = document.querySelector(".current-day");
  let iconElement = document.querySelector("#icon-today");

  celsiusValue = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusValue);
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(time);
  currentDay.innerHTML = showDay();
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.getElementById("celsius").style.fontSize = "1.5em";
  document.getElementById("fahrenheit").style.fontSize = "1em";
}
function search(city) {
  let apiKey = "c30b70227281106a3ea7b3125756ea7f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function showCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input");
  search(cityElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".current-temperature");
  fahrenheit.innerHTML = Math.round((celsiusValue * 9) / 5 + 32);
  document.getElementById("celsius").style.fontSize = "1em";
  document.getElementById("fahrenheit").style.fontSize = "1.5em";
}

function showCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".current-temperature");
  celsius.innerHTML = Math.round(celsiusValue);
  document.getElementById("celsius").style.fontSize = "1.5em";
  document.getElementById("fahrenheit").style.fontSize = "1em";
}

function showCurrentLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    let apiKey = "c30b70227281106a3ea7b3125756ea7f";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayForecast(response) {
  let secondDay = document.querySelector("#second-temperature");
  let thirdDay = document.querySelector("#third-temperature");
  let fourthDay = document.querySelector("#fourth-temperature");
  let fifthDay = document.querySelector("#fifth-temperature");
  let sixthDay = document.querySelector("#sixth-temperature");
  let secondIcon = document.querySelector("#second-icon");
  let thirdIcon = document.querySelector("#third-icon");
  let fourthIcon = document.querySelector("#fourth-icon");
  let fifthIcon = document.querySelector("#fifth-icon");
  let sixthIcon = document.querySelector("#sixth-icon");

  secondDay.innerHTML = Math.round(response.data.list[7].main.temp);
  thirdDay.innerHTML = Math.round(response.data.list[15].main.temp);
  fourthDay.innerHTML = Math.round(response.data.list[23].main.temp);
  fifthDay.innerHTML = Math.round(response.data.list[31].main.temp);
  sixthDay.innerHTML = Math.round(response.data.list[39].main.temp);
  secondIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`
  );
  secondIcon.setAttribute("alt", response.data.list[7].weather[0].description);
  thirdIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[15].weather[0].icon}@2x.png`
  );
  thirdIcon.setAttribute("alt", response.data.list[15].weather[0].description);
  fourthIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[23].weather[0].icon}@2x.png`
  );
  fourthIcon.setAttribute("alt", response.data.list[23].weather[0].description);
  fifthIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[31].weather[0].icon}@2x.png`
  );
  fifthIcon.setAttribute("alt", response.data.list[31].weather[0].description);
  sixthIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[39].weather[0].icon}@2x.png`
  );
  sixthIcon.setAttribute("alt", response.data.list[39].weather[0].description);
}

let celsiusValue = null;

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentLocation);

search("Lisbon");
