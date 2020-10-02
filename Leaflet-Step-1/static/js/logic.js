// // Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5})

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY}).addTo(myMap)

  function chooseColor(x) {
    switch (x) {
    case (x < 10):
      return "yellow";
    case (x < 30):
      return "green";
    case (x < 60):
      return "orange";
    case (x < 70):
      return "blue";
    case (x < 100):
      return "purple";
    default:
      return "red";
    }
  }

d3.json(queryUrl, function(response) {
    console.log(response);
    eq = response.features
    for (var i = 0; i < eq.length; i++) {
      var location = eq[i].geometry;
      var eqprop = eq[i].properties;

      
      L.circle([location.coordinates[1], location.coordinates[0]], {
        color: chooseColor(eqprop.mag),
        fillColor: chooseColor(eqprop.mag),
        fillOpacity: .75,
        radius: 10000
      }).bindPopup("<h2>" + eqprop.place +
      "</h2><hr><p>" + new Date(eqprop.time) + 
      "<br>Magnitude: " + eqprop.mag + 
      "<br>Depth: " + location.coordinates[2] + "</p>")
      .addTo(myMap);
      }})
 




