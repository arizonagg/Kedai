let cart = {};

function updateQuantity(item, amount) {
    let qtySpan = document.getElementById("qty-" + item);
    let currentQty = parseInt(qtySpan.innerText) || 0;
    let newQty = Math.max(0, currentQty + amount);
    qtySpan.innerText = newQty;
}

function addToCart(item, price) {
    let qtySpan = document.getElementById("qty-" + item);
    let currentQty = parseInt(qtySpan.innerText) || 0;

    if (currentQty > 0) { 
        cart[item] = { qty: currentQty, price: price };
        updateCart();
    } else {
        alert("Jumlah harus lebih dari 0 untuk menambahkan ke keranjang!");
    }
}

function removeFromCart(item) {
    delete cart[item];
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalPrice = 0;
    let totalItems = 0;
    cartList.innerHTML = "";

    for (let item in cart) {
        let totalItemPrice = cart[item].qty * cart[item].price;
        let li = document.createElement("li");
        li.innerHTML = `${item} x${cart[item].qty} - Rp ${totalItemPrice.toLocaleString()} 
                        <button onclick="removeFromCart('${item}')">❌</button>`;
        cartList.appendChild(li);
        totalPrice += totalItemPrice;
        totalItems += cart[item].qty;
    }

    document.getElementById("total-price").innerText = `Total: Rp ${totalPrice.toLocaleString()}`;
    cartCount.innerText = totalItems;
}

function toggleCart() {
    let cartModal = document.getElementById("cart-modal");
    let cartOverlay = document.getElementById("cart-overlay");

    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
        cartOverlay.style.display = "none";
    } else {
        cartModal.style.display = "block";
        cartOverlay.style.display = "block";
    }
}


function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let orderText = "Halo, saya ingin memesan:\n";
    for (let item in cart) {
        orderText += `- ${item} x${cart[item].qty}\n`;
    }

    let waLink = `https://wa.me/6285136060529?text=${encodeURIComponent(orderText)}`;
    window.open(waLink, "_blank");
}

