function getCityDetails(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city-searched").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}
function getLocation(position) {
  navigator.geolocation.getCurrentPosition(getLocation);

  let unit = "metric";
  let apiKey = "bcd824dedcf9dc8f450882168cd39bc4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(getCityDetails);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

function defaultCity(cityInput) {
  let apiKey = "bcd824dedcf9dc8f450882168cd39bc4";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(getCityDetails);
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city").value;
  defaultCity(cityInput);
}

function changeCelsius(event) {
  event.preventDefault;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
function changeFahrenheit(event) {
  event.preventDefault;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temp = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
celsius.addEventListener("click", changeCelsius);
fahrenheit.addEventListener("click", changeFahrenheit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTLM = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTLM =
        forecastHTLM +
        `<div class="col-2">
                <div class="forecast-day" id="forecastDay">${formatDay(
                  forecastDay.dt
                )}</div>
                
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"; 
                alt="clear" 
                id="forecastIcon"
                width="40px">
                <div class="forecast-temps">
                  <span class="forecase-max" id="maxTemp">${Math.round(
                    forecastDay.temp.max
                  )}º</span>
                  <span class="forecast-min" id="minTemp">${Math.round(
                    forecastDay.temp.min
                  )}º</span>
                </div>

              </div>`;
    }
  });
  forecastHTLM = forecastHTLM + `</div>`;
  forecastElement.innerHTML = forecastHTLM;
}

function getForecast(coordinates) {
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

let city = document.querySelector("#search-form");
city.addEventListener("click", search);

defaultCity("New York");

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

let day = document.querySelector("#todays-date");
day.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
