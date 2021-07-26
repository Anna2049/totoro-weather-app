function resetSettings() {
  window.localStorage.clear();
}

var themePreferred = document.getElementById("theme-preferred");
var unitsPreferred = document.getElementById("units-preferred");
var favouriteCities = document.getElementById("previousSearchOptions");

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

themePreferred.onchange = saveSettings;
unitsPreferred.onchange = saveSettings;

function applySettings() {}

console.log(window.localStorage.getItem("theme"));
console.log(window.localStorage.getItem("units"));
