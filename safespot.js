
var MAP;
$(document).ready(function() {

//alert("abc");
 initMap();

        /* $('#fetch').click( function(){ 
      initMap();}); */
         
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.607, lng: -122.644},
    zoom: 12
  });

  MAP = map;

  var marker = new google.maps.Marker({
    position: {lat: 47.607, lng: -122.644},
    map: map,
    title: 'Hello World!'
  });

}