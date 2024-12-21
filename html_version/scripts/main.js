import { productData } from "../assets/data.js";

// select html elements
const thumbnailImage = document.querySelector(".thumbnail img");
const productTitle = document.querySelector(".product-title");
const reviewCount = document.getElementById("review-count");
const price = document.getElementById("price");
const latestPrice = document.getElementById("latest-price");
const description = document.querySelector("#description p");
const typeDetail = document.getElementById("type-detail");
const modelDetail = document.getElementById("model-detail");
const purple = document.getElementById("purple");
const black = document.getElementById("black");
const blue = document.getElementById("blue");
const cyan = document.getElementById("cyan");
const buttonS = document.querySelector(".button-s");
const buttonM = document.querySelector(".button-m");
const buttonL = document.querySelector(".button-l");
const buttonXL = document.querySelector(".button-xl");

// add textnode or innerhtml
productTitle.textContent = productData.productName;
reviewCount.textContent = productData.totalReviews;
price.textContent = `$${productData.price.toFixed(2)}`;
latestPrice.textContent = `$${productData.latestPrice.toFixed(2)}`;
description.textContent = productData.description;
typeDetail.textContent = productData.type;
modelDetail.textContent = productData.modelNumber;

//default values
purple.classList.add("selectedPurple");
thumbnailImage.src = productData.bandColorWithImage["purple"];
buttonS.classList.add("active");

//global functions
const selectColor = (color) => {
  purple.classList.remove("selectedPurple");
  black.classList.remove("selectedBlack");
  cyan.classList.remove("selectedCyan");
  blue.classList.remove("selectedBlue");
  thumbnailImage.src = productData.bandColorWithImage[color];
  if (color === "purple") {
    purple.classList.add("selectedPurple");
  } else if (color === "black") {
    black.classList.add("selectedBlack");
  } else if (color === "cyan") {
    cyan.classList.add("selectedCyan");
  } else if (color === "blue") {
    blue.classList.add("selectedBlue");
  }
};

const selectSize = (size) => {
  buttonS.classList.remove("active");
  buttonM.classList.remove("active");
  buttonL.classList.remove("active");
  buttonXL.classList.remove("active");
  if (size === "s") {
    buttonS.classList.add("active");
  } else if (size === "m") {
    buttonM.classList.add("active");
  } else if (size === "l") {
    buttonL.classList.add("active");
  } else if (size === "xl") {
    buttonXL.classList.add("active");
  }
};

// add event listener
purple.addEventListener("click", () => selectColor("purple"));
black.addEventListener("click", () => selectColor("black"));
blue.addEventListener("click", () => selectColor("blue"));
cyan.addEventListener("click", () => selectColor("cyan"));

buttonS.addEventListener("click", () => selectSize("s"));
buttonM.addEventListener("click", () => selectSize("m"));
buttonL.addEventListener("click", () => selectSize("l"));
buttonXL.addEventListener("click", () => selectSize("xl"));
