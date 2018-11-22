// Changes DOM with Materialize
$(document).ready(function () {
   
  });
  
  var config = {
  
    apiKey: "AIzaSyCACl0dIADoUYtr0cU0l6WsUMGbcHhC3Vo",
    authDomain: "project1-388e6.firebaseapp.com",
    databaseURL: "https://project1-388e6.firebaseio.com",
    projectId: "project1-388e6",
    storageBucket: "project1-388e6.appspot.com",
    messagingSenderId: "62443097997"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var breweriesATX;

  
  // Firebase watcher + initial loader HINT: .on("value")
  database.ref('/breweriesJSON').on("value", function (snapshot) {
    var results = snapshot.val()
    breweriesATX = results
    for (var i = 0; i < results.length; i++) {
      var showBeers = $("<tr>")
      if (typeof results[i] == "undefined") {
        console.log('skipped')
      }
      else {
        var beerName = $("<td>").text(results[i].name)
        //   var beerLoc = $("<td>").text(results[i].location)
          var beerHours = $("<td>").text(results[i].hours)
          var beerCount = $("<td>").text(results[i].amountOfBeers)
          var beerTypes = $("<td>").text(results[i].typesOfBeer)
          showBeers.append(beerName).append(beerHours).append(beerCount).append(beerTypes)
          $("#table-body").append(showBeers)
      }

  }
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  
  