let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function showWeather(response) {
  console.log(response);
  let showTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);

  showTemp.innerHTML = `${temperature}°C`;
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector(
    "#windspeed"
  ).innerHTML = `Windspeed: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels Like: ${response.data.main.feels_like}`;
}

function searchBox(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input").value;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", searchBox);

let today = weekdays[now.getDay()];
let month = allMonths[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let displayDate = document.querySelector("#date");
displayDate.innerHTML = `${today}, ${month} ${date}, ${year}`;

let hours = now.getHours();
let minutes = now.getMinutes();
let displayTime = document.querySelector("#time");
displayTime.innerHTML = `${hours}:${minutes}`;
