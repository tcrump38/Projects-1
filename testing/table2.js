$(document).ready(function () {
    currentBrew = localStorage.getItem("brewery")
    console.log(currentBrew)
    callAPI(currentBrew) 
})

// var config = {
//     apiKey: "AIzaSyCACl0dIADoUYtr0cU0l6WsUMGbcHhC3Vo",
//     authDomain: "project1-388e6.firebaseapp.com",
//     databaseURL: "https://project1-388e6.firebaseio.com",
//     projectId: "project1-388e6",
//     storageBucket: "project1-388e6.appspot.com",
//     messagingSenderId: "62443097997"
// };

// firebase.initializeApp(config);

// var database = firebase.database();
// var beers;

// // Firebase watcher + initial loader HINT: .on("value")
// database.ref('/beersBlueOwl').on("value", function (snapshot) {
//     var results = snapshot.val()
//     beers = results
//     for (var i = 0; i < results.length; i++) {
//         var showBeers = $("<tr>")

//         var beerName = $("<td>").text(results[i].name)
//         var beerNameDisplay = $("<td>").text(results[i].nameDisplay)
//         var beerAbv = $("<td>").text(results[i].abv)
//         var beerIbu = $("<td>").text(results[i].ibu)
//         var beerStyleId = $("<td>").text(results[i].styleId)
//         var beerStyleName = $("<td>").text(results[i].style.name + ' (' + results[i].style.shortName + ')')
//         var styleIbu = "IBU: [" + results[i].style.ibuMin + ', ' + results[i].style.ibuMax + "], "
//         var styleAbv = "ABV: [" + results[i].style.abvMin + ', ' + results[i].style.abvMax + "], "
//         var styleSrm = "SRM: [" + results[i].style.srmMin + ', ' + results[i].style.srmMax + "]"

//         var beerStyleInfo = $("<tr>").text(styleIbu + styleAbv + styleSrm)

//         showBeers.append(beerName).append(beerNameDisplay).append(beerAbv).append(beerIbu).append(beerStyleId).append(beerStyleName)
//         $("#table-body").append(showBeers).append(beerStyleInfo)
//     }


//     // Log everything that's coming out of snapshot
//     console.log(snapshot.val());
//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

currentBrew = localStorage.getItem("brewery")
console.log(currentBrew)


function callAPI(currentBrew) {
    var api_key = "acbce2cf61ffbafa9b9a4bc5efa2e267"
    var queryURL = "https://api.brewerydb.com/v2/brewery/" + currentBrew + "/beers?key=" + api_key;
    // getCORS(queryURL, handleResponse(response))
    $.ajax({
        url: queryURL,
        headers:{
            'HTTP_ACCEPT':true
        },
        method: "GET",
        dataType: "application/json",

        crossDomain : true
        }).then(function (response) {
        console.log(response);
        handleResponse(response.data)
        console.log(response.data)
    })
}



function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    // if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}


function handleResponse(results) {
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
}