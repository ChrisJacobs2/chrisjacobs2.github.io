// grab each image with the class of zoom
var images = document.querySelectorAll(".zoom");

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
            this.classList.remove("zoomed");
            zoomedImage = null;
        } else {
            if (zoomedImage) {  // if some image is zoomed
                zoomedImage.classList.remove("zoomed");
            }
            this.classList.add("zoomed");
            zoomedImage = this;
        }
    });
});