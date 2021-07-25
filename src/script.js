function changeCurrentTimezoneOffset(openWeatherResponse) {
  currentTimeZoneOffset = `${openWeatherResponse}`;
  return currentTimeZoneOffset;
}

function changeCurrentTimezone(openWeatherResponse) {
  currentTimeZone = `${openWeatherResponse}`;
  return currentTimeZone;
}

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

function defineTimeOfTheDay(hours) {
  if (hours >= 5 && hours <= 19) {
    timeOfTheDay = "day";
  } else if (hours > 19 && hours <= 21) {
    timeOfTheDay = "evening";
  } else {
    timeOfTheDay = "night";
  }
  console.log(timeOfTheDay);
  return timeOfTheDay;
}

function convertUnixTime(UNIX_timestamp) {
  let date = new Date(
    UNIX_timestamp * 1000 +
      (currentTimeZoneOffset - Math.abs(requesterTimeZoneOffset)) * 1000
  );
  let hh = date.getHours();
  let mm = date.getMinutes();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  var formatedTime = `${hh}:${mm}`;
  return formatedTime;
}

function convertUnixDay(UNIX_timestamp) {
  let date = new Date(
    UNIX_timestamp * 1000 +
      (currentTimeZoneOffset - Math.abs(requesterTimeZoneOffset)) * 1000
  );
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getCardinalDirectionArrow(angle) {
  const directions = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
  // const directions = ["⇑","⇗","⇒","⇘","⇓","⇙","⇐","⇖"];
  return directions[Math.round(angle / 45) % 8];
}
function getCardinalDirectionName(angle) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(angle / 45) % 8];
}
function showCurrentDateAndTime(dateString) {
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

  let month = months[dateString.getMonth()];
  let date = dateString.getDate();
  let day = days[dateString.getDay()];
  let hours = dateString.getHours();
  let minutes = dateString.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  currentDateAndTime.innerHTML = `${month} ${date}, ${day}, ${time}`;
  defineTimeOfTheDay(hours);
}
function defineBackgroundTheme(shortDescription) {
  if (
    shortDescription === "clear" ||
    shortDescription === "clouds" ||
    shortDescription === "drizzle" ||
    shortDescription === "rain"
  ) {
    mainThemeSource.src = `media/themes/default/back-${timeOfTheDay}-clear.gif`;
  } else if (shortDescription === "shower rain") {
    mainThemeSource.src = `media/themes/default/back-rain-heavy.gif`;
  } else if (shortDescription === "thundersorm") {
    mainThemeSource.src = "media/themes/default/back-night-thunder.gif";
  } else if (shortDescription === "snow") {
    mainThemeSource.src = "media/themes/default/back-day-snow.gif";
  } else if (
    shortDescription === "mist" ||
    shortDescription === "smoke" ||
    shortDescription === "fog" ||
    shortDescription === "haze" ||
    shortDescription === "dust" ||
    shortDescription === "sand" ||
    shortDescription === "ash"
  ) {
    mainThemeSource.src = "media/themes/default/back-day-fog.jpg";
  } else if (shortDescription === "squall") {
    mainThemeSource.src = "media/themes/default/back-squall.gif";
  } else if (shortDescription === "tornado") {
    mainThemeSource.src = "media/themes/default/back-tornado.gif";
  } else {
  }
}
function defineExtraAnimation(cloudinessPercent, shortDescription, windSpeed) {
  if (cloudinessPercent > 5) {
    cloudsCarousel.style["visibility"] = "visible";
    setCloudsSpeedAndOpacity(windSpeed, cloudinessPercent);
  } else if (shortDescription === "drizzle") {
    frontLayerSource.src = "media/front-layers/rain4.gif";
    frontLayerSource.style["visibility"] = "visible";
  } else if (shortDescription === "rain") {
    frontLayerSource.src = "media/front-layers/rain5.gif";
    frontLayerSource.style["visibility"] = "visible";
  } else {
  }
}
function setCloudsSpeedAndOpacity(windSpeed, cloudinessPercent) {
  let carouselItem1 = document.getElementById("carousel-item1");
  let carouselItem2 = document.getElementById("carousel-item2");
  transitionDuration = 40 - windSpeed; //supposed that 40km/h is max for weather being just cloudy
  carouselItem1.style["transition"] = `transform ${transitionDuration}s linear`;
  carouselItem2.style["transition"] = `transform ${transitionDuration}s linear`;
  let carouselCloud1 = document.getElementById("carousel-cloud1");
  let carouselCloud2 = document.getElementById("carousel-cloud2");
  carouselCloud1.setAttribute("style", `opacity: ${cloudinessPercent * 1.5}%;`); //*1.5 since direct correlation is a bit too transparent
  carouselCloud2.setAttribute("style", `opacity: ${cloudinessPercent * 1.5}%;`);
}

