function applySettingsThemeFolder() {
  if (window.localStorage.getItem("theme").length > 0) {
    themeFolder = window.localStorage.getItem("theme");
  } else {
    themeFolder = "nature";
  }
  return themeFolder;
}
function applySettingsUnits() {
  if (window.localStorage.getItem("units").length > 0) {
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
function resetSettings() {
  window.localStorage.clear();
}
function saveSettings() {
  localStorage.setItem(
    "theme",
    document.getElementById("theme-preferred").value
  );
  localStorage.setItem(
    "units",
    document.getElementById("units-preferred").value
  );
  console.log(localStorage);
}
var themePreferred = document.getElementById("theme-preferred");
var unitsPreferred = document.getElementById("units-preferred");
var favouriteCities = document.getElementById("previousSearchOptions");

applySettingsThemeFolder();
applySettingsUnits();

makePreferencesSelected(themePreferred, themeFolder);
makePreferencesSelected(unitsPreferred, units);

themePreferred.onchange = saveSettings;
unitsPreferred.onchange = saveSettings;
