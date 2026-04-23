const jwt = require("jsonwebtoken");

const SECRET = "arena_secret_key";

/**
 * authenticate middleware
 *
 * Should:
 * 1. Read the Authorization header
 * 2. Extract the Bearer token
 * 3. Verify the JWT
 * 4. Attach decoded payload to req.user
 * 5. Call next()
 *
 * Currently has multiple bugs.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  // BUG 1: This check is wrong — it should check if authHeader is FALSY or doesn't start with "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // BUG 2: Splitting on wrong character — should be " " (space), not "."
  const token = authHeader.split(".")[1];

  try {
    // BUG 3: Using the wrong variable — should be SECRET not "wrong_secret"
    const decoded = jwt.verify(token, "wrong_secret");

    // BUG 4: Attaching to wrong property — should be req.user not req.admin
    req.admin = decoded;

    next();
  } catch (err) {
    // TODO: Differentiate between TokenExpiredError and JsonWebTokenError
    return res.status(401).json({ error: "Token invalid" });
  }
}

/**
 * authorizeRole middleware factory
 * Returns middleware that restricts access to a specific role
 * TODO: Implement this function — it currently allows everyone through
 */
function authorizeRole(role) {
  return (req, res, next) => {
    // TODO: Check if req.user.role === role
    // If not, return 403 Forbidden
    next(); // BUG: Always calls next regardless of role
  };
}

module.exports = { authenticate, authorizeRole };
