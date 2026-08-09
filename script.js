// ================================
// CHIZ FASHION STORE
// ================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================================
// ELEMENTS
// ================================

const cartButton = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const wishlistCount = document.getElementById("wishlist-count");

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");


// ================================
// OPEN CART
// ================================

cartButton.addEventListener("click", function () {
    cartPanel.classList.add("open");
});


// ================================
// CLOSE CART
// ================================

closeCart.addEventListener("click", function () {
    cartPanel.classList.remove("open");
});


// ================================
// ADD TO CART
// ================================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(function (item) {
            return item.name === name;
        });

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        saveCart();
        displayCart();

        cartPanel.classList.add("open");

    });

});


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "₦0";

        cartCount.textContent = "0";

        return;
    }

    let total = 0;
    let itemCount = 0;

    cart.forEach(function (item, index) {

        total += item.price * item.quantity;
        itemCount += item.quantity;

        const itemDiv = document.createElement("div");

        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <h3>${item.name}</h3>

            <p>₦${item.price.toLocaleString()}</p>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>
        `;

        cartItems.appendChild(itemDiv);

    });

    cartTotal.textContent = "₦" + total.toLocaleString();

    cartCount.textContent = itemCount;
}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
    displayCart();
}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
    displayCart();
}


// ================================
// REMOVE PRODUCT
// ================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    displayCart();
}


// ================================
// SAVE CART
// ================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ================================
// WISHLIST
// ================================

const wishlistButtons =
    document.querySelectorAll(".wish-btn");

wishlistButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        if (!wishlist.includes(productName)) {

            wishlist.push(productName);

            button.textContent = "❤️ Added";

        } else {

            wishlist =
                wishlist.filter(function (item) {
                    return item !== productName;
                });

            button.textContent = "❤️ Wishlist";
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        wishlistCount.textContent =
            wishlist.length;

    });

});


// ================================
// SEARCH
// ================================

searchInput.addEventListener("input", function () {

    const searchValue =
        searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


// ================================
// CATEGORY FILTER
// ================================

categorySelect.addEventListener("change", function () {

    const selectedCategory =
        categorySelect.value;

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const productCategory =
            product.dataset.category;

        if (
            selectedCategory === "all" ||
            productCategory === selectedCategory
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


// ================================
// LOAD CART
// ================================

displayCart();

wishlistCount.textContent =
    wishlist.length;