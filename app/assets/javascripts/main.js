(function(){

  'use strict';

  $(document).ready(initialize);

  var map;

  function initialize(){
    initMap(36.1667, -86.7833, 12);
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  //function addMarker(location){
  //  var position = new google.maps.LatLng(location.lat, location.lng);
  //  var marker = new google.maps.Marker({map:map, position:position, title:location.address});
  //  markers.push(marker);
  //}

})();
