//alert("connected");

$(document).ready(function () {
    var dogs = ["PIT_BULL", "LAB", "PUG", "HUSKY","SHEPARD","BULLDOG","COLLIE"];

    function createDog() {
        $("#lostDogs").empty();
        for (var i = 0; i < dogs.length; i++) {
            var a = $("<option>");
            // Adding a class
            a.addClass("dropitem");
            // Adding a data-attribute with a value of the movie at index i
            a.text(dogs[i]);
            // Adding the button to the HTML
            $("#lostDogs").append(a)
            console.log(dogs[i]);

        }
    };

    createDog();
});
