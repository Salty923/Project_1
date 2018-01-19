
// Initialize Firebase
var config = {
apiKey: "AIzaSyCY_YbuxtgsKPyTNvN0cnzCAWHr51RMJ84",
authDomain: "nwuproject1.firebaseapp.com",
databaseURL: "https://nwuproject1.firebaseio.com",
projectId: "nwuproject1",
storageBucket: "nwuproject1.appspot.com",
messagingSenderId: "218962101512"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database();

var user = firebase.auth().currentUser;

var dbUsers = database.ref("users");

var userUid;

var signedIn = false;

var dogBreed = $("#dropdownMenu1").val().trim();
var dogColor = $("#dog-color-input").val().trim();
var dogSize = $("#dog-size-input").val().trim();
var dogLocation = $("#location-input").val();
var dogDate = $("#date-input").val().trim();
var dogTime = $("#time-input").val().trim();



$("#customBtn").on("click",function () {
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
  });


//assign to log out button
$("#signOutBtn").on("click", function () {
    //Logout code
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });

})


//listener for sign in and out
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        signedIn = true;
        $("#currentUser").html("Welcome");
        console.log("Welcome UID:" + user.uid);
        userUid = user.uid;
        dbUsers.child(user.uid).once("value", function (snapshot) {
            if (snapshot.val() !== null) {
                alert("user exist");
                return;
            } else {
                signedIn = false;
                
            }
        })
    } else {
        // No user is signed in.
        signedIn = false;
        alert("SIGNED OUT");
    }
});



// Button for Submitting New Dog
$("#addDog").on("click", function (e) {
    console.log(userUid);
    
        // Prevents reloading of page
        e.preventDefault();
        if(signedIn = false){
            alert("Please sign in to store your data");
        }else if (($("#dog-color-input").val() == "") || ($("#dog-size-input").val() == "") || ($("#location-input").val() == "") || ($("#date-input").val() == "") || ($("#time-input").val() == "")) {
            alert("Please enter the necessary information into the form");
        }else{
            // Clears all of the input fields
            $("#dropdownMenu1").html("Dog Breed" + "<span class='caret'></span>");
            $("#dog-color-input").val("");
            $("#dog-size-input").val("");
            $("#location-input").val("");
            $("#date-input").val("");
            $("#time-input").val("");

            // Success message
            //vex.dialog.alert("Your dog was successfully added to our database!");
            //store to firebase
            database.ref("users").child(userUid).push({
                breed: dogBreed,
                color: dogBreed,
                size: dogSize,
                location: dogLocation,
                date: dogDate,
                time: dogTime,
            })
        }
    

    
});
