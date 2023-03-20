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
function showWeather(response) {
  console.log(response);
  let showTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let dateformat = document.querySelector("#date");
  let iconformat = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;
  showTemp.innerHTML = `${temperature}`;
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
  givenTemp.innerHTML = math.round(fahrenheitConversion);
}

let celciusTemp = null;

let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", searchBox);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);
