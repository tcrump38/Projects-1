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
database.ref('/stylesWiki').on("value", function (snapshot) {
    var results = snapshot.val()
    breweriesATX = results
    for (var i = 0; i < results.length; i++) {
        if (typeof results[i] == "undefined") {
            // console.log('skipped')
        }
        else {
            var collHeader = $("<div>").addClass("collapsible-header")
            var colHeaderIcon = $("<i>").addClass("material-icons").html('local_drink')
            collHeader.prepend(colHeaderIcon)
            var beerLink = $("<a>").text(results[i].title)
            beerLink.addClass("btn styles-button")
            collHeader.append(beerLink)
            if (typeof results[i].sub != "undefined") {
                for (j = 0; j < results[i].sub.length; j++) {
                    var subBeers = $("<a>").text(results[i].sub[j]).addClass("btn undefined-styles-button hide-on-med-and-down")
                    collHeader.append(subBeers)
                }
            }
            var collBody = $("<div>").addClass("wiki-info collapsible-body")
            var wikiContent = $("<div>")
            callWikiApi(wikiContent, results[i].wiki)
            collBody.append(wikiContent)
            var listItem = $("<li>").append(collHeader).append(collBody)
            $("#breweries-coll").append(listItem)
        }
    }
    // console.log(snapshot.val());
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});

function callWikiApi(element, wiki) {

    var query = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + wiki + "&callback=?"

    $.ajax({
        type: "GET",
        url: query,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {
            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup).addClass("wiki-para");
            blurb.find('a').each(function () { $(this).replaceWith($(this).html()); });
            blurb.find('sup').remove();
            blurb.find('.mw-ext-cite-error').remove();
            element.html($(blurb).find('p').text())
        },
        error: function (errorMessage) {
        }
    });

}

// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}