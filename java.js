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
