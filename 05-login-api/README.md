# 🔐 Login API

## Description
A Node.js/Express REST API with register, login, and protected profile endpoints. The API exists and runs, but has **critical security flaws** — your job is to make it production-safe.

## Tech Stack
- Node.js + Express
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv

## Problem Statement
The API has **4 serious bugs/missing features**:
1. **Plain-text passwords** — `POST /api/register` saves password without hashing
2. **Plain-text compare** — `POST /api/login` compares raw password strings instead of using `bcrypt.compare`
3. **No JWT expiry** — token lives forever (no `expiresIn` option)
4. **No input validation** — missing fields crash or allow garbage data
5. **Unguarded protected route** — `GET /api/profile` crashes if `Authorization` header is missing

## What User Needs To Do
- [ ] In `/api/register`: hash the password using `bcrypt.hash(password, 10)` before saving
- [ ] In `/api/register`: add validation (missing fields → 400 error)
- [ ] In `/api/login`: use `bcrypt.compare(password, user.password)` instead of `===`
- [ ] In `/api/login`: add `{ expiresIn: "1h" }` to `jwt.sign()`
- [ ] In `/api/profile`: check if `authHeader` exists before calling `.split()`
- [ ] Also hash the pre-seeded user's password in the `users` array

## Where to Start
📄 File: `server.js`  
🔧 `/api/register` handler — lines ~20–35  
🔧 `/api/login` handler — lines ~47–65

## How to Run
```bash
npm install
node server.js
```
Test with curl or Postman:
```bash
# Register
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"bob","email":"bob@test.com","password":"Secure@123"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@test.com","password":"Secure@123"}'
```

## Expected Output
After fixing:
- Register returns `{ userId }` with password hashed in memory
- Login returns a JWT token with 1-hour expiry
- Profile returns user data when valid token is provided
- All invalid requests return proper 400/401 errors
