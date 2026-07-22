// Welcome Message
alert("Welcome to Chiz Fashion Store!");

// Shopping Cart
let cartCount = 0;

function buyProduct() {
    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    alert("Product added to cart successfully!");
}

// Favorite Button
function toggleFavorite(button) {

    if (button.textContent === "🤍") {
        button.textContent = "❤️";
    } else {
        button.textContent = "🤍";
    }

}

// Product Search
function searchProduct() {

    let input = document.getElementById("searchinput").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let productName = product.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(input)){
            product.style.display = "";
        }else{
            product.style.display = "none";
        }

    });

}

// Dark Mode
function darkMode(){

    document.body.classList.toggle("dark-mode");

}

// Contact Form Validation
document.querySelector("form").addEventListener("submit", function(event){

    event.preventDefault();

    alert("Thank you! Your message has been received.");

});