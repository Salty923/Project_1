// ____________________CLICK LISTENERS____________________ //


//Submit Lost Dog Dropdown

$(".dropdown-menu li a").on("click", function() {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('#dropdownMenu1').val($(this).data('value'));
    console.log($("#dropdownMenu1").val());
});



// ____________________FORM VALIDATION FUNCTIONS____________________ //

function checkGameType(pickupGameType) {
    if (pickupGameType === "") {
        vex.dialog.alert("Please select a dog breed");
        return false;
    }
    return true;
}

function checkUserName(pickupUserName) {
    // regular expression to match required user name format
    re = /[a-z]\w+/gi;

    if (pickupUserName !== '' && !pickupUserName.match(re)) {
        vex.dialog.alert("Please enter a valid color");
        return false;
    }
    return true;
};

function checkGameName(pickupGameName) {
    // regular expression to match required game name format
    re = /[a-z]\w+/gi;

    if (pickupGameName !== '' && !pickupGameName.match(re)) {
        vex.dialog.alert("Please enter a valid size");
        return false;
    }
    return true;
};

function checkLocation(pickupLocation) {

    if (pickupLocation === '') {
        vex.dialog.alert("Please enter a valid location (City or ZIP)");
        return false;
    }
    return true;
};

function checkDate(pickupDate) {
    // regular expression to match required date format
    re = /^[01]?[0-9]\/[0-3]?[0-9]\/[12][90][0-9][0-9]$/;

    if (pickupDate !== '' && !pickupDate.match(re)) {
        vex.dialog.alert("Please enter a valid date");
        return false;
    }
    return true;
};

function checkTime(pickupTime) {
    // regular expression to match required date format
    re = /^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?$/;

    if (pickupTime !== '' && !pickupTime.match(re)) {
        vex.dialog.alert("Please enter a valid time");
        return false;
    }
    return true;
}



///////// Submits Dogs added from Firebase as Chidren

$(".active-games").on("click", ".game-location", function() {
    var location = $(this).attr("data-location");
    location = encodeURIComponent(location.trim());
    $(".find-game-map").removeClass("visible").addClass("hidden");
    $("#map-holder").html("<iframe class='visible show-game-map' width='458' height='440' frameborder='0' src='https://www.google.com/maps/embed/v1/search?q=" + location + ",+United+States&key=AIzaSyA3Qc-NrPzqioe6_w80_FL8xanuXIgCAtA'></iframe>");
});



// ____________________AJAX CALLS____________________ //


///////// WEATHER UNDERGROUND /////////

// This is our API Key - https://home.openweathermap.org/api_keys
var APIKey = "919a8794f58e0301";

var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/conditions/q/IL/Chicago.json";



// AJAX call for weather
$.ajax({ url: queryURL, method: 'GET' }).done(function(response) {

    $("#location-1").html(response.current_observation.weather);
    $("#location-2").html(response.current_observation.temp_f);
    $("#location-3").html(response.current_observation.feelslike_f);
    $("#location-4").html(response.current_observation.heat_index_f);
    $("#location-5").html(response.current_observation.forecast_url);

});



// ____________________FIREBASE____________________ //


// Link to Firebase
var pickupData = new Firebase("https://nwuproject1.firebaseio.com");

// Button for Submitting New Dog
// $("#addDog").on("click", function(e) {

//     // Prevents reloading of page
//     e.preventDefault();

//     if  (($("#dog-color-input").val() == "") || ($("#dog-size-input").val() == "") || ($("#location-input").val() == "") || ($("#date-input").val() == "") || ($("#time-input").val() == "")) {
//             vex.dialog.alert("Please enter the necessary information into the form");
//             return false;
//         };

    // Grabs user input
    // var pickupGameType = $("#dropdownMenu1").val().trim();
    // var pickupUserName = $("#dog-color-input").val().trim();
    // var pickupGameName = $("#dog-size-input").val().trim();
    // var pickupLocation = $("#location-input").val().trim();
    // var pickupDate = $("#date-input").val().trim();
    // var pickupTime = $("#time-input").val().trim();

    // if (checkGameType(pickupGameType) && checkUserName(pickupUserName) && checkGameName(pickupGameName) && checkLocation(pickupLocation) && checkDate(pickupDate) && checkTime(pickupTime)) {
    //     var newPickup = {
    //         type: pickupGameType,
    //         userName: pickupUserName,
    //         gameName: pickupGameName,
    //         location: pickupLocation,
    //         date: pickupDate,
    //         time: pickupTime
    //     }

    //     pickupData.push(newPickup);

    // } else {
    //     return false;
    // }

    // Clears all of the input fields
//     $("#dropdownMenu1").html("Dog Breed" + "<span class='caret'></span>");
//     $("#dog-color-input").val("");
//     $("#dog-size-input").val("");
//     $("#location-input").val("");
//     $("#date-input").val("");
//     $("#time-input").val("");

//     // Success message
//     vex.dialog.alert("Your dog was successfully added to our database!");

// });


pickupData.on("child_added", function(childSnapshot, prevChildKey) {

    var pickupGameType = childSnapshot.val().type;
    var pickupUserName = childSnapshot.val().userName;
    var pickupGameName = childSnapshot.val().gameName;
    var pickupLocation = childSnapshot.val().location;
    var pickupDate = childSnapshot.val().date;
    var pickupTime = childSnapshot.val().time;

    $(".active-games").append("<div class='live-game'><h4>Game type:</h4><p class='game-type'>" + pickupGameType + "</p><br><h4>Created by:</h4><p class='created-by'>" + pickupUserName + "</p><br><h4>Game name:</h4><p class='game-name'>" + pickupGameName + "</p><br><h4>Location:</h4><p class='game-location' data-location='" + pickupLocation + "'>" + pickupLocation + "</p><br><h4>Date:</h4><p class='game-date'>" + pickupDate + "</p><br><h4>Time</h4><p class='game-time'>" + pickupTime + "</p></div>");

});
