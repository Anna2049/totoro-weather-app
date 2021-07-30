// converters

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
function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}
function changeCurrentTimezone(openWeatherResponse) {
  currentTimeZone = `${openWeatherResponse}`;
  return currentTimeZone;
}
function changeCurrentTimezoneOffset(openWeatherResponse) {
  currentTimeZoneOffset = `${openWeatherResponse}`;
  return currentTimeZoneOffset;
}
function defineTimeOfTheDay(hours) {
  if (hours >= 5 && hours <= 19) {
    timeOfTheDay = "day";
  } else if (hours > 19 && hours <= 21) {
    timeOfTheDay = "evening";
  } else {
    timeOfTheDay = "night";
  }
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
    } else {
      currentTemperature.innerHTML = Math.round(
        (currentTempResponse - 32) / 1.8
      );
      celsiusUOM.removeEventListener("click", changeUOM);
      fahrenheitUOM.addEventListener("click", changeUOM);
    }
  }
}
// f responsible for visuals

function showLoader() {
  document.getElementById("overlay").style.display = "block";
}
function hideLoader() {
  document.getElementById("overlay").style.display = "none";
}
function defineBackgroundTheme(shortDescription) {
  if (
    shortDescription === "clear" ||
    shortDescription === "clouds" ||
    shortDescription === "drizzle" ||
    shortDescription === "rain"
  ) {
    mainThemeSource.src = `media/themes/${themeFolder}/back-${timeOfTheDay}-clear.gif`;
  } else if (shortDescription === "shower rain") {
    mainThemeSource.src = `media/themes/${themeFolder}/back-rain-heavy.gif`;
  } else if (shortDescription === "thundersorm") {
    mainThemeSource.src = `media/themes/${themeFolder}/back-night-thunder.gif`;
  } else if (shortDescription === "snow") {
    mainThemeSource.src = `media/themes/${themeFolder}/back-day-snow.gif`;
  } else if (
    shortDescription === "mist" ||
    shortDescription === "smoke" ||
    shortDescription === "fog" ||
    shortDescription === "haze" ||
    shortDescription === "dust" ||
    shortDescription === "sand" ||
    shortDescription === "ash"
  ) {
    mainThemeSource.src = `media/themes/${themeFolder}/back-day-fog.jpg`;
  } else if (shortDescription === "squall") {
    mainThemeSource.src = `media/themes/${themeFolder}/back-squall.gif`;
  } else if (shortDescription === "tornado") {
    mainThemeSource.src = `media/themes/${themeFolder}/back-tornado.gif`;
  } else {
  }
}
function defineExtraAnimation(cloudinessPercent, shortDescription, windSpeed) {
  if (cloudinessPercent > 5) {
    cloudsCarousel.style["visibility"] = "visible";
    setCloudsSpeedAndOpacity(windSpeed, cloudinessPercent);
  } else {
    cloudsCarousel.style["visibility"] = "hidden";
  }

  if (shortDescription === "drizzle") {
    frontLayerSource.src = "media/front-layers/rain4.gif";
    frontLayerSource.style["visibility"] = "visible";
  } else if (shortDescription === "rain") {
    frontLayerSource.src = "media/front-layers/rain5.gif";
    frontLayerSource.style["visibility"] = "visible";
  } else {
    frontLayerSource.src = "";
    frontLayerSource.style["visibility"] = "hidden";
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
function defineBodyFont(elements) {
  if (timeOfTheDay === "night") {
    for (var i = 0; i < elementsWithDynamicFont.length; i++) {
      elementsWithDynamicFont[i].setAttribute(
        `style`,
        `
        text-shadow: 2px 1px 4px black;
        color: white;`
      );
    }
  } else {
    for (var i = 0; i < elementsWithDynamicFont.length; i++) {
      elementsWithDynamicFont[i].setAttribute(
        `style`,
        `
        text-shadow: 2px 1px 4px white;
        color: black;`
      ); // background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
// f responsible for weather results

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
function displayCurrentWeather(response) {
  let currentTemperature = document.getElementById("current-temperature");
  let currentWeatherDescription = document.getElementById(
    "current-description"
  );
  currentTemperature.innerHTML = Math.round(response.data.current.temp);
  currentWeatherDescription.innerHTML =
    response.data.current.weather[0].description;

  placeholderUOM.style["visibility"] = "visible";
  let cloudiness = document.getElementById("cloudiness");
  let feelsLike = document.getElementById("feels-like");
  let humidity = document.getElementById("humidity");
  let pressure = document.getElementById("pressure");
  let sunrise = document.getElementById("sunrise");
  let sunset = document.getElementById("sunset");
  let tempMax = document.getElementById("temp-max");
  let tempMin = document.getElementById("temp-min");
  let wind = document.getElementById("wind");
  let windSpeed = Math.round(response.data.current.wind_speed * 3.6);
  let windDirection = getCardinalDirectionArrow(response.data.current.wind_deg);

  cloudiness.innerHTML = response.data.current.clouds;
  feelsLike.innerHTML = Math.round(response.data.current.feels_like);
  humidity.innerHTML = response.data.current.humidity;
  pressure.innerHTML = response.data.current.pressure;
  sunrise.innerHTML = convertUnixTime(response.data.current.sunrise);
  sunset.innerHTML = convertUnixTime(response.data.current.sunset);
  tempMax.innerHTML = Math.round(response.data.daily[0].temp.max);
  tempMin.innerHTML = Math.round(response.data.daily[0].temp.min);
  wind.innerHTML = `${windSpeed} ${windDirection}`;
}
function displayForecastHourly(response) {
  let forecastHoursFromArray = response.data.hourly;
  forecastHoursFromArray.shift();
  //console.log(forecastHoursFromArray);
  let forecastHourly = document.querySelector("#forecast-hourly");
  let forecastHourlyHTML = `<h4> Hourly: 48 hours </h4>
    <hr /><div class="scrolling-wrapper">`;

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
  forecastDaysFromArray.shift();
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
// GPS-related

function enableGPS() {
  address.value = "";
  navigator.geolocation.getCurrentPosition(getCurrentPositionFromGPS);
}
function getCurrentPositionFromGPS(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  saveGps(lat, lng);
  createApiRouteForOpenWeatherCurrent(lat, lng);
  createApiRouteForOpenWeatherOneCall(lat, lng);
}
function geocodeAddress(geocoder) {
  showLoader();
  geocoder.geocode({ address: address.value }).then(({ results }) => {
    createApiRouteForOpenWeatherOneCall(
      results[0].geometry.location.lat(),
      results[0].geometry.location.lng()
    );
  });
}

// OpenWeather API calls, f OneCall is the "command center"

function createApiRouteForOpenWeatherCurrent(lat, lng) {
  let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKeyOW}`;
  console.log(apiCurrentUrl);
  axios.get(apiCurrentUrl).then((response) => {
    currentCity.innerHTML = response.data.name;
    saveCityFromGps(response.data.name);
  });
}
function createApiRouteForOpenWeatherOneCall(lat, lng) {
  let apiOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${units}&exclude=minutely&appid=${apiKeyOW}`;
  console.log(apiOneCallUrl);
  axios.get(apiOneCallUrl).then((response) => {
    showCurrentDateAndTime(convertTZ(now, response.data.timezone));
    changeCurrentTimezone(response.data.timezone);
    changeCurrentTimezoneOffset(response.data.timezone_offset);
    displayCurrentWeatherIndicesPlaceholder();
    displayCurrentWeather(response);
    displayCurrentWeather(response);
    displayForecastWeek(response);
    displayForecastHourly(response);
    defineBackgroundTheme(response.data.current.weather[0].main.toLowerCase());
    defineBodyFont(elementsWithDynamicFont);
    defineExtraAnimation(
      response.data.current.clouds,
      response.data.current.weather[0].main.toLowerCase(),
      Math.round(response.data.current.wind_speed * 3.6)
    );
  });
}

// declarations

const apiKeyOW = "13e9496ba2a5643119025f905a5f6396";

let now = new Date();
let currentDateAndTime = document.querySelector("#date-and-time");
var requesterTimeZoneOffset = new Date().getTimezoneOffset() * 60;
console.log(requesterTimeZoneOffset);
let currentTimeZone = "";
let currentTimeZoneOffset = null;

let timeOfTheDay = "";
let lat = "";
let lng = "";
let units = "";
let themeFolder = "";

let celsiusUOM = document.getElementById("celsius");
let fahrenheitUOM = document.getElementById("fahrenheit");
let uomTemp = document.querySelectorAll(".uom-temp");

const placeholderUOM = document.getElementById("placeholderUOM");
let mainThemeSource = document.getElementById("mainTheme");
let frontLayerSource = document.getElementById("front-layer");
let cloudsCarousel = document.getElementById("clouds-placeholder");
let elementsWithDynamicFont = document.getElementsByClassName("dynamic-font");

const address = document.getElementById("city-input");
let cityOptions = {
  types: ["(cities)"],
};
let autocomplete = new google.maps.places.Autocomplete(address, cityOptions);
const geocoder = new google.maps.Geocoder();
let currentCity = document.getElementById("current-city");

const buttonGps = document.getElementById("button-location-gps");
const buttonSearch = document.getElementById("submit");
buttonGps.addEventListener("click", enableGPS);
fahrenheitUOM.addEventListener("click", changeUOM);
buttonSearch.addEventListener("click", (event) => {
  event.preventDefault();
  geocodeAddress(geocoder);
  let citySelected = address.value.split(",");
  currentCity.innerHTML = citySelected[0];
});

//setTimeout(hideLoader, 3000);

//let inputFormCity = document.getElementById("search-city-form");
mainThemeSource.addEventListener("load", hideLoader);
