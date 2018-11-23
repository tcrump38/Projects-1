$(document).ready(function () {
    currentBrew = localStorage.getItem("brewery")
    console.log(currentBrew)
    callAPI(currentBrew) 
})

currentBrew = localStorage.getItem("brewery")
console.log(currentBrew)


function callAPI(currentBrew) {
    var api_key = "acbce2cf61ffbafa9b9a4bc5efa2e267"
    var queryURL = "https://api.brewerydb.com/v2/brewery/" + currentBrew + "/beers?key=" + api_key;
    // getCORS(queryURL, handleResponse(response))
    $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function (response) {
        console.log(response);
        handleResponse(response.data)
        console.log(response.data)
    })
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