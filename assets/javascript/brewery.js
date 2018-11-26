//event listener for beer collapsible.
$(document).ready(function(){
    $('.sidenav').sidenav();
    //event listener for beer dropdown.
    $('.collapsible').collapsible();
});

currentBrew = localStorage.getItem("brewery")
console.log(currentBrew)

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

// var config = {
//     apiKey: "AIzaSyA1UcJOcionpMViUfunJvvGOevSoQzTYZg",
//     authDomain: "all-beers.firebaseapp.com",
//     databaseURL: "https://all-beers.firebaseio.com",
//     projectId: "all-beers",
//     storageBucket: "all-beers.appspot.com",
//     messagingSenderId: "60314540344"
//   };

// firebase.initializeApp(config);
// var database = firebase.database();
var results;

// database.ref(currentBrew).on("value", function (snapshot) {

database.ref('/allBeers/'+ currentBrew).on("value", function (snapshot) {
    results = snapshot.val()
    setTable()
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



function setTable() {
    var beers = results.beers
    for (var i = 0; i < beers.length; i++) {
        var collHeader = $("<div>").addClass("collapsible-header").attr('id', beers[i].breweryID).text(beers[i].name).attr('href', 'table3.html')
        var colHeaderIcon = $("<i>").addClass("material-icons").html('expand_more')
        collHeader.prepend(colHeaderIcon)

        var beerAbv = $("<span class='row beerinfo'>")
        // if beer has abv, show
        if (typeof beers[i].abv != 'undefined') {
            beerAbv.text("ABV: " + beers[i].abv + '%')
        }
        // if not, show abv-scale for style of beer
        else {
            beerAbv.text("ABV: " + beers[i].style.abvMin + '-' + beers[i].style.abvMax + '%')
        }
        
        var beerIbu = $("<span class='row beerinfo'>")
        // if beer has ibu, show
        if (typeof beers[i].ibu != 'undefined') {
            beerIbu.text("IBU: " + beers[i].ibu)
        }
        // if not, show ibu-scale for style of beer
        else {
            beerIbu.text("IBU Scale: " + beers[i].style.ibuMin + '-' + beers[i].style.ibuMax) 
        }

        var beerSrm = $("<span class='row beerinfo'>")
        // SRM not shown
        if (typeof beers[i].style.srmMin != 'undefined') {
            beerSrm.text("SRM: " + beers[i].style.srmMin + '-' + beers[i].style.srmMax)
        }
        
        else {
            beers[i].style.srmMin != 'undefined'
        }

        
        var collBody = $("<div class='beer-info-body'>").addClass("collapsible-body").append(beerAbv).append(beerIbu).append(beerSrm)  
        var listItem = $("<li>").append(collHeader).append(collBody)
        $("#beers-coll").append(listItem)
    }
}

