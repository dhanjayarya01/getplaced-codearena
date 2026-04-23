const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticate, authorizeRole } = require("./middleware");

const app = express();
app.use(express.json());

const SECRET = "arena_secret_key";

// Helper to generate test tokens
app.post("/api/token", (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) return res.status(400).json({ error: "userId and role required" });
  const token = jwt.sign({ userId, role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route — any authenticated user
app.get("/api/dashboard", authenticate, (req, res) => {
  res.json({
    message: "Welcome to the dashboard!",
    user: req.user, // Will be undefined until BUG 4 is fixed
  });
});

// Admin-only route
app.get("/api/admin", authenticate, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin panel — secret data here", user: req.user });
});

// Public route
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(4000, () => console.log("🔒 Auth Middleware server on http://localhost:4000"));
