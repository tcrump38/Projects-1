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
            var beerLink = $("<a>").attr('id', results[i].breweryID).text(results[i].name).attr('href', 'table2.html')
            beerLink.addClass("btn yellow accent-4 black-text waves-effect waves-orange")
            var collHeader = $("<div>").addClass("collapsible-header")
            var collHeaderIcon = $("<i>").addClass("material-icons").html('place')
            collHeader.prepend(collHeaderIcon).append(beerLink)



            var collBody = $("<div>").addClass("collapsible-body")






            // get hours in collapsible

            if (results[i].hours.length > 1) {


                var collHours = $("<ul>").addClass("collapsible")
                var collHoursHeader = $("<div>").addClass("collapsible-header").html("HOURS")

                var collHoursBody = $("<div>").addClass("collapsible-body")
                var hoursList = $("<ul>").addClass("collection")
                for (j = 0; j < results[i].hours.length; j++) {
                    var collDay = $("<li>").addClass("collection-item").text(results[i].hours[j])
                    hoursList.append(collDay)
                }
                collHoursBody.append(hoursList)

                var hoursListItem = $("<li>").append(collHoursHeader).append(collHoursBody)

                collHours.append(hoursListItem)

            }
            else {

                var collHours = $("<div>").text("Hours: " + results[i].hours)

            }

            collHours.collapsible();

            collBody.append(collHours)



            var listItem = $("<li>").append(collHeader).append(collBody)

            $("#breweries-coll").append(listItem)


        }
    }
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});