// The code for the map

// Set API token
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

// API token for openWeatherMap
var api = {
    key: "97d71a8ea05a63ed71c511f91127afab",
    base: "https://api.openweathermap.org/data/2.5/"
}

// With this code the search box works
var searchbox = document.getElementById('search-box');
searchbox.addEventListener('keypress', getData);


function getData (evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// This function ensures that the entered location in the search box adjusts the location and the weather
function getResults (info) {
    fetch(`${api.base}weather?q=${info}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
}

// This function shows the results on the right place
function displayResults (weather) {
    let city = document.getElementById('city');
    city.innerText = weather.name + ', ' + weather.sys.country;
  
    let temp = document.getElementById('temp');
    temp.innerHTML = Math.round(weather.main.temp) + '&#176' + 'C';

    let tempFeel = document.getElementById('tempFeel');
    tempFeel.innerHTML = '(Feels like ' + Math.round(weather.main.feels_like) + '&#176' + 'C)';
  
    let weather_w = document.getElementById('weather');
    weather_w.innerText = weather.weather[0].description;

    // The wind speed is converted from m/s to km/h (the default of openWeatherMap is m/s)
    let wind = document.getElementById('wind');
    wind.innerText = Math.round(weather.wind.speed * 3.6) + ' km/h';

    // The wind direction is converted from degrees to compass value (the default of openWeatherMap is degrees)
    let windDirection = document.getElementById('windDeg');
    let compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    windDirection.innerText = compassSector[(weather.wind.deg / 22.5).toFixed(0)];
}


// This code was a function I tried, but didn't succeed

// var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather'; //link
// var openWeatherMapUrlApiKey = '97d71a8ea05a63ed71c511f91127afab'; //key

// // This function ensures that the selected location on the map adjusts the weather data too
// map.on('click', function(e) {
//     //e.lngLat is the longitude, latitude geographical position of the event
//     var lng = e.lngLat.lon //longitude data
//     var lat = e.lngLat.lat //latitude data
  
//     //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
//     //Link for data of selected location based on latitude and longitude
//     var request = openWeatherMapUrl + '?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + openWeatherMapUrlApiKey;
    
//     //Get data from api and convert to json
//     fetch(request).then((response) => response.json()).then(data => { 
//         console.log(data)

//         var city = document.getElementById('city');
//         city.innerText = data.name + ', ' + data.sys.country;
  
//         var temp = document.getElementById('temp');
//         temp.innerHTML = Math.round(data.main.temp) + '&#176' + 'C';

//         var tempFeel = document.getElementById('tempFeel');
//         tempFeel.innerHTML = '(Feels like ' + Math.round(data.main.feels_like) + '&#176' + 'C)';
    
//         var weather_w = document.getElementById('weather');
//         weather_w.innerText = data.weather[0].description;

//         // The wind speed is converted from m/s to km/h (the default of openWeatherMap is m/s)
//         var wind = document.getElementById('wind');
//         wind.innerText = Math.round(data.wind.speed * 3.6) + ' km/h';

//         // The wind direction is converted from degrees to compass value (the default of openWeatherMap is degrees)
//         var windDirection = document.getElementById('windDeg');
//         var compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
//         windDirection.innerText = compassSector[(data.wind.deg / 22.5).toFixed(0)];

//     })
// });