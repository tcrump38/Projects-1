function initialize() {
  var coordn = { lat: 30.2603535, lng: -97.7145152 };
  map = new google.maps.Map(document.getElementById('map-breweries'), { center: coordn, zoom: 10 });


  youAreHereInfoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation. (User location)
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          youAreHereInfoWindow.setPosition(pos);
          youAreHereInfoWindow.setContent('You Are Here!');/////info little
          youAreHereInfoWindow.open(map);
          map.setCenter(pos);
          addAllMarkers()
      }, function () {
          handleLocationError(true, youAreHereInfoWindow, map.getCenter());
      });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, youAreHereInfoWindow, map.getCenter());
  }
}

jQuery(function ($) {
  // Asynchronously Load the map API 
  var script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq8qjNnAwkr_fPwdDQGd7CR_qYMMTWYjY&callback=initialize";
  document.body.appendChild(script);
});