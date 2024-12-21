import { productData } from "../assets/data.js";

// DOM Elements
const thumbnailImage = document.querySelector(".thumbnail img");
const productTitle = document.querySelector(".product-title");
const reviewCount = document.getElementById("review-count");
const price = document.getElementById("price");
const latestPrice = document.getElementById("latest-price");
const description = document.querySelector("#description p");
const typeDetail = document.getElementById("type-detail");
const modelDetail = document.getElementById("model-detail");
const colorOptions = {
  purple: document.getElementById("purple"),
  black: document.getElementById("black"),
  blue: document.getElementById("blue"),
  cyan: document.getElementById("cyan"),
};
const sizeButtons = {
  s: document.querySelector(".button-s"),
  m: document.querySelector(".button-m"),
  l: document.querySelector(".button-l"),
  xl: document.querySelector(".button-xl"),
};
const quantityControls = {
  minus: document.querySelector(".minus"),
  value: document.querySelector(".value"),
  plus: document.querySelector(".plus"),
};
const modal = document.getElementById("cart-modal");
const floatingCart = document.querySelector(".floating-cart");
const continueShopping = document.querySelector(".continue-shopping");
const cart = document.querySelector(".cart");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart-container");

// Initial Setup
const initializeProductDetails = () => {
  productTitle.textContent = productData.productName;
  reviewCount.textContent = productData.totalReviews;
  price.textContent = `$${productData.price.toFixed(2)}`;
  latestPrice.textContent = `$${productData.latestPrice.toFixed(2)}`;
  description.textContent = productData.description;
  typeDetail.textContent = productData.type;
  modelDetail.textContent = productData.modelNumber;

  // Default selections
  colorOptions.purple.classList.add("selectedPurple");
  thumbnailImage.src = productData.bandColorWithImage["purple"];
  sizeButtons.s.classList.add("active");
  quantityControls.value.textContent = 0;
};

// Global Variables
let totalCartItems = 0;
let totalCart = {};
let currentProduct = {
  color: "purple",
  size: "s",
  quantity: 0,
};

// Functions to handle color and size selection
const updateSelectedColor = (color) => {
  Object.keys(colorOptions).forEach((c) => {
    colorOptions[c].classList.toggle(`selected${capitalize(c)}`, c === color);
  });
  thumbnailImage.src = productData.bandColorWithImage[color];
  currentProduct.color = color;
  updateCartItemQuantity();
};

const updateSelectedSize = (size) => {
  Object.keys(sizeButtons).forEach((s) => {
    sizeButtons[s].classList.toggle("active", s === size);
  });
  currentProduct.size = size;
  updateCartItemQuantity();
};

const updateCartItemQuantity = () => {
  const key = `${currentProduct.color}-${currentProduct.size}`;
  const cartItem = totalCart[key];
  totalCartItems = cartItem ? cartItem.quantity : 0;
  quantityControls.value.textContent = totalCartItems;
};

// Update cart total price and quantity
const calculatePrice = (size, quantity) => {
  return productData.priceWithSize[size] * quantity;
};

const updateUI = () => {
  cartContainer.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;

  Object.values(totalCart).forEach((item) => {
    const itemPrice = calculatePrice(item.size, item.quantity);
    totalQuantity += item.quantity;
    totalPrice += itemPrice;

    cartContainer.innerHTML += `
      <div class="cart-items">
        <div class="cart-title">
          <div class="item">
            <img src="${productData.bandColorWithImage[item.color]}" alt="${
      item.color
    } band" />
            <p>${productData.productName}</p>
          </div>
          <p class="color-item single-name">${capitalize(item.color)}</p>
          <p class="size-item single">${item.size.toUpperCase()}</p>
          <p class="quantity-item single">${item.quantity}</p>
          <p class="price-item single">$${itemPrice.toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  document.querySelector(".quantity").textContent = totalQuantity;
  document.querySelector(".total-amount").textContent = `$${totalPrice.toFixed(
    2
  )}`;
};

const addToCart = () => {
  if (currentProduct.quantity !== 0) {
    const key = `${currentProduct.color}-${currentProduct.size}`;
    totalCart[key] = { ...currentProduct };
  } else {
    const key = `${currentProduct.color}-${currentProduct.size}`;
    delete totalCart[key];
  }

  if (Object.keys(totalCart).length > 0) {
    floatingCart.classList.remove("floating");
    floatingCart.classList.add("cart-animate");
    cartCount.textContent = Object.keys(totalCart).length;
  }
  updateUI();
};

const changeProductAmount = (increment) => {
  if (increment) {
    totalCartItems += 1;
  } else if (totalCartItems > 0) {
    totalCartItems -= 1;
  }
  quantityControls.value.textContent = totalCartItems;
  currentProduct.quantity = totalCartItems;
};

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Event Listeners
Object.keys(colorOptions).forEach((color) => {
  colorOptions[color].addEventListener("click", () =>
    updateSelectedColor(color)
  );
});

Object.keys(sizeButtons).forEach((size) => {
  sizeButtons[size].addEventListener("click", () => updateSelectedSize(size));
});

quantityControls.plus.addEventListener("click", () =>
  changeProductAmount(true)
);
quantityControls.minus.addEventListener("click", () =>
  changeProductAmount(false)
);

floatingCart.addEventListener("click", () => modal.classList.remove("hidden"));
continueShopping.addEventListener("click", () => modal.classList.add("hidden"));

cart.addEventListener("click", addToCart);

// Initialize product details on load
initializeProductDetails();
