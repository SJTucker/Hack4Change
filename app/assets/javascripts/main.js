(function(){

  'use strict';

  $(document).ready(initialize);

  var map;
  //var markers = [];

  function initialize(){
    initMap(36.1667, -86.7833, 12);
    getArt();
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function getArt(){
    var url = "http://data.nashville.gov/resource/dqkw-tj5j.json";
    $.getJSON(url, pinData);
  }

  function pinData(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
      var title = data[i].title;
      var lat = data[i].latitude;
      var lng = data[i].longitude;
      addMarker(lat, lng, title);
    }
  }

  function addMarker(lat, lng, title){
    var position = new google.maps.LatLng(lat, lng, title);
    var marker = new google.maps.Marker({map:map, position:position, title:title});
    //markers.push(marker);
  }

})();