// Clear Clouds Drizzle Rain Thunderstorm Snow
// Mist Smoke Haze Dust Fog Sand Ash Squall Tornado

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
        <div class="col-2">hPa</div>

        <div class="col-2">
          <i class="fas fa-tint"></i>
        </div>
        <div class="col-2" id="humidity"></div>
        <div class="col-2">%</div>

        <div class="col-2"><i class="fas fa-wind"></i></div>
        <div class="col-2" id="wind"></div>
        <div class="col-2">km/h</div>

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
  //console.log(forecastHoursFromArray);
  let forecastHourly = document.querySelector("#forecast-hourly");
  let forecastHourlyHTML = `<div class="scrolling-wrapper">`;

  forecastHoursFromArray.forEach(function (forecastHour) {
    forecastHourlyHTML =
      forecastHourlyHTML +
      `<div class="card hourly">
      <small>${convertUnixDay(forecastHour.dt)}</small>
            <p class="time">${convertUnixTime(forecastHour.dt)}</p>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastHour.weather[0].icon
              }@2x.png"
              class="image-weather-small"
            />
            <p class="temp">${Math.round(forecastHour.temp)}°</p>
          </div>`;
  });
  forecastHourlyHTML = forecastHourlyHTML + `</div>`;

  forecastHourly.innerHTML = forecastHourlyHTML;

  let horizontalDivider = document.getElementById("hr-image");
  horizontalDivider.src = "media/six-chibi-totoro.png";
}
function displayForecastWeek(response) {
  let forecastDaysFromArray = response.data.daily;
  let forecastWeek = document.querySelector("#forecast-week");
  let forecastWeekHTML = `    <h4>
      Weekly: <span class="clickables">Brief</span> |
      <span class="clickables">Detailed</span>
    </h4>
    <hr /><div class="scrolling-wrapper">`;

  forecastDaysFromArray.forEach(function (forecastDay) {
    forecastWeekHTML =
      forecastWeekHTML +
      `<div class="card weekly col-2">
          <p class="weekday">${convertUnixDay(forecastDay.dt)}</p>
          <img
            src="https://openweathermap.org/img/wn/${
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
  navigator.geolocation.getCurrentPosition(getCurrentPositionFromGPS);
}

function getCurrentPositionFromGPS(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  createApiRouteForOpenWeatherOneCall(lat, lng);
}

function createApiRouteForOpenWeatherOneCall(lat, lng) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${units}&exclude=minutely&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then((response) => {
    showCurrentDateAndTime(convertTZ(now, response.data.timezone));
    changeCurrentTimezone(response.data.timezone);
    changeCurrentTimezoneOffset(response.data.timezone_offset);
    displayCurrentWeather(response);
    displayCurrentWeather(response);
    displayForecastWeek(response);
    displayForecastHourly(response);
  });
}

function displayCurrentWeather(response) {
  currentTemperature.innerHTML = Math.round(response.data.current.temp);
  var placeholderUOM = document.getElementById("placeholderUOM"); // working without # near id. styles specifics vs js??
  placeholderUOM.style["visibility"] = "visible";
  let currentCity = document.querySelector("#current-city");
  let citySelected = document.querySelector("#city-input").value.split(",");
  currentCity.innerHTML = citySelected[0];
  let currentWeatherDescription = document.querySelector(
    "#current-description"
  );
  currentWeatherDescription.innerHTML =
    response.data.current.weather[0].description;

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

  var cloudinessPercent = response.data.current.clouds;
  var windSpeed = Math.round(response.data.current.wind_speed * 3.6);
  var windDirection = getCardinalDirectionArrow(response.data.current.wind_deg);
  var shortDescription = response.data.current.weather[0].main.toLowerCase();

  tempMax.innerHTML = Math.round(response.data.daily[0].temp.max);
  tempMin.innerHTML = Math.round(response.data.daily[0].temp.min);
  feelsLike.innerHTML = Math.round(response.data.current.feels_like);
  cloudiness.innerHTML = cloudinessPercent;
  pressure.innerHTML = response.data.current.pressure;
  humidity.innerHTML = response.data.current.humidity;
  wind.innerHTML = `${windSpeed} ${windDirection}`;
  sunrise.innerHTML = convertUnixTime(response.data.current.sunrise);
  sunset.innerHTML = convertUnixTime(response.data.current.sunset);

  defineBackgroundTheme(shortDescription);
  defineExtraAnimation(cloudinessPercent, shortDescription, windSpeed);
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
let now = new Date();
var requesterTimeZoneOffset = new Date().getTimezoneOffset() * 60;
console.log(requesterTimeZoneOffset);

let currentTimeZone = "";
let currentTimeZoneOffset = null;
let timeOfTheDay = "";
showCurrentDateAndTime(now);

let apiKey = "13e9496ba2a5643119025f905a5f6396";
// to-do: units responsive
let units = "metric";
let currentTemperature = document.querySelector("#current-temperature");

let buttonGps = document.querySelector("#button-location-gps");
buttonGps.addEventListener("click", enableGPS);
let inputFormCity = document.querySelector("#search-city-form");
//inputFormCity.addEventListener("submit", createApiRouteForOpenWeatherOneCall);

let fahrenheitUOM = document.querySelector("#fahrenheit");
let celsiusUOM = document.querySelector("#celsius");
fahrenheitUOM.addEventListener("click", changeUOM);

//document.getElementById("mainTheme").src = "media/footer.png";

let mainThemeSource = document.getElementById("mainTheme");
let frontLayerSource = document.getElementById("front-layer");

var uomTemp = document.querySelectorAll(".uom-temp");

let cloudsCarousel = document.getElementById("clouds-placeholder");

console.log(timeOfTheDay);
