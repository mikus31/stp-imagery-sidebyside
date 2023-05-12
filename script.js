var map = L.map('map', {
    dragging: false, // Disable map panning
    zoomControl: false // Disable map zooming
}).setView([30.221269815941618, -89.7614381551249], 14);
var wms2019 = L.tileLayer.wms('https://services.geoportalmaps.com/ImageryProxy/api/Proxy/GCT/0/StTammany2019', {
    layers: 'StTammany2019'
    , format: 'image/png'
    , transparent: true
});
wms2019.addTo(map);
var wms2023 = L.tileLayer.wms('https://services.geoportalmaps.com/ImageryProxy/api/Proxy/GCT/0/StTammany2023', {
    layers: 'StTammany2023'
    , format: 'image/png'
    , transparent: true
});
wms2023.addTo(map);
var sideBySide = L.control.sideBySide(wms2019, wms2023, {
    position: 'topright'
});
sideBySide.addTo(map);
// Add search control using OpenCage Geocoder
var geocoder = L.Control.geocoder({
    position: 'topleft'
    , placeholder: 'Search for an address...'
    , defaultMarkGeocode: false
    , geocoder: L.Control.Geocoder.mapbox({
        apiKey: 'pk.eyJ1IjoibWlrdXMzMSIsImEiOiJjbGhqOThybGswZmpmM3Jxa2gyMXF2ajNuIn0.utJJYELL90COk70CA_YQPg' // Replace with your own Mapbox API key
    })
}).on('markgeocode', function (e) {
    var latlng = e.geocode.center;
    map.setView(latlng, 18);
});
geocoder.addTo(map);
// Create the pan buttons
var panButtons = document.createElement('div');
panButtons.className = 'pan-buttons';
// Create the pan button elements
var panUpButton = document.createElement('button');
panUpButton.innerHTML = '↑';
panUpButton.addEventListener('click', function () {
    map.panBy([0, -100]); // Pan the map up by 100 pixels
});
var panDownButton = document.createElement('button');
panDownButton.innerHTML = '↓';
panDownButton.addEventListener('click', function () {
    map.panBy([0, 100]); // Pan the map down by 100 pixels
});
var panLeftButton = document.createElement('button');
panLeftButton.innerHTML = '←';
panLeftButton.addEventListener('click', function () {
    map.panBy([-100, 0]); // Pan the map left by 100 pixels
});
var panRightButton = document.createElement('button');
panRightButton.innerHTML = '→';
panRightButton.addEventListener('click', function () {
    map.panBy([100, 0]); // Pan the map right by 100 pixels
});
// Append the pan buttons to the map container
panButtons.appendChild(panUpButton);
panButtons.appendChild(panDownButton);
panButtons.appendChild(panLeftButton);
panButtons.appendChild(panRightButton);
document.getElementById('map').appendChild(panButtons);