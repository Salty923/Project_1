

//<script src="https://www.gstatic.com/firebasejs/4.8.2/firebase.js"></script>

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



$("#signInBtn").on("click",function () {
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
        $("#currentUser").html("Welcome");
        console.log("Welcome UID:" + user.uid);
        database.ref("users").child(user.uid).set({
            provider: "me",
        })
    } else {
        // No user is signed in.
        $("#currentUser").html("Please sign in");
    }
});