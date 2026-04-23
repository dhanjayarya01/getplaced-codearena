const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// In-memory "database" — simulate a registered user
// NOTE: Password is stored in PLAIN TEXT here — this is intentional for the exercise
const users = [
  {
    id: 1,
    username: "alice",
    email: "alice@example.com",
    // BUG: This should be a bcrypt hash of "Password123!", not plain text
    password: "Password123!",
  },
];

// ─────────────────────────────────────────────
// POST /api/register
// ─────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // TODO: Add input validation — reject if username, email, or password are missing
  // TODO: Add validation — password must be at least 8 characters

  // Check if user already exists
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // BUG: Password is saved as plain text — hash it with bcrypt before saving
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);

  res.status(201).json({ message: "User registered", userId: newUser.id });
});

// ─────────────────────────────────────────────
// POST /api/login
// ─────────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // TODO: Add input validation — reject if email or password missing

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // BUG: This does a plain-text comparison, NOT a bcrypt compare
  // Should use: await bcrypt.compare(password, user.password)
  if (password !== user.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // BUG: JWT token is generated without expiry (expiresIn missing)
  // TODO: Add { expiresIn: "1h" } as options
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "fallback_secret"
    // Missing options object here
  );

  res.json({ message: "Login successful", token });
});

// ─────────────────────────────────────────────
// GET /api/profile  (protected route)
// ─────────────────────────────────────────────
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers["authorization"];

  // TODO: Validate that authHeader exists and starts with "Bearer "
  // Currently there's no check — it will crash if header is missing

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    const user = users.find((u) => u.id === decoded.userId);
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Login API running on http://localhost:${PORT}`));
