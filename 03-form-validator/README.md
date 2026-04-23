# 📋 Form Validator

## Description
A React signup form with real-time validation. The form validates username, email, and password before submission. Multiple validator functions are broken or incomplete — fix them to make the form work correctly.

## Tech Stack
- React 18
- Vite
- Vanilla CSS

## Problem Statement
The `validators.js` file has three issues:
1. `isValidEmail` — uses a regex that matches **any** string (always returns true)
2. `isValidPassword` — the uppercase check logic is **inverted** (rejects passwords that DO have uppercase)
3. `isValidPassword` — is **missing** checks for numbers and special characters
4. `main.jsx` — the email validation call is **not wired up** in the `validate()` function

## What User Needs To Do
- [ ] Fix `isValidEmail` with a real email regex (must contain `@` and a domain)
- [ ] Fix the inverted uppercase check in `isValidPassword`
- [ ] Add number check (`/[0-9]/`) to `isValidPassword`
- [ ] Add special character check (`/[!@#$%^&*]/`) to `isValidPassword`
- [ ] In `main.jsx`, call `isValidEmail` inside `validate()` and add error to `newErrors.email`

## Where to Start
📄 File: `validators.js`  
🔧 Functions: `isValidEmail`, `isValidPassword`  
📄 File: `main.jsx`  
🔧 Function: `validate` — look for the `TODO` comment

## How to Run
```bash
npm install
npm run dev
```

## Expected Output
After fixing:
- Empty/invalid email shows: ❌ error
- Weak password shows: ❌ specific error message
- Valid inputs show: ✅ green indicator
- Submitting a valid form shows a green success banner
