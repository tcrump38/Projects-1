$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
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

database.ref('/breweriesAustin').on("value", function (snapshotBreweries) {
  breweriesATX = snapshotBreweries.val()
  for (var i = 0; i < breweriesATX.length; i++) {
    var showBrewery = $("<div>");
    var breweryname = breweriesATX[i].brewery.name;
    var p = $("<ul>").html(breweryname);
    showBrewery.append(p);
    $("#Brewery-info").append(showBrewery)
  };
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});