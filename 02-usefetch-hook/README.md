# 👥 useFetch Custom Hook

## Description
A React app that displays a directory of users fetched from a public API. The app uses a custom `useFetch` hook to abstract fetch logic. The hook is **broken in two ways** — your job is to find and fix both bugs.

## Tech Stack
- React 18
- Vite
- Custom Hook pattern

## Problem Statement
The `useFetch` hook in `useFetch.js` has two bugs:
1. **Infinite Loop Bug** — The `useEffect` has the wrong item in its dependency array, causing it to re-fetch endlessly
2. **Silent Error Bug** — When a network error occurs, it is only `console.log`-ged but the `error` state is never updated, so the UI never shows an error message

## What User Needs To Do
- [ ] Open `useFetch.js` and find the wrong dependency in `useEffect`
- [ ] Fix the dependency array so the fetch runs only when `url` changes
- [ ] Set the `error` state inside the `catch` block
- [ ] **Bonus:** Add an `AbortController` to cancel in-flight requests when the component unmounts

## Where to Start
📄 File: `useFetch.js`  
🔧 Line ~22: `useEffect` dependency array  
🔧 Line ~30: `catch` block — error state not set

## How to Run
```bash
npm install
npm run dev
```

## Expected Output
After fixing:
- Page loads once and shows 10 user cards
- No infinite spinning/re-fetching in the Network tab
- If you pass an invalid URL, the UI shows a red error message
