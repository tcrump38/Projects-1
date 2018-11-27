$("#ageForm").submit(function (event) {
    console.log (2)
    event.preventDefault();

    var day = $("#birthDay").val();
    console.log (day)
    var month = $("#birthMonth").val();
    console.log (month)
    var year = $("#birthYear").val();
    console.log (year)
    var age = 21;

    var mydate = new Date();

    mydate.setFullYear(year, month - 1, day);

    var currdate = new Date();

    currdate.setFullYear(currdate.getFullYear() - age);

    if ((currdate - mydate) < 0) {

        window.location = "https://www.youtube.com/watch?v=z-m9WgAdflY";


    } else {
        window.location = "../index.html"
    }

});