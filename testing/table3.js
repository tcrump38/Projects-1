$(document).ready(function () {
    currentBrew = localStorage.getItem("brewery")
    console.log(currentBrew)
})

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
var beers;

database.ref('/beersBlueOwl').on("value", function (snapshot) {
    var results = snapshot.val()
    beers = results

    for (var i = 0; i < results.length; i++) {
        var showBeers = $("<tr>")

        var beerName = $("<td>").text(results[i].name)
        var beerNameDisplay = $("<td>").text(results[i].nameDisplay)
        var beerAbv = $("<td>").text(results[i].abv)
        var beerIbu = $("<td>").text(results[i].ibu)
        var beerStyleId = $("<td>").text(results[i].styleId)
        var beerStyleName = $("<td>").text(results[i].style.name + ' (' + results[i].style.shortName + ')')
        var styleIbu = "IBU: [" + results[i].style.ibuMin + ', ' + results[i].style.ibuMax + "], "
        var styleAbv = "ABV: [" + results[i].style.abvMin + ', ' + results[i].style.abvMax + "], "
        var styleSrm = "SRM: [" + results[i].style.srmMin + ', ' + results[i].style.srmMax + "]"

        var beerStyleInfo = $("<tr>").text(styleIbu + styleAbv + styleSrm)

        showBeers.append(beerName).append(beerNameDisplay).append(beerAbv).append(beerIbu).append(beerStyleId).append(beerStyleName)
        $("#beer-table-body").append(showBeers).append(beerStyleInfo)
    }
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});