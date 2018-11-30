$(document).ready(function(){
    $('.datepicker').datepicker();
  });



$("#ageForm").submit(function (event) {

    event.preventDefault();

    var day = $("#birthDay").val();

    var month = $("#birthMonth").val();
   
    var year = $("#birthYear").val();
    
    var age = 21;

    var mydate = new Date();

    mydate.setFullYear(year, month - 1, day);

    var currdate = new Date();

    currdate.setFullYear(currdate.getFullYear() - age);

    if ((currdate - mydate) < 0) {

        window.location = "https://www.youtube.com/watch?v=z-m9WgAdflY";


    } else {
        window.location = "pages/home.html"
    }
});