// Book Store Data
const books = [
    {
        id: 1,
        title: 'Care Guide for Beginners',
        description: 'Learn basic health and care principles. A comprehensive guide for those new to personal wellness.',
        price: 2.99,
        category: 'Health'
    },
    {
        id: 2,
        title: 'Healthy Aging Tips',
        description: 'Simple tips for better wellbeing. Discover practical strategies for maintaining health throughout life.',
        price: 1.99,
        category: 'Wellness'
    },
    {
        id: 3,
        title: 'Mental Wellness Basics',
        description: 'Understand mental health fundamentals. Essential knowledge for mental and emotional well-being.',
        price: 3.49,
        category: 'Mental Health'
    },
    {
        id: 4,
        title: 'Fitness for All Ages',
        description: 'Easy-to-follow fitness routines suitable for everyone. Build strength and endurance naturally.',
        price: 2.49,
        category: 'Fitness'
    },
    {
        id: 5,
        title: 'Nutrition Guide',
        description: 'Complete nutrition guide for optimal health. Learn about balanced diets and healthy eating habits.',
        price: 3.99,
        category: 'Nutrition'
    },
    {
        id: 6,
        title: 'Sleep Better Tonight',
        description: 'Science-backed techniques to improve sleep quality. Rest better and wake refreshed.',
        price: 1.49,
        category: 'Sleep'
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const booksContainer = document.getElementById('books-container');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.querySelector('.close');
const checkoutForm = document.getElementById('checkout-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    updateCart();
    setupEventListeners();
});

// Render Books
function renderBooks() {
    booksContainer.innerHTML = books.map(book => `
        <div class="book">
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <span class="book-price">£${book.price.toFixed(2)}</span>
            <button class="book-btn" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    saveCart();
    updateCart();
    alert(`${book.title} added to cart!`);
}

// Remove from Cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCart();
}

// Update Quantity
function updateQuantity(bookId, quantity) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(bookId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCart();
        }
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Display
function updateCart() {
    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <span class="cart-item-price">£${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.20; // 20% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `£${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `£${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `£${total.toFixed(2)}`;
    document.getElementById('final-total').textContent = `£${total.toFixed(2)}`;
}

// Setup Event Listeners
function setupEventListeners() {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    checkoutBtn.addEventListener('click', () => {
        checkoutModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => {
        checkoutModal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === checkoutModal) {
            checkoutModal.classList.remove('show');
        }
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processPayment();
    });

    // Format card number input
    document.getElementById('card').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    });

    // Format expiry date input
    document.getElementById('expiry').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    });

    // Format CVV input
    document.getElementById('cvv').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Process Payment
function processPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const card = document.getElementById('card').value;
    const total = document.getElementById('final-total').textContent;

    // Simple validation
    if (!name || !email || !card) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate payment processing
    alert(`Payment successful!\n\nCustomer: ${name}\nEmail: ${email}\nAmount: ${total}\n\nThank you for your purchase! Your books will be available for download immediately.`);

    // Clear cart and close modal
    cart = [];
    saveCart();
    updateCart();
    checkoutModal.classList.remove('show');
    checkoutForm.reset();
    cartSidebar.classList.remove('open');
}

console.log('Digital Book Store loaded successfully!');
