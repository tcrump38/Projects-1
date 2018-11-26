//event listener for beer collapsible.
$(document).ready(function(){
    $('.sidenav').sidenav();
    //event listener for beer dropdown.
    $('.collapsible').collapsible();
    setTable()
});

currentBrew = localStorage.getItem("brewery")
console.log(currentBrew)

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


var config = {
    apiKey: "AIzaSyA1UcJOcionpMViUfunJvvGOevSoQzTYZg",
    authDomain: "all-beers.firebaseapp.com",
    databaseURL: "https://all-beers.firebaseio.com",
    projectId: "all-beers",
    storageBucket: "all-beers.appspot.com",
    messagingSenderId: "60314540344"
  };

firebase.initializeApp(config);
var database = firebase.database();
var beers;

// database.ref('/allBeers/' + localStorage.getItem("brewery")).on("value", function (snapshot) {
database.ref(currentBrew).on("value", function (snapshot) {
    console.log(currentBrew)
    
    var results = snapshot.val()
    beers = results
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function setTable() {
    var results = beers
    for (var i = 0; i < results.length; i++) {
        var collHeader = $("<div>").addClass("collapsible-header").attr('id', results[i].breweryID).text(results[i].name).attr('href', 'table3.html')
        var colHeaderIcon = $("<i>").addClass("material-icons").html('expand_more')
        collHeader.prepend(colHeaderIcon)
        var beerAbv = $("<span class='row beerinfo'>").text("ABV: " + results[i].style.abvMin + '-' + results[i].style.abvMax + '%')
        var beerIbu = $("<span class='row beerinfo'>").text("IBU Scale: " + results[i].style.ibuMin + '-' + results[i].style.ibuMax) 
        var beerSrm = $("<span class='row beerinfo'>").text("SRM: " + results[i].style.srmMin + '-' + results[i].style.srmMax)
        var collBody = $("<div class='beer-info-body'>").addClass("collapsible-body").append(beerAbv).append(beerIbu).append(beerSrm)  
        var listItem = $("<li>").append(collHeader).append(collBody)
        $("#beers-coll").append(listItem)
    }
}