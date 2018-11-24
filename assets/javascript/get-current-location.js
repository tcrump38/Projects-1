window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      console.log(startPos)
      localStorage.setItem("startPosLat", startPos.coords.latitude)
      localStorage.setItem("startPosLng", startPos.coords.longitude)
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
};