import { useState, useEffect } from "react";
import { productData } from "./assets/data.js";

const App = () => {
  // States
  const [currentProduct, setCurrentProduct] = useState(() => ({
    color: "purple",
    size: "s",
    quantity: 0,
  }));
  const [totalCart, setTotalCart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset quantity on mount
  useEffect(() => {
    setCurrentProduct((prev) => ({ ...prev, quantity: 0 }));
  }, []);

  // Handlers
  const updateSelectedColor = (color) => {
    setCurrentProduct((prev) => ({ ...prev, color }));
  };

  const updateSelectedSize = (size) => {
    setCurrentProduct((prev) => ({ ...prev, size }));
  };

  const changeProductAmount = (increment) => {
    setCurrentProduct((prev) => ({
      ...prev,
      quantity: Math.max(0, prev.quantity + (increment ? 1 : -1)),
    }));
  };

  const addToCart = () => {
    setTotalCart((prevCart) => {
      const key = `${currentProduct.color}-${currentProduct.size}`;
      const updatedCart = { ...prevCart };

      if (currentProduct.quantity > 0) {
        updatedCart[key] = { ...currentProduct };
      } else {
        delete updatedCart[key];
      }

      return updatedCart;
    });
  };

  const calculatePrice = (size, quantity) => {
    return (productData.priceWithSize[size] || 0) * quantity;
  };

  const cartItems = Object.values(totalCart);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + calculatePrice(item.size, item.quantity),
    0
  );

  return (
    <main>
      <section className="container">
        {/* Image Section */}
        <div className="thumbnail">
          <img
            src={productData.bandColorWithImage[currentProduct.color]}
            alt="band"
          />
        </div>

        {/* Details Section */}
        <div className="details">
          <h2 className="product-title">{productData.productName}</h2>

          {/* Review Section */}
          <div id="review">
            <div className="review-images">
              {[...Array(3)].map((_, idx) => (
                <img
                  key={idx}
                  className="star-fill"
                  src="/star-fill.png"
                  alt=""
                />
              ))}
              <img
                className="star-half-fill"
                src="/star-half-fill.png"
                alt=""
              />
              <img className="star" src="/star.png" alt="" />
            </div>
            <p id="review-details">
              (<span>{productData.totalReviews}</span> Reviews)
            </p>
          </div>

          {/* Product Price */}
          <p className="product-price">
            ${productData.price.toFixed(2)}
            <span> ${productData.latestPrice.toFixed(2)}</span>
          </p>

          {/* Description */}
          <div id="description">
            <p>{productData.description}</p>
          </div>

          {/* Type and Model */}
          <div className="type-model">
            <div className="category">
              <p className="title">Type</p>
              <p className="detail">{productData.type}</p>
            </div>
            <div className="category">
              <p className="title">Model Number</p>
              <p className="detail">{productData.modelNumber}</p>
            </div>
          </div>

          {/* Band Color */}
          <div className="band-color">
            <p>Band Color</p>
            <div className="colors">
              {Object.keys(productData.bandColorWithImage).map((color) => (
                <div
                  key={color}
                  className={`color ${color} ${
                    currentProduct.color === color ? `selected${color}` : ""
                  }`}
                  onClick={() => updateSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Wrist Size */}
          <div className="size">
            <p>Wrist Size</p>
            <div className="size-buttons">
              {Object.keys(productData.priceWithSize).map((size) => (
                <div
                  key={size}
                  className={`size-button ${
                    currentProduct.size === size ? "active" : ""
                  }`}
                  onClick={() => updateSelectedSize(size)}
                >
                  <span className="size-name">{size.toUpperCase()}</span>
                  <span className="size-prize">
                    ${productData.priceWithSize[size]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Add/Remove */}
          <div className="action">
            <div className="add-remove">
              <div className="minus" onClick={() => changeProductAmount(false)}>
                <p>-</p>
              </div>
              <div className="value">{currentProduct.quantity}</div>
              <div className="plus" onClick={() => changeProductAmount(true)}>
                <p>+</p>
              </div>
            </div>
            <button className="cart" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" id="cart-modal">
          <div className="modal-content">
            <h2>Your Cart</h2>
            <div className="cart-items">
              <div className="cart-title">
                <p className="item">Item</p>
                <p className="color-item">Color</p>
                <p className="size-item">Size</p>
                <p className="quantity-item">Qnt</p>
                <p className="price-item">Price</p>
              </div>
            </div>
            <div className="cart-container">
              {cartItems.map((item, idx) => (
                <div className="cart-items" key={idx}>
                  <div className="cart-title">
                    <div className="item">
                      <img
                        src={productData.bandColorWithImage[item.color]}
                        alt="${item.color} band"
                      />
                      <p>{productData.productName}</p>
                    </div>
                    <p className="color-item single-name">{item.color}</p>
                    <p className="size-item single">
                      {item.size.toUpperCase()}
                    </p>
                    <p className="quantity-item single">{item.quantity}</p>
                    <p className="price-item single">
                      ${calculatePrice(item.size, item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <p className="total">Total</p>
              <p className="quantity">{totalQuantity}</p>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="modal-buttons">
              <div
                className="continue-shopping"
                onClick={() => setIsModalOpen(false)}
              >
                Continue Shopping
              </div>
              <div className="checkout">Checkout</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart */}
      <div
        className={`floating-cart cart-animate`}
        style={{ visibility: "visible" }}
        onClick={() => setIsModalOpen(true)}
      >
        Checkout
        <span className="cart-count">{Object.keys(totalCart).length}</span>
      </div>
    </main>
  );
};

export default App;
