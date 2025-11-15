// ======== SIMPLE CART LOGIC ========

// Ambil cart dari localStorage (jika ada)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======== ADD TO CART ========
const addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const productCard = e.target.closest('.product-card');
    const name = productCard.querySelector('h3').innerText;
    const price = parseFloat(productCard.querySelector('.price').innerText.replace('$', ''));
    const img = productCard.querySelector('img').getAttribute('src');

    // Cek kalau produk sudah ada di cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${name} added to cart!`);
    updateCartCount();
  });
});

// ======== TAMPILKAN CART DI cart.html ========
if (document.querySelector('.cart-table')) {
  const tableBody = document.querySelector('.cart-table tbody');
  const subtotalEl = document.querySelector('.cart-summary p strong:last-child');

  function renderCart() {
    tableBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="product-info">
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name}</span>
        </td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" data-index="${index}"></td>
        <td>$${itemTotal}</td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
      `;
      tableBody.appendChild(row);
    });

    subtotalEl.textContent = `$${total}`;
  }

  renderCart();

  // ======== Hapus item dari cart ========
  document.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });

  // ======== Update quantity ========
  document.addEventListener('input', e => {
    if (e.target.type === 'number') {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });
}

// ======== CLEAR CART SAAT CHECKOUT BERHASIL ========
if (window.location.pathname.includes('success.html')) {
  localStorage.removeItem('cart');
}

// ======== UPDATE CART COUNT ========
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
  }
}
updateCartCount();

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
// ADD TO CART FUNCTION
const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.image,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Optional toast
    alert(`${product.name} added to cart!`);
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) countElement.textContent = totalItems;
}
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-screen");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200); // tetap loading 1.2 detik
});