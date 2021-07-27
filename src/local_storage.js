function applySettingsThemeFolder() {
  if (window.localStorage.theme != null) {
    themeFolder = window.localStorage.getItem("theme");
  } else {
    themeFolder = "nature";
  }
  return themeFolder;
}
function applySettingsUnits() {
  if (window.localStorage.units != null) {
    units = window.localStorage.getItem("units");
  } else {
    units = "metric";
  }
  return units;
}
function makePreferencesSelected(optionsList, preference) {
  var option = optionsList.options;
  for (var i = 0; i < optionsList.options.length; i++) {
    if (option[i].value == preference) {
      option[i].selected = true;
    }
  }
}
function applyLatestGpsLocation() {
  if (
    window.localStorage.latitude != null &&
    window.localStorage.longitude != null
  ) {
    lat = window.localStorage.getItem("latitude");
    lng = window.localStorage.getItem("longitude");
    currentCity.innerHTML = window.localStorage.getItem("gpsCity");
    savedGpsLocation.value = window.localStorage.getItem("gpsCity");
    createApiRouteForOpenWeatherOneCall(lat, lng);
  } else {
    lat = `52.248952`;
    lng = `21.012078`;
    currentCity.innerHTML = "Warsaw";
    createApiRouteForOpenWeatherOneCall(lat, lng);
  }
}
function clear() {
  window.localStorage.clear();
  console.log(localStorage);
}
function saveSettingsTheme() {
  localStorage.setItem(
    "theme",
    document.getElementById("theme-preferred").value
  );
  themeFolder = document.getElementById("theme-preferred").value;
  return themeFolder;
}
function saveSettingsUnits() {
  localStorage.setItem(
    "units",
    document.getElementById("units-preferred").value
  );
  units = document.getElementById("units-preferred").value;
  return units;
}
function saveGps(lat, lng) {
  localStorage.setItem("latitude", lat);
  localStorage.setItem("longitude", lng);
  console.log(localStorage);
}
function saveCityFromGps(latestGpsSearch) {
  localStorage.setItem("gpsCity", latestGpsSearch);
}

var themePreferred = document.getElementById("theme-preferred");
var unitsPreferred = document.getElementById("units-preferred");
var savedGpsLocation = document.getElementById("saved-location");

applySettingsThemeFolder();
applySettingsUnits();
applyLatestGpsLocation();

makePreferencesSelected(themePreferred, themeFolder);
makePreferencesSelected(unitsPreferred, units);

themePreferred.onchange = saveSettingsTheme;
unitsPreferred.onchange = saveSettingsUnits;
