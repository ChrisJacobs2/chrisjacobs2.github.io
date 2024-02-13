// Hi Sunny! 

    // VARIABLES
// This number keeps track of what food reccomendation we are on
var index = 0;
/*
    0 = don
    1 = jimmy
    2 = yumyum
*/

// This array holds the elements that represent the food recommendations.
// I felt an array was best because it allows me to easily cycle through the elements.
let foodRcmd = [    // food recommendations
    document.getElementById("don"),
    document.getElementById("jimmy"),
    document.getElementById("yum")
];

let foodAside = [   // food aside
    document.getElementById("don-perks"),
    document.getElementById("jimmy-perks"),
    document.getElementById("yum-perks")
]

    // SITE INITIALIZATION
// food reccomendations
document.getElementById("don").style.display = "block";
document.getElementById("jimmy").style.display = "none";
document.getElementById("yum").style.display = "none";
// aside info
document.getElementById("don-perks").style.display = "block";
document.getElementById("jimmy-perks").style.display = "none";
document.getElementById("yum-perks").style.display = "none";

index = 0;

    // EVENT LISTENERS
document.getElementById("left-arrow").addEventListener("click", function() {
  // Code to handle left arrow button click
  cycle("left");  
});

document.getElementById("right-arrow").addEventListener("click", function() {
  // Code to handle right arrow button click
  cycle("right");
});

    // FUNCTIONS
// code to cycle through the food recommendations.
// direction is a string that can be either "left" or "right"
function cycle(direction) {
    if (index > 2 || index < 0) {
        console.log("ERROR: index out of bounds");
        return;
    }

    // hide the element at the current index
    foodRcmd[index].style.display = "none";
    foodAside[index].style.display = "none";

    // change the index based on the direction
    if (direction == "left") {
        index--;
    } else if (direction == "right") {
        index++;
    }

    // this causes the index to 'loop' to the other side when it reaches the end or beginning
    if (index < 0) {
        index = 2;
    } else if (index > 2) {
        index = 0;
    }

    // show the element at the new index
    foodRcmd[index].style.display = "block";
    foodAside[index].style.display = "block";
}
