var map = L.map('map').setView([30.4167, -89.9253], 11);
var southwest = L.latLng(30.1719, -90.2421);
var northeast = L.latLng(30.6606, -89.3819);
var bounds = L.latLngBounds(southwest, northeast);
map.fitBounds(bounds);
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