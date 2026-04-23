# 🔒 Auth Middleware

## Description
An Express server with JWT-based authentication middleware. The middleware is supposed to protect routes and enforce role-based access. It has **4 bugs** and **1 missing implementation** — fix them all.

## Tech Stack
- Node.js + Express
- jsonwebtoken

## Problem Statement
`middleware.js` has these issues:
1. **Inverted condition** — The `if` check blocks requests that DO have a valid header
2. **Wrong split character** — Splits on `"."` instead of `" "` to extract the token
3. **Wrong secret** — Verifies with `"wrong_secret"` instead of the actual `SECRET`
4. **Wrong property** — Attaches decoded payload to `req.admin` instead of `req.user`
5. **`authorizeRole` not implemented** — Always calls `next()`, letting anyone into admin routes

## What User Needs To Do
- [ ] Fix the condition in `authenticate` (flip the logic)
- [ ] Fix `.split(".")` → `.split(" ")` and take index `[1]`
- [ ] Replace `"wrong_secret"` with `SECRET`
- [ ] Change `req.admin` to `req.user`
- [ ] Implement `authorizeRole`: check `req.user.role === role`, return 403 if not

## Where to Start
📄 File: `middleware.js`  
🔧 `authenticate` function — all 4 bugs  
🔧 `authorizeRole` function — implement the role check

## How to Run
```bash
npm install
node server.js
```
Generate a test token first:
```bash
curl -X POST http://localhost:4000/api/token \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "role": "admin"}'
```

## Expected Output
After fixing:
- Requests without token → 401
- Requests with valid token → 200 + user data
- Non-admin user hitting `/api/admin` → 403
- Admin user hitting `/api/admin` → 200
