const products = [
    {
      name: "Apple",
      price: 50,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Fresh and juicy apples, perfect for snacking."
    },
    {
      name: "Banana",
      price: 30,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Ripe and sweet bananas, great for smoothies."
    },
    {
      name: "Milk",
      price: 25,
      image: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Pure and fresh milk, sourced from local farms."
    },
    {
      name: "Bread",
      price: 40,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Whole wheat bread, freshly baked daily."
    },
    {
      name: "Tomato",
      price: 20,
      image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Fresh and organic tomatoes, perfect for salads."
    }
  ];
  
  function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <img src="${product.image}" alt="${product.name}" class="mx-auto mb-4 w-32 h-32 object-cover rounded-full">
        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
        <p class="text-gray-700 mb-4">₹${product.price}</p>
        <p class="text-gray-600 mb-4">${product.description}</p>
        <div class="flex justify-center items-center mb-4">
          <button onclick="updateQuantity('${product.name}', -1)" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">-</button>
          <span id="${product.name}-quantity" class="bg-gray-100 text-gray-700 px-4 py-1">1</span>
          <button onclick="updateQuantity('${product.name}', 1)" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">+</button>
        </div>
        <button onclick="addToCart('${product.name}', ${product.price})" class="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">Add to Cart</button>
      </div>
    `).join('');
  }
  
  // Update Quantity
  function updateQuantity(name, change) {
    const quantityElement = document.getElementById(`${name}-quantity`);
    let quantity = parseInt(quantityElement.textContent);
    quantity += change;
    if (quantity < 1) quantity = 1; // Ensure quantity doesn't go below 1
    quantityElement.textContent = quantity;
  }
  
  // Add to Cart Functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function addToCart(name, price) {
    const quantity = parseInt(document.getElementById(`${name}-quantity`).textContent);
    const item = cart.find(item => item.name === name);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }
    updateCart();
  }
  
  // Update Cart Count
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  // Initialize
  renderProducts();
  updateCart();
  // Render Cart Items
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItems.innerHTML = '';
    let total = 0;
  
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded-lg shadow-md flex justify-between items-center';
      div.innerHTML = `
        <div>
          <h3 class="text-xl font-bold">${item.name}</h3>
          <p class="text-gray-700">₹${item.price} x ${item.quantity}</p>
        </div>
        <div>
          <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" class="bg-red-500 text-white px-2 py-1 rounded">-</button>
          <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" class="bg-green-500 text-white px-2 py-1 rounded">+</button>
        </div>
      `;
      cartItems.appendChild(div);
      total += item.price * item.quantity;
    });
  
    totalAmount.textContent = total;
  }
  
  // Initialize Cart Page
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }