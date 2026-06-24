// Simple cart stored in localStorage as an array of { title, price, quantity }
function loadCart() {
	try {
		return JSON.parse(localStorage.getItem('cart')) || [];
	} catch (e) { return []; }
}

function saveCart(cart) {
	try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
}

function addToCart(title, price) {
	const cart = loadCart();
	const item = cart.find(i => i.title === title);
	if (item) item.quantity += 1; else cart.push({ title, price, quantity: 1 });
	saveCart(cart);
	updateCartBadge();
	alert(`${title} added to cart.`);
}

function viewCart() {
	window.location.href = 'cart.html';
}

function updateCartBadge() {
	const badge = document.getElementById('cart-count');
	if (!badge) return;
	const cart = loadCart();
	const count = cart.reduce((s,i) => s + (i.quantity||0), 0);
	badge.textContent = count;
}

function scrollToBooks() {
	const el = document.getElementById('books');
	if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Modal wiring for 'View Book' buttons
document.addEventListener('DOMContentLoaded', () => {
	updateCartBadge();
	const viewButtons = document.querySelectorAll('.view-btn');
	viewButtons.forEach(btn => btn.addEventListener('click', (e) => {
		const t = btn.dataset.title || '';
		const d = btn.dataset.desc || '';
		const pText = btn.dataset.price || '';
		const p = parseFloat(pText.replace(/[^0-9.]/g, '')) || 0;
		document.getElementById('modal-title').textContent = t;
		document.getElementById('modal-desc').textContent = d;
		document.getElementById('modal-price').textContent = `£${p.toFixed(2)}`;
		const modal = document.getElementById('book-modal');
		modal.classList.add('open');
		modal.setAttribute('aria-hidden','false');
		// store current product on modal-add button dataset
		const addBtn = document.getElementById('modal-add');
		addBtn.dataset.title = t;
		addBtn.dataset.price = p;
	}));

	const closeA = document.getElementById('modal-close');
	const closeB = document.getElementById('modal-close-2');
	[closeA, closeB].forEach(b => b && b.addEventListener('click', () => {
		const modal = document.getElementById('book-modal'); modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
	}));

	document.getElementById('modal-add').addEventListener('click', (e) => {
		const btn = e.currentTarget;
		const title = btn.dataset.title || '';
		const price = parseFloat(btn.dataset.price) || 0;
		if (title) addToCart(title, price);
		const modal = document.getElementById('book-modal'); modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
	});

	// close on background click
	const modalWrap = document.getElementById('book-modal');
	if (modalWrap) modalWrap.addEventListener('click', (ev) => { if (ev.target === modalWrap) { modalWrap.classList.remove('open'); modalWrap.setAttribute('aria-hidden','true'); } });
});