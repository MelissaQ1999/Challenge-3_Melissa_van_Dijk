// The code for the map

// Set api token
L.mapbox.accessToken = 'pk.eyJ1IjoibWVsaXNzYXEiLCJhIjoiY2ttbHB6b3BnMDA2NDJvcGVsbnlyMGNmOSJ9.Kib5gg5YPA7nRKL9wbPmMg';
var geocoder = L.mapbox.geocoder('mapbox.places'),
    map = null;

// Initialate map
var map = L.mapbox.map('map', null, { zoomControl: false })
    .setView([51.9828, 4.6726], 4)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/melissaq/ckn4jfews1tok17ml7eq3gd48'));

// Edited the zoom controls of the map.
new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

function showMap(err, data) {
    // The geocoder can return an area, like a city, or a
    // point, like an address. Here we handle both cases,
    // by fitting the map bounds to an area or zooming to a point.
    if (!map) {
        map = L.mapbox.map('map');
    }

    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 12);
    }
}

// This code makes the search box work
function geodataHere() {
    var text = document.getElementById('search-box').value;
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}


// The code for the weather

// api token for openWeatherMap
var api = {
    key: "97d71a8ea05a63ed71c511f91127afab",
    base: "https://api.openweathermap.org/data/2.5/"
}

// With this code the search box works
var searchbox = document.getElementById('search-box');
searchbox.addEventListener('keypress', getData);


function getData(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// This function ensures that the entered location in the search box adjusts the location and the weather
function getResults (data) {
    fetch(`${api.base}weather?q=${data}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
}

// This function shows the results on the right place
function displayResults (weather) {
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.getElementById('weather');
    weather_el.innerText = weather.weather[0].main;
}