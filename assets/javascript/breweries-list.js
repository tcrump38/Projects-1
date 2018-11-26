// var config = {
//     apiKey: "AIzaSyCACl0dIADoUYtr0cU0l6WsUMGbcHhC3Vo",
//     authDomain: "project1-388e6.firebaseapp.com",
//     databaseURL: "https://project1-388e6.firebaseio.com",
//     projectId: "project1-388e6",
//     storageBucket: "project1-388e6.appspot.com",
//     messagingSenderId: "62443097997"
// };

// localStorage.clear();

// firebase.initializeApp(config);
// var database = firebase.database();
var breweriesATX;
var currentBrew = ''
var geoBrews = [] // used in other js file

database.ref('/breweriesJSON').on("value", function (snapshot) {
    var results = snapshot.val()
    breweriesATX = results
    for (var i = 0; i < results.length; i++) {
        var showBeers = $("<tr>")
        if (typeof results[i] == "undefined") {
            console.log('skipped')
        }
        else {

            
            // each result is entered into a list item  (created further down)
            // create collapsible header for list item
            var collHeader = $("<div>").addClass("collapsible-header")

            //// main btn for brewery - links to next page
            var beerLink = $("<a>").attr('id', results[i].breweryID).text(results[i].name).attr('href', 'brewery.html')
            beerLink.addClass("btn yellow accent-4 black-text waves-effect waves-orange")
            beerLink.on("click", function(event){
                localStorage.setItem("brewery", event.target.attributes.id.value)
            })

            // geoBrews[i] = {
            //     breweryID: results[i].breweryID,
            //     name: results[i].name,
            //     location: results[i].location
            // }
            var stringForIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue" + (i+1) + ".png"


            //// add icon for marker -- replace with markers for each location based on map
            var collHeaderIcon = $("<div>").html('<img src="'+ stringForIcon + '"></img>')


            
            //// add to indicate if locale is open or not -- will load from google; using placeholder for now
            if (i % 2 == 0) {
                var collOpenNow = $("<div>").addClass("open-close").html('<img src="../assets/icons/closed.svg"></img>')
            }
            else {
                var collOpenNow = $("<div>").addClass("open-close").html('<img src="../assets/icons/open.svg"></img>')
            }

            // append the icon, btn, and chip to header
            // collHeader.prepend(collHeaderIcon).append(beerLink).append(collOpenNow)
            collHeader.prepend(collOpenNow).append(collHeaderIcon).append(beerLink)


            // create collapsible body for list item
            var collBody = $("<div>").addClass("collapsible-body")

            //// create collapsible for hours if it has more than one entry (in case it just has one day or a note)
            if (results[i].hours.length > 1) {
                var collHours = $("<ul>").addClass("collapsible yellow lighten-3")
                var collHoursHeader = $("<div>").addClass("collapsible-header waves-effect waves-yellow").html("HOURS")
                var colHeaderIcon = $("<i>").addClass("material-icons").html('expand_more')
                collHoursHeader.prepend(colHeaderIcon)
                var collHoursBody = $("<div>").addClass("collapsible-body")
                var hoursList = $("<ul>").addClass("collection")
                for (j = 0; j < results[i].hours.length; j++) {
                    var collDay = $("<li>").addClass("collection-item").text(results[i].hours[j])
                    hoursList.append(collDay)
                }
                collHoursBody.append(hoursList)
                var hoursListItem = $("<li>").append(collHoursHeader).append(collHoursBody)
                collHours.append(hoursListItem)
                collHours.collapsible();
            }
            else {
                var collHours = $("<div>").text("Hours: " + results[i].hours)
            }

            // if amount of beers is returned, populate inside a chip -- may have to recheck that this error catching is needed after we fix data
            if (typeof results[i].amountOfBeers != "undefined") {
                var allBeers = $("<div>").addClass("chip").html(results[i].amountOfBeers + '<img src="../assets/icons/pint.svg"></img>')
                collBody.append(allBeers)
            }

            // if styleIds is returned, populate inside a chip -- may have to recheck error catching
            if (typeof results[i].styleId != "undefined") {
                var stylesBeers = $("<div>").addClass("chip").html(results[i].styleId.length + '<img src="../assets/icons/beerTypes.svg"></img>')
                collBody.append(stylesBeers)
            }

            // add address if present (populate off google api) -- using placeholder for now
            var addy = $("<div>").addClass("col s12 m6 addy")
            var addyInfo = $("<p>").html("<em>Address:<em> 12345 Pauls Valley Rd #2, Austin, TX 78737").addClass("address-info")
            addy.append(addyInfo)

            // append hours and address to collapsible body
            collBody.append(collHours).append(addy)


            // create list item, and append header and body
            var listItem = $("<li>").append(collHeader).append(collBody)

            // add list item to collapsible collection
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

