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

database.ref('/stylesWiki').on("value", function (snapshot) {
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
            var beerLink = $("<a>").text(results[i].title)

            beerLink.addClass("btn yellow accent-4 black-text waves-effect waves-orange")

            collHeader.append(beerLink)

            // create collapsible body for list item
            var collBody = $("<div>").addClass("collapsible-body")

            var wikiContent = $("<div>")

            callWikiApi(wikiContent, results[i].wiki) 


            

            collBody.append(wikiContent)

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


function callWikiApi(element, wiki) {
    var contenido = ''
    var query =  "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + wiki + "&callback=?"
    console.log(query)
    $.ajax({
        type: "GET",
        url: query,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
    
            var markup = data.parse.text["*"];

            var blurb = $('<div></div>').html(markup);


            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });


            blurb.find('sup').remove();


            blurb.find('.mw-ext-cite-error').remove();

            element.html( $(blurb).find('p').text())
        },
        error: function (errorMessage) {
        }
    });

}