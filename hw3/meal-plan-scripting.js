// grab sections
const aside = document.getElementById("order-text");

// grab all images from each imgbar
var images = document.querySelectorAll(".imgbar img");

// template for orders
const orderElement = document.querySelector(".order");

var totalPrice = 0.0;



/*
    This is an event listener for each image in the imgbar.
    Adds the images clicked to an order section in the aside element.
    Also adds the price of the image to the total price.
*/
images.forEach(function(img) {
    img.addEventListener("click", function() {
            // PRICE TOTAL FUNCTONALITY
        // get its data-price attribute, convert it into a double, and add it to totalPrice
        totalPrice += parseFloat(this.getAttribute("data-price"));
        // update the text in span id=total
        document.getElementById("total").innerText = "$" + totalPrice.toFixed(2);

            // ORDER TEMPLATE FUNCTIONALITY
        // create a section with class order
        var order = orderElement.cloneNode(true);
        // set the text of order's paragraph child with class food-name to the alt attribute of the image
        order.querySelector(".food-name").innerText = this.alt;
        // set the text of order's paragraph child with class food-price to the data-price attribute of the image
        order.querySelector(".food-price").innerText = "$" + this.getAttribute("data-price");

            // REMOVE BUTTON FUNCTIONALITY
        // create an event lisener for the remove button
        order.querySelector(".remove").addEventListener("click", function() {
            // subtract the price of the order from totalPrice
            totalPrice -= parseFloat(this.parentElement.querySelector(".food-price").innerText.substring(1)); // substring(1) to remove the dollar sign
            // update the text in span id=total
            document.getElementById("total").innerText = "$" + totalPrice.toFixed(2);
            // remove the order from the aside element
            this.parentElement.remove();
        });
        // remove the hidden class from the order
        order.classList.remove("hidden");
        // append the order to the aside element
        aside.appendChild(order);
    });
});

