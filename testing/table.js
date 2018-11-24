var config = {
    apiKey: "AIzaSyCACl0dIADoUYtr0cU0l6WsUMGbcHhC3Vo",
    authDomain: "project1-388e6.firebaseapp.com",
    databaseURL: "https://project1-388e6.firebaseio.com",
    projectId: "project1-388e6",
    storageBucket: "project1-388e6.appspot.com",
    messagingSenderId: "62443097997"
};

localStorage.clear();

firebase.initializeApp(config);
var database = firebase.database();
var breweriesATX;
var currentBrew = ''

database.ref('/breweriesJSON').on("value", function (snapshot) {
    var results = snapshot.val()
    breweriesATX = results
    for (var i = 0; i < results.length; i++) {
        var showBeers = $("<tr>")
        if (typeof results[i] == "undefined") {
            console.log('skipped')
        }
        else {
            // var beerLink = $("<a>").attr('id', results[i].breweryID).text(results[i].name).attr('href', 'table2.html')
            // var beerName = $("<td>").append(beerLink)
            // beerLink.on("click", function (event) {
            //     localStorage.setItem("brewery",event.target.id)
            // })
            // var beerHours = $("<td>").text(results[i].hours)
            // var beerCount = $("<td>").text(results[i].amountOfBeers)
            // var beerTypes = $("<td>").text(results[i].typesOfBeer)
            // showBeers.append(beerName).append(beerHours).append(beerCount).append(beerTypes)
            // $("#brewery-table-body").append(showBeers)

            //second version
            var collHeader = $("<div>").addClass("collapsible-header").attr('id', results[i].breweryID).text(results[i].name).attr('href', 'table2.html')
            var colHeaderIcon = $("<i>").addClass("material-icons").html('place')
            collHeader.prepend(colHeaderIcon)
            var collBody = $("<div>").addClass("collapsible-body").text(results[i].hours)
            var listItem = $("<li>").append(collHeader).append(collBody)

            $("#breweries-coll").append(listItem)


        }
    }
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});