function convertUnixTime(UNIX_timestamp) {
  let date = new Date(UNIX_timestamp * 1000);
  let hh = date.getHours();
  let mm = date.getMinutes();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  var formatedTime = `${hh}:${mm}`;
  return formatedTime;
}

function convertUnixDay(UNIX_timestamp) {
  let date = new Date(UNIX_timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

/* to-do: merge current and convertions

function convertUnixDay(UNIX_timestamp) {
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
  let date = new Date(UNIX_timestamp * 1000);
  let month = months[date.getMonth()];
  let date = date.getDate();
  let day = days[date.getDay()];
  let formatedDay = `${day}, ${month} ${date}`;
  return formatedDay[day];
} */

function getCardinalDirectionArrow(angle) {
  const directions = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
  // const directions = ["⇑","⇗","⇒","⇘","⇓","⇙","⇐","⇖"];
  return directions[Math.round(angle / 45) % 8];
}
function getCardinalDirectionName(angle) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(angle / 45) % 8];
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
function defineGraphicElements(shortDescription) {
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
function displayCurrentWeatherIndicesPlaceholder() {
  let currentWeatherIndices = document.querySelector(
    "#current-weather-indices"
  );
  currentWeatherIndices.innerHTML = `      <div class="row g-0">
        <div class="col-2">
          <i class="fas fa-temperature-high"></i
          ><i class="fas fa-temperature-low"></i>
        </div>
        <div class="col-2">
          <span class="t" id="temp-max"></span> /
          <span class="t" id="temp-min"></span>
        </div>
        <div class="col-2 uom-temp">°С</div>

        <div class="col-2"><i class="fas fa-cloud"></i></div>
        <div class="col-2" id="cloudiness"></div>
        <div class="col-2">%</div>

        <div class="col-2"><i class="fas fa-tshirt"></i></div>
        <div class="col-2 t" id="feels-like">25</div>
        <div class="col-2 uom-temp">°С</div>

        <div class="col-2"><i class="fas fa-tachometer-alt"></i></div>
        <div class="col-2" id="pressure"></div>
        <div class="col-2">mbar</div>

        <div class="col-2">
          <i class="fas fa-tint"></i>
        </div>
        <div class="col-2" id="humidity"></div>
        <div class="col-2">%</div>

        <div class="col-2"><i class="fas fa-wind"></i></div>
        <div class="col-2" id="wind"></div>
        <div class="col-2">m/s</div>

        <div class="col-2">
          <i class="fas fa-sun"></i><i class="fas fa-angle-double-up"></i>
        </div>
        <div class="col-4" id="sunrise"></div>
        <div class="col-2">
          <i class="fas fa-sun"></i><i class="fas fa-angle-double-down"></i>
        </div>
        <div class="col-4" id="sunset"></div>
      </div>`;
}
function displayForecastHourly(response) {
  let forecastHoursFromArray = response.data.hourly;
  console.log(forecastHoursFromArray);
  let forecastHourly = document.querySelector("#forecast-hourly");
  let forecastHourlyHTML = `<div class="scrolling-wrapper">`;

  forecastHoursFromArray.forEach(function (forecastHour) {
    forecastHourlyHTML =
      forecastHourlyHTML +
      `<div class="card hourly">
      <small>${convertUnixDay(forecastHour.dt)}</small>
            <p class="time">${convertUnixTime(forecastHour.dt)}</p>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastHour.weather[0].icon
              }@2x.png"
              class="image-weather-small"
            />
            <p class="temp">${Math.round(forecastHour.temp)}°</p>
          </div>`;
  });
  forecastHourlyHTML = forecastHourlyHTML + `</div>`;

  forecastHourly.innerHTML = forecastHourlyHTML;
}

function displayForecastWeek(response) {
  let forecastDaysFromArray = response.data.daily;
  let forecastWeek = document.querySelector("#forecast-week");
  let forecastWeekHTML = `<div class="scrolling-wrapper">`;

  forecastDaysFromArray.forEach(function (forecastDay) {
    forecastWeekHTML =
      forecastWeekHTML +
      `<div class="card weekly col-2">
          <p class="weekday">${convertUnixDay(forecastDay.dt)}</p>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            class="image-weather-small"
          />
           <p class="temp max">${Math.round(forecastDay.temp.max)}°</p>
          <small class="temp min">${Math.round(forecastDay.temp.min)}°</small>
         
        </div>`;
  });
  forecastWeekHTML = forecastWeekHTML + `</div>`;

  forecastWeek.innerHTML = forecastWeekHTML;
}

function enableGPS() {
  document.querySelector("#city-input").value = "";
  navigator.geolocation.getCurrentPosition(createApiRouteByGPS);
}
function createApiRouteByGPS(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function createApiRouteByCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function createApiRouteForOneCall(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&exclude=minutely&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecastWeek);
  axios.get(apiUrl).then(displayForecastHourly);
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

  displayCurrentWeatherIndicesPlaceholder();

  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let feelsLike = document.querySelector("#feels-like");
  let cloudiness = document.querySelector("#cloudiness");
  let pressure = document.querySelector("#pressure");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  cloudiness.innerHTML = response.data.clouds.all;
  pressure.innerHTML = response.data.main.pressure;
  humidity.innerHTML = response.data.main.humidity;
  var windSpeed = response.data.wind.speed;
  var windDirection = getCardinalDirectionArrow(response.data.wind.deg);
  wind.innerHTML = `${windSpeed} ${windDirection}`;
  sunrise.innerHTML = convertUnixTime(response.data.sys.sunrise);
  sunset.innerHTML = convertUnixTime(response.data.sys.sunset);

  createApiRouteForOneCall(response.data.coord); // and displayForecastWeek from it
  defineGraphicElements(response.data.weather[0].main.toLowerCase()); // set background and front layer
}

function changeUOM(event) {
  event.preventDefault();
  let currentTempResponse = document.getElementById(
    "current-temperature"
  ).textContent;
  if (currentTempResponse === "") {
    // may delete zero length confition in future, since placeholder is hidden now
  } else {
    currentTempResponse = parseInt(currentTempResponse);
    if (event.target.id === "fahrenheit") {
      currentTemperature.innerHTML = Math.round(currentTempResponse * 1.8 + 32);
      fahrenheitUOM.removeEventListener("click", changeUOM);
      celsiusUOM.addEventListener("click", changeUOM);

      for (var i = 0; i < uomTemp.length; i++) {
        uomTemp[i].innerHTML = "°F";
      }

      // no mistake in console, and not working
      var items = document.getElementsByClassName(".t");
      for (var item of items) {
        const t = item.innerHTML;
        item.innerHTML = Math.round(t * 1.8 + 32);
      }

      /* should get an array of values for class ".t" elements 
      var t = document.querySelector(".t").textContent;
      console.log(t);
      var x = document.getElementsByClassName(".t").textContent;
      console.log(x);
      for (var i = 0; i < 10; i++) {
        t[i].innerHTML = Math.round(t * 1.8 + 32);
      }
      */
    } else {
      currentTemperature.innerHTML = Math.round(
        (currentTempResponse - 32) / 1.8
      );
      celsiusUOM.removeEventListener("click", changeUOM);
      fahrenheitUOM.addEventListener("click", changeUOM);
      for (var i = 0; i < uomTemp.length; i++) {
        uomTemp[i].innerHTML = "°C";
      }
    }
  }
}

let currentDateAndTime = document.querySelector("#date-and-time");
showCurrentDateAndTime(currentDateAndTime);

let apiKey = "13e9496ba2a5643119025f905a5f6396";
// to-do: units responsive
let units = "metric";
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
var uomTemp = document.querySelectorAll(".uom-temp");
