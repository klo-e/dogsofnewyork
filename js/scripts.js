$('.ball').click(function(){
  window.location.href='map.html';
  return false;
});

//sets up my mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hld3ljaGxvZSIsImEiOiJjajJiZ2g5YXQwMHYxMzJvODQxN245Z2RhIn0.ZJfu5XA9ij2_nBlZx2dcNg';
var map = new mapboxgl.Map({

container: 'mapContainer', //container: looking for ID with the name (mapContainer in this case), styles is the style of the map from mapbox
style: 'mapbox://styles/mapbox/light-v10',
center: [-74.061241,40.705368], //center tells the latlon, zoom dictates the zoom level of the map
zoom: 9.5,
});

var zoomThreshold = 4;
  // Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// we can't add our own sources and layers until the base style is finished loading
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

 // you can use map.getStyle() in the console to inspect the basemap layers
map.setPaintProperty('water', 'fill-color', '#a9e4f9')
  });

$('#modal').modal('show');

// Initialize Bootstrap popovers
$(function() {
  $('.icon-popover').popover({
    container: 'body',
    html: true
  });
});

//starting page alert
$('.alert').alert()

// Close popover on clicking elsewhere
$(document).on('click', function(e) {
  $('[data-toggle="popover"],[data-original-title]').each(function() {
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false // fix for BS 3.3.6
    }
  });
});
