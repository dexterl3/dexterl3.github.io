

$(document).ready(function() {
  
alert("abc");
        $('#fetch').click( function(){ 
          alert("abc2");
         // initMap();
          alert("abc3");
        }); 
         
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.607, lng: -122.644},
    zoom: 8
  });

alert(document.getElementById('map');
 // MAP = map;
/*
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
*/
}