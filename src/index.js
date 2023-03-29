let now = new Date();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sun"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastCard = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
              <div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  class="icon"
                  height="55px"
                />
              </div>
              <span class="dayOfWeek"> ${formatDay(forecastDay.dt)}</span>
              <div>${Math.round(forecastDay.temp.max)}°| <span>${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastCard.innerHTML = forecastHTML;
}
function forecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  console.log(response);
  let showTemp = document.querySelector("#temperature");
  let dateformat = document.querySelector("#date");
  let iconformat = document.querySelector("#icon");
  celciusTemp = Math.round(response.data.main.temp);
  showTemp.innerHTML = `${celciusTemp}`;
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
  dateformat.innerHTML = formatDate(response.data.dt * 1000);
  iconformat.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  forecast(response.data.coord);
}

function searchBox(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input").value;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function displayfahrenheitTemp(event) {
  event.preventDefault();
  let givenTemp = document.querySelector("#temperature");
  let fahrenheitConversion = (celciusTemp * 9) / 5 + 32;
  givenTemp.innerHTML = Math.round(fahrenheitConversion);
}
function displayCelciusTemp(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#temperature");
  let celciusConversion = celciusTemp;
  farenheitTemp.innerHTML = `${celciusConversion}`;
}
let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);
let celciusTemp = null;

let celciusLink = document.querySelector("#C-link");
celciusLink.addEventListener("click", displayCelciusTemp);

let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", searchBox);
