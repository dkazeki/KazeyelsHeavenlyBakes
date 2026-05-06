let cart = [];
function addItem(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    renderCart();
}
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No items added yet.</p>";
        cartTotal.textContent = "₱0";
        return;
    }
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div>
                <strong>${item.name}</strong>
                <p>₱${item.price} × ${item.quantity}</p>
                </div>
                <span>₱${itemTotal}</span>
            </div>
        `;
  }).join("");
  cartTotal.textContent = `₱${total}`;
}
function clearOrder() {
    cart = [];
    renderCart();
    document.getElementById("receiptOutput").textContent =
    "Your receipt will appear here after you generate it.";
}
function printReceipt() {
    const cashierName = document.getElementById("cashierName").value || "N/A";
        const customerName = document.getElementById("customerName").value || "Walk-in Customer";
        const contactNumber = document.getElementById("contactNumber").value || "N/A";
        const paymentMethod = document.getElementById("paymentMethod").value;
        if (cart.length === 0) {
            alert("Please add items first.");
            return;
        }
        let total = 0;
        const orderLines = cart.map(item => {
            const itemTotal = item.price * item.quantity; total += itemTotal;
            return `- ${item.name} x${item.quantity} = ₱${itemTotal}`;
        }).join("\n");
        const receipt = `
        =================================
        KAZEYEL'S HEAVENLY BAKES
        =================================

        Customer Name: ${customerName}
        Contact Number: ${contactNumber}
        Cashier: ${cashierName}
        Payment Method: ${paymentMethod}

        Order:
        ${orderLines}

        ---------------------------------
        TOTAL: ₱${total}
        ---------------------------------

        Thank you for ordering!
        Where every crumb is divine.
    `;
    document.getElementById("receiptOutput").textContent = receipt;
}
renderCart();
function openModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");
    if(username === "admin" && password === "1234") {
        localStorage.setItem("loggedInUser", username);
        message.style.color = "green";
        message.textContent = "Login successful!"; 
        setTimeout(() => {
            closeModal();
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
     }
}
window.onload = function() {
    const user = localStorage.getItem("loggedInUser");
    if(user) {
        console.log("Logged in as:", user);
    }
}