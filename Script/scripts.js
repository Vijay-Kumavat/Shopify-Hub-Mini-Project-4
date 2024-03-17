// Sample product data
const products = [
  { id: 1, name: 'iphone 99', category: 'electronics', price: 99, image: 'Images/p1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', quantity: 0 },
  { id: 2, name: 'iPhone 100', category: 'clothing', price: 199, image: 'Images/p2.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', quantity: 0 },
  { id: 3, name: 'iPhone 101', category: 'books', price: 299, image: 'Images/p3.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', quantity: 0 },
];

// Display products
function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'mb-4');
    card.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            <button type="button" class="btn btn-primary see-more" data-toggle="modal" data-target="#exampleModal" data-id="${product.id}">
              Show more
            </button>
          </div>
        </div>
      `;
    productList.appendChild(card);
  });
}

function seeMore(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDesc").textContent = product.description;
  }
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.quantity++;
    updateCart();
  }
}

// Remove product from cart
function removeFromCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product && product.quantity > 0) {
    product.quantity--;
    updateCart();
  }
}

// Update cart
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let totalPrice = 0;
  products.forEach(product => {
    if (product.quantity > 0) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          ${product.name} x ${product.quantity} - $${product.price * product.quantity}
          <button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button>
        `;
      cartItems.appendChild(listItem);
      totalPrice += product.price * product.quantity;
    }
  });
  document.getElementById('totalPrice').innerText = totalPrice;
}

// Filter products
function filterProducts(category, priceRange) {
  let filteredProducts = products;
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  if (priceRange > 0) {
    filteredProducts = filteredProducts.filter(product => {
      switch (priceRange) {
        case 1:
          return product.price <= 99;
        case 2:
          return product.price > 99 && product.price <= 199;
        case 3:
          return product.price > 199 && product.price <= 299;
        default:
          return true;
      }
    });
  }
  displayProducts(filteredProducts);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);

  document.getElementById('searchInput').addEventListener('input', event => {
    const searchQuery = event.target.value.trim().toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
    displayProducts(filteredProducts);
  });

  document.getElementById('categoryFilter').addEventListener('change', event => {
    const category = event.target.value;
    const priceRange = document.getElementById('priceFilter').value;
    filterProducts(category, parseInt(priceRange));
  });

  document.getElementById('priceFilter').addEventListener('change', event => {
    const priceRange = event.target.value;
    const category = document.getElementById('categoryFilter').value;
    filterProducts(category, parseInt(priceRange));
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.dataset.id);
      addToCart(productId);
    } else if (event.target.classList.contains('remove-from-cart')) {
      const productId = parseInt(event.target.dataset.id);
      removeFromCart(productId);
    } else if (event.target.classList.contains('see-more')) {
      const productId = parseInt(event.target.dataset.id);
      seeMore(productId);
    }
  });
});
