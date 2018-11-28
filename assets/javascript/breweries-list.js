var breweriesATX;
var geoBrews = [] // used in other js file
var map
var markers = []

$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
});

jQuery(function ($) {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq8qjNnAwkr_fPwdDQGd7CR_qYMMTWYjY&callback=initialize";
    document.body.appendChild(script);
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
database.ref('/breweriesJSON').on("value", function (snapshot) {
    var results = snapshot.val()
    breweriesATX = results
    for (var i = 0; i < results.length; i++) {
        if (typeof results[i] == "undefined") {
            console.log('skipped')
        }
        else {
            // collapsible header
            var collapsibleHeader = $("<div>").addClass("collapsible-header")
            createCollapsibleHeader(i, results[i].breweryId, results[i].name, collapsibleHeader)
            addMarker(i + 1, results[i].location, map, results[i].name);

            // collapsible body
            var collapsibleBody = $("<div>").addClass("collapsible-body")
            var collapsibleHours = $("<ul>").addClass("collapsible hoursStyle")
            createHoursElement(results[i].hours, collapsibleHours)
            collapsibleBody.append(collapsibleHours)
            createCollapsibleBody(results[i].amountOfBeers, results[i].styleId, collapsibleBody)

            // list-item to hold collapsible
            var listItem = $("<li>").append(collapsibleHeader).append(collapsibleBody)
            $("#breweries-coll").append(listItem)
        }
    }
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// create collapsible body
function createCollapsibleBody(amountOfBeers, styleId, collapsibleBody) {
    // if beer amount present, load
    if (typeof amountOfBeers != "undefined") {
        collapsibleBody.append($("<div>").addClass("chip").html(amountOfBeers + '<img src="../assets/icons/pint.svg"></img>'))
    }
    // if styleIds is returned, populate inside a chip -- may have to recheck error catching
    if (typeof styleId != "undefined") {
        collapsibleBody.append($("<div>").addClass("chip").html(styleId.length + '<img src="../assets/icons/beerTypes.svg"></img>'))
    }
    // add address if present (populate off google api) -- using placeholder for now
    var addy = $("<div>").addClass("col s12 m6 addy")
    addy.append($("<p>").html("<em>Address:<em> 12345 Pauls Valley Rd #2, Austin, TX 78737").addClass("address-info"))
    collapsibleBody.append(addy)
}


// create a collapsible if hours attribute has an array
function createHoursElement(hours, collapsibleHours) {
    var collapsibleHoursHeader = $("<div>").addClass("collapsible-header waves-effect waves-yellow").html("Hours")
    var hoursListItem = $("<li>")
    if (hours.length > 1) {
        var colHeaderIcon = $("<i>").addClass("material-icons").html('expand_more')
        collapsibleHoursHeader.prepend(colHeaderIcon)
        var collapsibleHoursBody = $("<div>").addClass("collapsible-body")
        var hoursList = $("<ul>").addClass("collection listHours")
        for (j = 0; j < hours.length; j++) {
            var collDay = $("<li>").addClass("collection-item").text(hours[j])
            hoursList.append(collDay)
        }
        collapsibleHoursBody.append(hoursList)
        hoursListItem.append(collapsibleHoursHeader).append(collapsibleHoursBody)
        collapsibleHours.append(hoursListItem)
        collapsibleHours.collapsible();
    }
    else {
        collapsibleHoursHeader.html("Hours: " + hours[0].capitalize())
        collapsibleHours.append(collapsibleHoursHeader)
    }
}


// create collapsible header --- NOTE:: will need to add extra parameter to find if location is open; currently flagging even indeces as open locations
function createCollapsibleHeader(i, id, name, collapsibleHeader) {
    console.log('name: ' + name + ', id: ' + id)
    var beerLink = $("<a>").attr('id', id).text(name).attr('href', 'brewery.html')
    beerLink.addClass("btn yellow accent-4 black-text waves-effect waves-orange")
    beerLink.on("click", function (event) {
        localStorage.setItem("brewery", event.target.attributes.id.value)
    })
    var sourceForIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue" + (i + 1) + ".png"
    var collapsibleHeaderIcon = $("<div>").html('<img src="' + sourceForIcon + '"></img>')
    var openNowIcon = $("<div>").addClass("open-close").html('<img src="../assets/icons/closed.svg"></img>')
    if (i % 2 == 0) { openNowIcon.html('<img src="../assets/icons/open.svg"></img>') }
    collapsibleHeader.prepend(openNowIcon).append(collapsibleHeaderIcon).append(beerLink)
}


// add marker
function addMarker(index, location, map, title) {
    var stringForIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue" + index + ".png"
    var breweryInfoWindow = new google.maps.InfoWindow({ content: title });
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        icon: stringForIcon,
        infowindow: breweryInfoWindow
    });
    markers.push(marker)
    google.maps.event.addListener(marker, 'click', function () {
        hideAllInfoWindows(map);
        this.infowindow.open(map, this);
    });
}


// hide all info windows when another is clicked
function hideAllInfoWindows(map) {
    markers.forEach(function (marker) {
        marker.infowindow.close(map, marker);
    });
}


// handle error when loading geolocation
function handleLocationError(browserHasGeolocation, youAreHereInfoWindow, pos) {
    youAreHereInfoWindow.setPosition(pos);
    youAreHereInfoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    youAreHereInfoWindow.open(map);
}


// init map, asks user for location (everytime -- for now)
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
        }, function () {
            handleLocationError(true, youAreHereInfoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, youAreHereInfoWindow, map.getCenter());
    }
}


// to capitlize first letter for non-Hours sentence
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}