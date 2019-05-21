
mapboxgl.accessToken ='pk.eyJ1IjoiY2hld3ljaGxvZSIsImEiOiJjajJiZ2g5YXQwMHYxMzJvODQxN245Z2RhIn0.ZJfu5XA9ij2_nBlZx2dcNg';
var map = new mapboxgl.Map({

container: 'map', //container: looking for ID with the name (mapContainer in this case), styles is the style of the map from mapbox
style: 'mapbox://styles/mapbox/light-v10',
center: [-74.061241,40.705368], //center tells the latlon, zoom dictates the zoom level of the map
zoom: 9.5,
});

var zoomThreshold = 4;


map.on('style.load', function() {

   $.getJSON('data/cd.geojson', function(data) { //importing data from file to render it as a variable data
     data.features.forEach(function(feature){
       console.log(feature.properties.dogpop)

     })

     data.features.map(function(feature) {
          feature.properties.dogpop = parseInt(feature.properties.dogpop);
      });
// adding the community district boundaries in geojson downloaded from NYC Open data

       map.addSource('dog-population',{
         'type': 'geojson',
         'data': data,
       });

                  // adding a custom-styled layer for Dog population
       map.addLayer({
         id: 'dog-community-districts',
         type: 'fill',
         source: 'dog-population',
         paint: {
           'fill-opacity': 0.9,
           'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'dogpop'],
              0, '#f1eef6',
              500, '#dba7c0',
              800, '#f3e06e',
              1000, '#add68c',
              1500, '#2b8cbe'
           ],
         }
        });


});
    map.on('click', 'dog-community-districts', function (e) {
        var pop = parseInt(e.features[0].properties.New_York_City_Population_By_Community_Districts_1970_Population) + parseInt(e.features[0].properties.New_York_City_Population_By_Community_Districts_1980_Population) + parseInt(e.features[0].properties.New_York_City_Population_By_Community_Districts_1990_Population) + parseInt(e.features[0].properties.New_York_City_Population_By_Community_Districts_2000_Population);
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML('Community District : ' +e.features[0].properties.cd_name + '<br>Total Human Population : ' + pop)
.addTo(map);
});

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'dog-community-districts', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'dog-community-districts', function () {
map.getCanvas().style.cursor = '';
});
 // you can use map.getStyle() in the console to inspect the basemap layers
map.setPaintProperty('water', 'fill-color', '#a9e4f9')
  });

var stateLegendEl = document.getElementById('state-legend');
var countyLegendEl = document.getElementById('county-legend');
map.on('zoom', function() {
if (map.getZoom() > zoomThreshold) {
stateLegendEl.style.display = 'none';
countyLegendEl.style.display = 'block';
} else {
stateLegendEl.style.display = 'block';
countyLegendEl.style.display = 'none';
}
});
