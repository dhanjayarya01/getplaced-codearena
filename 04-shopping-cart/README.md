# 🛒 Shopping Cart

## Description
A React e-commerce cart using `useReducer` for state management. Products can be added, removed, and the cart can be cleared. The reducer logic is broken in multiple ways — fix it to make the cart behave correctly.

## Tech Stack
- React 18 + useReducer
- Vite
- Vanilla CSS

## Problem Statement
The `cartReducer` inside `main.jsx` has **4 bugs**:
1. **ADD_ITEM** — does not increment quantity if item already exists; always creates a duplicate entry
2. **REMOVE_ITEM** — removes the entire item immediately instead of decrementing quantity by 1
3. **CLEAR_CART** — returns `state` (does nothing) instead of returning an empty array
4. **Total calculation** — ignores quantity (`item.price` only, not `item.price * item.quantity`)

## What User Needs To Do
- [ ] Fix `ADD_ITEM`: if item exists, return updated state with `quantity + 1`; otherwise add with `quantity: 1`
- [ ] Fix `REMOVE_ITEM`: if `quantity > 1`, decrement; if `quantity === 1`, remove from array
- [ ] Fix `CLEAR_CART`: return `[]`
- [ ] Fix `total`: multiply `item.price * item.quantity` in the `reduce` call

## Where to Start
📄 File: `main.jsx`  
🔧 Function: `cartReducer` — all 3 cases  
🔧 Line ~47: `total` calculation

## How to Run
```bash
npm install
npm run dev
```

## Expected Output
After fixing:
- Clicking "Add to Cart" twice shows `x2` and correct price
- Clicking `−` decrements quantity (not remove instantly)
- "Clear Cart" empties the cart
- Total reflects `price × quantity` for all items
