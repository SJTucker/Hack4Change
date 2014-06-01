(function(){

  'use strict';

  $(document).ready(initialize);

  var map;
  var markers = [];
  var icon_number = 0;

  function initialize(){
    initMap(36.1667, -86.7833, 11);
    $('#pins').change(setPins);
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var kml = new google.maps.KmlLayer('https://data.nashville.gov/api/geospatial/m4q4-q7tc?method=export&format=KML', {preserveViewport: true});
    kml.setMap(map);
    displayLegend();
  }

  function removeCurrentPins(){
    for(var i=0; i<markers.length; i++){
      markers[i].setMap(null);
    }
    markers = [];
  }

  function setPins(){
    removeCurrentPins();
    var index = $('#pins').find(':selected').attr('data-id');
    var pinsetUrls = ['dqkw-tj5j.json', '3wb6-xy3j.json', '3h5w-q8b7.json', 'frq9-a5iv.json', 'vk65-u7my.json', 'eviu-nxp6.json', '4ugp-s85t.json', 'vfe9-k7vc.json', '74d7-b74t.json', 'y5ik-ut5s.json', '479w-kw2x.json'];
    var url = "http://data.nashville.gov/resource/" + pinsetUrls[index];
    icon_number = index;
    $.getJSON(url, pinData);
  }

  function pinData(data){
    for(var i=0; i<data.length; i++){
      var title = data[i].title;
      if(data[i].latitude){
        var lat = data[i].latitude;
        var lng = data[i].longitude;
      }else{
        var address = data[i].mapped_location;
        var lat = address.latitude;
        var lng = address.longitude;

      }
      addMarker(lat, lng, title);
    }
  }

  function addMarker(lat, lng, title){
    var position = new google.maps.LatLng(lat, lng, title);
    var marker = new google.maps.Marker({map:map, position:position, title:title, icon:'/assets/icons/icon'+icon_number+'.png'});
    markers.push(marker);
  }

  function displayLegend(){
    map.controls[google.maps.ControlPosition.BOTTOM].push(document.getElementById('legend'));
  }

})();
