let allProducts = [];
let filteredProducts = [];
let cart = {};          // { id: { product, qty } }
let activeCat = 'all';
let cartOpen = false;
let qvProduct = null;
let qvQty = 1;

async function fetchProducts() {
  showSkeletons(12);
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Network error');
    allProducts = await res.json();
    applyFilters();
  } catch (e) {
    showError();
  }
}

function applyFilters() {
  const q    = document.getElementById('search-input').value.toLowerCase().trim();
  const sort = document.getElementById('sort-select').value;

  filteredProducts = allProducts.filter(p => {
    const matchCat  = activeCat === 'all' || p.category === activeCat;
    const matchQ    = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  filteredProducts.sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating')     return b.rating.rate - a.rating.rate;
    if (sort === 'name')       return a.title.localeCompare(b.title);
    return 0;
  });

  document.getElementById('result-count').textContent = `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''}`;
  renderProducts(filteredProducts);
}

function setCat(btn, cat) {
  activeCat = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}


function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  if (products.length === 0) {
    grid.innerHTML = `<div class="col-12"><div class="state-box">
      <i class="bi bi-search"></i>
      <h3>No products found</h3>
      <p>Try adjusting your search or filter.</p>
    </div></div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => {
    const inCart  = !!cart[p.id];
    const isNew   = p.id % 5 === 0;
    const isSale  = p.id % 7 === 0;
    const stars   = renderStars(p.rating.rate);
    const delay   = Math.min(i, 11) * 40;

    return `
    <div class="col-6 col-md-4 col-lg-3" style="animation-delay:${delay}ms">
      <div class="product-card" data-id="${p.id}">
        <div class="card-img-wrap">
          ${isNew  ? '<span class="card-badge badge-new">New</span>'  : ''}
          ${isSale ? '<span class="card-badge badge-sale">Sale</span>' : ''}
          <button class="card-wish ${isWished(p.id) ? 'active' : ''}" onclick="toggleWish(event,${p.id})" aria-label="Wishlist">
            <i class="bi bi-heart${isWished(p.id) ? '-fill' : ''}"></i>
          </button>
          <img src="${p.image}" alt="${escHtml(p.title)}" loading="lazy"/>
          <div class="card-overlay">
            <button class="overlay-btn" onclick="openQV(${p.id})">Quick View</button>
          </div>
        </div>
        <div class="card-body-custom">
          <div class="card-category">${p.category}</div>
          <div class="card-title">${escHtml(p.title)}</div>
          <div class="card-rating">
            <span class="stars">${stars}</span>
            <span class="rating-count">(${p.rating.count})</span>
          </div>
          <div class="card-footer-custom">
            <div class="card-price">
              ${isSale ? `<span class="old">$${(p.price * 1.2).toFixed(2)}</span>` : ''}
              $${p.price.toFixed(2)}
            </div>
            <button class="add-btn ${inCart ? 'in-cart' : ''}" id="add-btn-${p.id}"
              onclick="addToCart(event, ${p.id})">
              <i class="bi bi-${inCart ? 'check2' : 'bag-plus'}"></i>
              ${inCart ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function addToCart(e, id, fromQV = false) {
  if (e) e.stopPropagation();
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { product, qty: 1 };
  }

  updateCartBadge();
  updateCartUI();
  refreshCardBtn(id);

  toast(`Added to bag`, false);
  if (!fromQV && !cartOpen) flashBadge();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartBadge();
  updateCartUI();
  refreshCardBtn(id);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) { removeFromCart(id); return; }
  updateCartBadge();
  updateCartUI();
}

function refreshCardBtn(id) {
  const btn = document.getElementById(`add-btn-${id}`);
  if (!btn) return;
  const inCart = !!cart[id];
  btn.className = `add-btn ${inCart ? 'in-cart' : ''}`;
  btn.innerHTML = `<i class="bi bi-${inCart ? 'check2' : 'bag-plus'}"></i> ${inCart ? 'Added' : 'Add'}`;
}

function cartTotal() {
  return Object.values(cart).reduce((sum, {product, qty}) => sum + product.price * qty, 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, {qty}) => sum + qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count === 0 ? 'none' : '';
}

