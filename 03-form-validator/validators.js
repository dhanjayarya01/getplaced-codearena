/**
 * Form Validation Utilities
 *
 * These functions validate individual form fields.
 * Some have bugs — find and fix them!
 */

// TODO: This function always returns true — fix the email regex
export function isValidEmail(email) {
  // BUG: This regex matches EVERYTHING, it is incorrect
  const emailRegex = /.*/;
  return emailRegex.test(email);
}

// TODO: Password must be >= 8 chars, 1 uppercase, 1 number, 1 special char
export function isValidPassword(password) {
  if (password.length < 8) return { valid: false, message: "Too short" };

  // BUG: This check is inverted — it returns invalid when there IS an uppercase letter
  const hasUppercase = /[A-Z]/.test(password);
  if (hasUppercase) return { valid: false, message: "No uppercase letter" };

  // TODO: Add check for at least one number
  // TODO: Add check for at least one special character (!@#$%^&*)

  return { valid: true, message: "" };
}

// Correct — do not modify
export function isValidUsername(username) {
  if (!username || username.trim().length < 3) {
    return { valid: false, message: "Username must be at least 3 characters" };
  }
  if (username.trim().length > 20) {
    return { valid: false, message: "Username too long (max 20 chars)" };
  }
  return { valid: true, message: "" };
}
