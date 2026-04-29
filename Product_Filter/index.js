let products = [];

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');
const categoryButtons = document.querySelectorAll('.category-btn');

let currentCategory = 'all';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupEventListeners();
});

async function fetchProducts() {
    try {
        renderLoading();
        
        const response = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json');

        const data = await response.json();
        
        products = data.map(product => ({
            id: product.id,
            name: product.name,
            category: mapCategory(product.category),
            categoryLabel: getLabel(product.category),
            price: product.priceCents / 100, // Convert cents to dollars
            originalPrice: Math.round((product.priceCents / 100) * 1.3 * 100) / 100, // 30% markup for original price
            image: product.image,
            rating: product.rating.stars,
            reviews: product.rating.count,
            description: product.description
        }));
        
        renderProducts(products);
    } catch (error) {
        console.error('Error:', error);
        productsGrid.innerHTML = '<p class="text-center text-red-500 col-span-4">Failed to load products</p>';
    }
}

function mapCategory(cat) {
    const map = {
        "Beauty & Personal Care": 'beauty',
        "Electronics & Gadgets": 'electronics',
        "Fashion & Apparel": 'fashion',
        "Home & Kitchen": 'home',
        "Health & Fitness": 'fitness'
    };
    return map[cat] || 'fashion';
}

function getLabel(cat) {
    const labels = {
        "Beauty & Personal Care": 'Beauty',
        "Electronics & Gadgets": 'Tech',
        "Fashion & Apparel": 'Fashion',
        "Home & Kitchen": 'Home',
        "Health & Fitness": 'Fitness'
    };
    return labels[cat] || 'Shop';
}

function renderLoading() {
    productsGrid.innerHTML = Array(8).fill().map(() => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div class="h-80 bg-gray-200"></div>
            <div class="p-4">
                <div class="h-6 bg-gray-200 rounded mb-2"></div>
                <div class="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filterProducts();
    });

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('from-purple-600', 'to-rose-500', 'text-white');
                b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            btn.classList.add('from-purple-600', 'to-rose-500', 'text-white');
            currentCategory = btn.dataset.category;
            filterProducts();
        });
    });
}

function filterProducts() {
    const filtered = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

function renderProducts(productsToRender) {
    resultCount.textContent = productsToRender.length;

    if (productsToRender.length === 0) {
        productsGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    productsGrid.classList.remove('hidden');
    noResults.classList.add('hidden');

    productsGrid.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.ceil(product.rating));
    const badgeClass = `badge-${product.category}`;

    return `
        <div class="product-card bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="product-image relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover">
                <div class="absolute top-3 right-3">
                    <span class="badge ${badgeClass}">${product.categoryLabel}</span>
                </div>
                <div class="absolute top-3 left-3">
                    <span class="price-tag text-white px-3 py-1.5 rounded-full text-xs font-semibold">-${discount}%</span>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-3 line-clamp-2">${product.description}</p>
                <div class="flex items-center mb-3 text-yellow-500 text-lg">${stars}</div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">$${product.price.toFixed(2)}</span>
                    <span class="text-sm text-gray-400 line-through">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <button class="w-full mt-2 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium">Add to Bag</button>
            </div>
        </div>
    `;
}