function flashBadge() {
  const badge = document.getElementById('cart-badge');
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

function updateCartUI() {
  const list  = document.getElementById('cart-items-list');
  const foot  = document.getElementById('cart-foot');
  const empty = document.getElementById('cart-empty-state');
  const items = Object.values(cart);

  if (items.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty);
    empty.style.display = 'flex';
    foot.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  foot.style.display = '';

  list.innerHTML = items.map(({product: p, qty}) => `
    <div class="cart-item">
      <div class="ci-thumb"><img src="${p.image}" alt=""/></div>
      <div class="ci-info">
        <div class="ci-name">${escHtml(p.title)}</div>
        <div class="ci-cat">${p.category}</div>
        <div class="ci-controls">
          <button class="qty-btn" onclick="changeQty(${p.id},-1)"><i class="bi bi-dash"></i></button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id},1)"><i class="bi bi-plus"></i></button>
        </div>
      </div>
      <div class="ci-price">
        $${(p.price * qty).toFixed(2)}
        <button class="ci-remove" onclick="removeFromCart(${p.id})"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
  `).join('');

  const sub  = cartTotal();
  const tax  = sub * 0.08;
  const total = sub + tax;
  document.getElementById('subtotal-val').textContent = `$${sub.toFixed(2)}`;
  document.getElementById('tax-val').textContent      = `$${tax.toFixed(2)}`;
  document.getElementById('total-val').textContent    = `$${total.toFixed(2)}`;
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cart-panel').classList.toggle('open', cartOpen);
  document.getElementById('cart-backdrop').classList.toggle('open', cartOpen);
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}

function doCheckout() {
  toast('Order placed! 🎉 Thank you for shopping.', false);
  cart = {};
  updateCartBadge();
  updateCartUI();
  toggleCart();
}

let wishlist = new Set();
function toggleWish(e, id) {
  e.stopPropagation();
  if (wishlist.has(id)) {
    wishlist.delete(id);
    toast('Removed from wishlist', true);
  } else {
    wishlist.add(id);
    toast('Added to wishlist ♥', false);
  }
  const btn = e.currentTarget;
  btn.classList.toggle('active', wishlist.has(id));
  btn.innerHTML = `<i class="bi bi-heart${wishlist.has(id) ? '-fill' : ''}"></i>`;
}
function isWished(id) { return wishlist.has(id); }

function openQV(id) {
  qvProduct = allProducts.find(p => p.id === id);
  if (!qvProduct) return;
  const pid = qvProduct.id;
  document.getElementById('qv-img').src   = qvProduct.image;
  document.getElementById('qv-img').alt   = qvProduct.title;
  document.getElementById('qv-cat').textContent   = qvProduct.category;
  document.getElementById('qv-title').textContent = qvProduct.title;
  document.getElementById('qv-stars').innerHTML   = renderStars(qvProduct.rating.rate);
  document.getElementById('qv-rcount').textContent= `(${qvProduct.rating.count} reviews)`;
  document.getElementById('qv-price').textContent = `$${qvProduct.price.toFixed(2)}`;
  document.getElementById('qv-desc').textContent  = qvProduct.description;

  qvQty = cart[pid] ? cart[pid].qty : 1;
  document.getElementById('qv-qty-val').textContent = qvQty;

  const addBtn = document.getElementById('qv-add-btn');
  addBtn.textContent = cart[pid] ? 'Added to Bag ✓' : 'Add to Bag';
  addBtn.style.background = cart[pid] ? 'var(--sage)' : '';

  document.getElementById('qv-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQV(e) {
  if (e.target === e.currentTarget) closeQVBtn();
}
function closeQVBtn() {
  document.getElementById('qv-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}
function qvChangeQty(delta) {
  qvQty = Math.max(1, qvQty + delta);
  document.getElementById('qv-qty-val').textContent = qvQty;
}

function qvAddToCart() {
  if (!qvProduct) return;
  const pid = qvProduct.id;
  if (cart[pid]) {
    cart[pid].qty += qvQty;
  } else {
    cart[pid] = { product: qvProduct, qty: qvQty };
  }
  updateCartBadge();
  updateCartUI();
  refreshCardBtn(pid);
  document.getElementById('qv-qty-val').textContent = cart[pid].qty;
  document.getElementById('qv-add-btn').textContent = 'Added to Bag ✓';
  document.getElementById('qv-add-btn').style.background = 'var(--sage)';
  toast(`Added ${qvQty > 1 ? qvQty + ' items' : 'item'} to bag`, false);
}

function showSkeletons(n) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = Array.from({length: n}).map(() => `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="skeleton">
        <div class="skel-img"></div>
        <div class="skel-body">
          <div class="skel-line" style="width:45%;height:9px"></div>
          <div class="skel-line" style="width:90%"></div>
          <div class="skel-line" style="width:70%"></div>
          <div class="skel-line" style="width:55%;height:18px;margin-top:16px"></div>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('result-count').textContent = '…';
}

function showError() {
  document.getElementById('product-grid').innerHTML = `
    <div class="col-12"><div class="state-box">
      <i class="bi bi-wifi-off"></i>
      <h3>Failed to load products</h3>
      <p>Check your connection and try again.</p>
      <button class="retry-btn" onclick="fetchProducts()">Retry</button>
    </div></div>`;
}

function toast(msg, warn = false) {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast-pill';
  el.innerHTML = `<span class="toast-dot ${warn ? 'warn' : ''}"></span>${msg}`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    setTimeout(() => el.remove(), 300);
  }, 2800);
}

function renderStars(rate) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('qv-backdrop').classList.contains('open')) { closeQVBtn(); }
    else if (cartOpen) { toggleCart(); }
  }
});

updateCartBadge();
fetchProducts();