var map = L.map('map', {
    dragging: false, // Disable map panning
    zoomControl: false // Disable map zooming
}).setView([30.221269815941618, -89.7614381551249], 15);
/*var southwest = L.latLng(30.1719, -90.2421);
var northeast = L.latLng(30.6606, -89.3819);
var bounds = L.latLngBounds(southwest, northeast);
map.fitBounds(bounds);*/
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
L.Control.geocoder({
    position: 'topleft'
    , placeholder: 'Search for an address...'
    , defaultMarkGeocode: false
    , geocoder: L.Control.Geocoder.mapbox({
        apiKey: 'pk.eyJ1IjoibWlrdXMzMSIsImEiOiJjbGhqOThybGswZmpmM3Jxa2gyMXF2ajNuIn0.utJJYELL90COk70CA_YQPg' // Replace with your own Mapbox API key
    })
}).on('markgeocode', function (e) {
    var latlng = e.geocode.center;
    map.setView(latlng, 30);
}).addTo(map);