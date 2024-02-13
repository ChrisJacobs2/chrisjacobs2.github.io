// grab each image with the class of zoom
var images = document.querySelectorAll(".zoom");

// grab each aside
var donPerks = document.getElementById("don-perks");
var jimmyPerks = document.getElementById("jimmy-perks");
var yumPerks = document.getElementById("yum-perks");
var foodReview = document.getElementById("food-review");

// store the original aside text
// this would be a security risk if the text was supplied by a user
var donPerksText = donPerks.innerHTML;
var jimmyPerksText = jimmyPerks.innerHTML;
var yumPerksText = yumPerks.innerHTML;

var zoomedImage = null;

// remember global variable window.index

/*
    this function uses a var zoomedImage to keep track of
    whether, and which image is zoomed. Clicking an Image will
    cause it to zoom, clicking it again will unzoom it.
    Only one image will be zoomed at a time.
*/
images.forEach(function(img) {
    img.addEventListener("click", function() {
        if (this == zoomedImage) {  // if the clicked image is zoomed
            // unzoom the image
            this.classList.remove("zoomed");
            zoomedImage = null;

            // set the aside text to default
            switch (index) {
                case 0: // don
                    donPerks.innerHTML = donPerksText;
                    break;
                case 1: // jimmy john's
                    jimmyPerks.innerHTML = jimmyPerksText;
                    break;
                case 2: // yumyum
                    yumPerks.innerHTML = yumPerksText;
                    break;
            }


        } else {
            if (zoomedImage) {  // if some image is zoomed
                // unzoom it
                zoomedImage.classList.remove("zoomed");
            }
            // zoom the clicked image
            this.classList.add("zoomed");
            zoomedImage = this;

            // set the aside text to the appropriate text
                // get the second class of the image
            var food = this.classList[1];
                // loop through the food-review aside for a paragraph with the same class
            for (var i = 0; i < foodReview.children.length; i++) {
                if (foodReview.children[i].classList.contains(food)) {
                    // set the aside text to the paragraph's text
                    switch (index) {
                        case 0: // don
                            donPerks.innerHTML = foodReview.children[i].innerHTML;
                            break;
                        case 1: // jimmy john's
                            jimmyPerks.innerHTML = foodReview.children[i].innerHTML;
                            break;
                        case 2: // yumyum
                            yumPerks.innerHTML = foodReview.children[i].innerHTML;
                            break;
                    }
                }
            }
        }
    });
});