# 🔢 Doubling Counter

## Description
A React counter app where each button click should **double** the current count. The app renders the current value and a history of all previous values. Something is broken — the count is not doubling correctly.

## Tech Stack
- React 18
- Vite
- Vanilla CSS

## Problem Statement
The `handleDouble` function inside `main.jsx` contains a **logic bug**. Instead of doubling the count, it is performing a different arithmetic operation, so the sequence `1 → 2 → 4 → 8` never appears.

## What User Needs To Do
- [ ] Open `main.jsx` and locate the `handleDouble` function
- [ ] Identify the wrong arithmetic operator
- [ ] Fix it so that `newCount = count * 2`
- [ ] **Bonus:** Add a click counter below the history list that tracks how many times the button has been clicked (there is a `TODO` comment for this)

## Where to Start
📄 File: `main.jsx`  
🔧 Function: `handleDouble` — look at how `newCount` is computed

## How to Run
```bash
npm install
npm run dev
```
Then open `http://localhost:5173` in your browser.

## Expected Output
After fixing:
- Start: **1**
- Click 1: **2**
- Click 2: **4**
- Click 3: **8**
- Click 4: **16**
- History shows: `1 → 2 → 4 → 8 → 16`
