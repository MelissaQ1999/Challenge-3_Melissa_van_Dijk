// The code for the map

// Set api token
L.mapbox.accessToken = 'pk.eyJ1IjoibWVsaXNzYXEiLCJhIjoiY2ttbHB6b3BnMDA2NDJvcGVsbnlyMGNmOSJ9.Kib5gg5YPA7nRKL9wbPmMg';
var geocoder = L.mapbox.geocoder('mapbox.places'),
    map = null;

// Initialate map
var map = L.mapbox.map('map', null, { zoomControl: false })
    .setView([51.9828, 4.6726], 3.7)
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

// This code makes the search box work.
function geodataHere() {
    var text = document.getElementById('search-box').value;
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}