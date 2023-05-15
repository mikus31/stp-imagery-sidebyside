var map = L.map('map', {
    dragging: false, // Disable map panning
    zoomControl: false, // Disable map zooming
    attributionControl: false
}).setView([30.221269815941618, -89.7614381551249], 15);
// Add your custom attribution with hyperlinks
var additionalAttribution = 'Powered by <a href="https://leafletjs.com/" target="_blank">Leaflet</a> | Map designed by <a href="https://rmichaelmcneil.com/" target="_blank">Michael McNeil</a>, 2023';
var attributionControl = L.control.attribution({
    prefix: additionalAttribution
});
attributionControl.addTo(map);
// set up map to remove grid lines from the raster imagery
(function () {
    var originalInitTile = L.GridLayer.prototype._initTile
    L.GridLayer.include({
        _initTile: function (tile) {
            originalInitTile.call(this, tile);
            var tileSize = this.getTileSize();
            tile.style.width = tileSize.x + 1 + 'px';
            tile.style.height = tileSize.y + 1 + 'px';
        }
    });
})()
var wms2019 = L.tileLayer.wms('https://imagery.geoportalmaps.com/lizardtech/iserv/ows', {
    layers: 'StTammany2019'
    , format: 'image/jpeg'
    , transparent: true
    , tileSize: 1024
});
wms2019.addTo(map);
var wms2023 = L.tileLayer.wms('https://imagery.geoportalmaps.com/lizardtech/iserv/ows', {
    layers: 'StTammany2023'
    , format: 'image/jpeg'
    , transparent: true
    , tileSize: 1024
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
panUpButton.innerHTML = '<i class="material-icons">arrow_upward</i>';
panUpButton.title = 'Pan Up';
panUpButton.className = 'pan-button'; // Add a class for styling
panUpButton.addEventListener('click', function () {
    map.panBy([0, -200]); // Pan the map up by 100 pixels
});
var panDownButton = document.createElement('button');
panDownButton.innerHTML = '<i class="material-icons">arrow_downward</i>';
panDownButton.title = 'Pan Down';
panDownButton.className = 'pan-button'; // Add a class for styling
panDownButton.addEventListener('click', function () {
    map.panBy([0, 200]); // Pan the map down by 100 pixels
});
var panLeftButton = document.createElement('button');
panLeftButton.innerHTML = '<i class="material-icons">arrow_back</i>';
panLeftButton.title = 'Pan Left';
panLeftButton.className = 'pan-button'; // Add a class for styling
panLeftButton.addEventListener('click', function () {
    map.panBy([-200, 0]); // Pan the map left by 100 pixels
});
var panRightButton = document.createElement('button');
panRightButton.innerHTML = '<i class="material-icons">arrow_forward</i>';
panRightButton.title = 'Pan Right';
panRightButton.className = 'pan-button'; // Add a class for styling
panRightButton.addEventListener('click', function () {
    map.panBy([200, 0]); // Pan the map right by 100 pixels
});
// Append the pan buttons to the map container
panButtons.appendChild(panUpButton);
panButtons.appendChild(panDownButton);
panButtons.appendChild(panLeftButton);
panButtons.appendChild(panRightButton);
document.getElementById('map').appendChild(panButtons);