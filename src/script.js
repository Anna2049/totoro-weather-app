function convertUnixTime(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var hh = a.getHours();
  var mm = a.getMinutes();
  var formatedTime = `${hh}:${mm}`;
  return formatedTime;
}
function showCurrentDateAndTime() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let now = new Date();
  let month = months[now.getMonth()];
  let date = now.getDate();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  currentDateAndTime.innerHTML = `${month} ${date}, ${day}, ${time}`;
}

function enableGPS() {
  document.querySelector("#city-input").value = "";
  navigator.geolocation.getCurrentPosition(createApiRouteByGPS);
}

function createApiRouteByGPS(position) {
  // to-do: units responsive
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function createApiRouteByCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  //celsiusUOM.innerHTML = "°С";
  //fahrenheitUOM.innerHTML = "°F";

  //for (let e of document.getElementsByTagName("h1")) {e.style.visibility = "visible";}

  var placeholderUOM = document.getElementById("placeholderUOM"); // working without # near id. styles specifics vs js??
  placeholderUOM.style["visibility"] = "visible";
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name} (${response.data.sys.country})`;
  let currentWeatherDescription = document.querySelector(
    "#current-description"
  );
  currentWeatherDescription.innerHTML = response.data.weather[0].description;

  // fetch extra results for current weather

  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let feelsLike = document.querySelector("#feels-like");
  let cloudiness = document.querySelector("#cloudiness");
  let pressure = document.querySelector("#pressure");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let visibility = document.querySelector("#visibility");

  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  cloudiness.innerHTML = response.data.clouds.all;
  pressure.innerHTML = response.data.main.pressure;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  sunrise.innerHTML = convertUnixTime(response.data.sys.sunrise);
  sunset.innerHTML = convertUnixTime(response.data.sys.sunset);
  visibility.innerHTML = Math.round(response.data.visibility / 100);

  // make elements visible

  var currentIndicesPlaceholder = document.getElementById(
    "current-weather-indices"
  );
  currentIndicesPlaceholder.style["visibility"] = "visible";

  // set background and front layer

  var shortDescription = response.data.weather[0].main.toLowerCase();
  console.log(shortDescription);

  if (
    shortDescription === "clear" ||
    shortDescription === "clouds" ||
    shortDescription === "scattered clouds"
  ) {
    mainThemeSource.src = "media/themes/default/back-daytime-sunny.gif";
  } else if (
    shortDescription === "rain" ||
    shortDescription === "shower rain"
  ) {
    mainThemeSource.src = "media/themes/default/back-rain-heavy.gif";
  } else if (shortDescription === "thundersorm") {
    mainThemeSource.src = "media/themes/default/back-night-thunder.gif";
  } else if (shortDescription === "snow") {
    mainThemeSource.src = "media/themes/default/back-daytime-snow-light.gif";
  } else if (shortDescription === "mist") {
    mainThemeSource.src = "media/themes/default/back-daytime-fog.gif";
  } else {
  }
}

function changeUOM(event) {
  event.preventDefault();
  let currentTempResponse = document.getElementById(
    "current-temperature"
  ).textContent;
  if (currentTempResponse === "") {
  } else {
    currentTempResponse = parseInt(currentTempResponse);
    if (event.target.id === "fahrenheit") {
      currentTemperature.innerHTML = Math.round(currentTempResponse * 1.8 + 32);
      fahrenheitUOM.removeEventListener("click", changeUOM);
      celsiusUOM.addEventListener("click", changeUOM);
    } else {
      currentTemperature.innerHTML = Math.round(
        (currentTempResponse - 32) / 1.8
      );
      celsiusUOM.removeEventListener("click", changeUOM);
      fahrenheitUOM.addEventListener("click", changeUOM);
    }
  }
}

let currentDateAndTime = document.querySelector("#date-and-time");
showCurrentDateAndTime(currentDateAndTime);

let apiKey = "13e9496ba2a5643119025f905a5f6396";
let currentTemperature = document.querySelector("#current-temperature");

let buttonGps = document.querySelector("#button-location-gps");
buttonGps.addEventListener("click", enableGPS);
let inputFormCity = document.querySelector("#search-city-form");
inputFormCity.addEventListener("submit", createApiRouteByCityName);

let fahrenheitUOM = document.querySelector("#fahrenheit");
let celsiusUOM = document.querySelector("#celsius");
fahrenheitUOM.addEventListener("click", changeUOM);

//document.getElementById("mainTheme").src = "media/footer.png";

let mainThemeSource = document.getElementById("mainTheme");
