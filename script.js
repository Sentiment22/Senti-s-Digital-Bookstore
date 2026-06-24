function scrollToBooks() {
	document.getElementById("books").scrollIntoView({ behavior: "smooth" });
}

// Modal and View Book handlers
document.addEventListener('DOMContentLoaded', () => {
	const viewButtons = document.querySelectorAll('.view-btn');
	viewButtons.forEach(btn => btn.addEventListener('click', openModal));

	document.getElementById('modal-close').addEventListener('click', closeModal);
	document.getElementById('modal-close-2').addEventListener('click', closeModal);
	document.getElementById('modal-add').addEventListener('click', () => {
		const title = document.getElementById('modal-title').textContent;
		alert(`${title} added to cart (demo).`);
		closeModal();
	});

	// Close modal on outside click or Escape
	document.getElementById('book-modal').addEventListener('click', (e) => {
		if (e.target.id === 'book-modal') closeModal();
	});
	window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});

function openModal(e) {
	const btn = e.currentTarget;
	const title = btn.dataset.title || '';
	const desc = btn.dataset.desc || '';
	const price = btn.dataset.price || '';

	document.getElementById('modal-title').textContent = title;
	document.getElementById('modal-desc').textContent = desc;
	document.getElementById('modal-price').textContent = price;

	const modal = document.getElementById('book-modal');
	modal.classList.add('open');
	modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
	const modal = document.getElementById('book-modal');
	modal.classList.remove('open');
	modal.setAttribute('aria-hidden', 'true');
}