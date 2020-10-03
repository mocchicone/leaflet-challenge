// Url to the Json data = US Earthquakes from the past week
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create Map Object
var myMap = L.map("map", {
  center: [38, -112],
  zoom: 6})

// Create streetmap layer  
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY}).addTo(myMap)


// Pull data from json.
d3.json(queryUrl, function(response) {
    eq = response.features
    for (var x = 0; x < eq.length; x++) {
      var location = eq[x].geometry;
      var eqprop = eq[x].properties;
      var magnitude = eq[x].properties.mag
      var depth = location.coordinates[2]

   //  function to set color based on depth   
      function setColor(d) {
        if (d<10){return "yellow";}
        else if (d<20){return "greenyellow";}
        else if (d<30){return "green";}
        else if (d<40){return "orange";}
        else {return "red";}
      }
     
     // created circle markers based on magnitude and depth, and attached popups 
      L.circle([location.coordinates[1], location.coordinates[0]], {
        color: "black",
        weight: .3,
        fillColor: setColor(depth),
        fillOpacity: .75,
        radius: (magnitude * 5000)
      
      }).bindPopup("<h2>" + eqprop.place +
      "</h2><hr><p>" + new Date(eqprop.time) + 
      "<br>Magnitude: " + magnitude + 
      "<br>Depth: " + depth + "</p>")
      .addTo(myMap)}})
 
      // create legend
     
      var legend = L.control({ position: "bottomright" });
      
      legend.onAdd = function() {
          var div = L.DomUtil.create("div", "info legend"); 
          limits = [-10, 10, 20, 30, 40];
          var colors = ["yellow", "greenyellow", "green", "orange", "red"];

          div.innerHTML += "<h3>Earthquake Depth</h3>"
  
          for (var x = 0; x < limits.length; x++) {
              div.innerHTML +=
                  '<i style="background:' + colors[x] + '"></i>' +
                  limits[x] + (limits[x + 1] ? '&ndash;' + limits[x + 1] + ' km<br>' : '+ km');
          }
          return div;
      };
    
      // Adding legend to the map
      legend.addTo(myMap);
    
