import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard", price: 129.99, emoji: "⌨️" },
  { id: 2, name: "Wireless Mouse", price: 59.99, emoji: "🖱️" },
  { id: 3, name: "4K Monitor", price: 349.99, emoji: "🖥️" },
  { id: 4, name: "USB-C Hub", price: 49.99, emoji: "🔌" },
  { id: 5, name: "Webcam HD", price: 89.99, emoji: "📷" },
];

/**
 * Cart Reducer
 * BUG 1: ADD_ITEM does not handle the case where item already exists → should increment quantity
 * BUG 2: REMOVE_ITEM removes the entire entry, but should only decrement quantity (remove only if qty reaches 0)
 * TODO: Implement CLEAR_CART action
 */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.find((i) => i.id === action.product.id);
      if (exists) {
        // BUG: This adds a duplicate entry instead of updating quantity
        return [...state, { ...action.product, quantity: 1 }];
      }
      return [...state, { ...action.product, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      // BUG: Should decrement quantity by 1, not always filter out entirely
      return state.filter((i) => i.id !== action.id);
    }

    case "CLEAR_CART": {
      // TODO: Return an empty cart
      return state; // BUG: Does nothing
    }

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // TODO: Fix this calculation — it doesn't handle quantity correctly
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="layout">
      <div className="products-panel">
        <h1 className="title">🛒 Dev Store</h1>
        <p className="subtitle">Fix the cart reducer to make shopping work</p>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-emoji">{product.emoji}</div>
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="qty-badge">In cart: {getItemQuantity(product.id)}</div>
              <button className="btn-add" onClick={() => dispatch({ type: "ADD_ITEM", product })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-panel">
        <h2>🧺 Cart ({cart.length} items)</h2>
        {cart.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <span>{item.emoji} {item.name}</span>
                <div className="cart-item-right">
                  <span className="item-qty">x{item.quantity}</span>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="btn-remove" onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}>−</button>
                </div>
              </div>
            ))}
            <div className="total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-clear" onClick={() => dispatch({ type: "CLEAR_CART" })}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
