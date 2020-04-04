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
    "Saturday"
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

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(time);
  currentDay.innerHTML = showDay();
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
let city = "Los angeles";
let apiKey = "c30b70227281106a3ea7b3125756ea7f";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(url).then(displayWeather);
