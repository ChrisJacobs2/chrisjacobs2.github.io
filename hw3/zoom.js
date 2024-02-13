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

/*
    this function uses a var zoomedImage to keep track of
    whether, and which image is zoomed. Clicking an Image will
    cause it to zoom, clicking it again will unzoom it.
    Only one image will be zoomed at a time.
*/
images.forEach(function(img) {
    img.addEventListener("click", function() {
        if (this == zoomedImage) {  // if the current image is zoomed
            // managing the image
            this.classList.remove("zoomed");
            zoomedImage = null;

            // managing the aside text

        } else {
            if (zoomedImage) {  // if some image is zoomed
                zoomedImage.classList.remove("zoomed");
            }
            this.classList.add("zoomed");
            zoomedImage = this;
        }
    });
});