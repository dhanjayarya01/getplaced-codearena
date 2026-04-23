import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { isValidEmail, isValidPassword, isValidUsername } from "./validators";
import "./style.css";

function Field({ label, type, id, value, onChange, error }) {
  return (
    <div className={`field ${error ? "has-error" : value ? "has-success" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={`Enter ${label.toLowerCase()}`} />
      {error && <span className="error-msg">❌ {error}</span>}
      {!error && value && <span className="success-msg">✅ Looks good!</span>}
    </div>
  );
}

function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    const usernameResult = isValidUsername(form.username);
    if (!usernameResult.valid) newErrors.username = usernameResult.message;

    // TODO: Call isValidEmail and add to newErrors if invalid
    // Hint: isValidEmail returns a boolean, not an object
    // The function currently has a bug — fix validators.js first

    const passwordResult = isValidPassword(form.password);
    if (!passwordResult.valid) newErrors.password = passwordResult.message;

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Fix the validators to make this form work</p>

        {submitted ? (
          <div className="success-banner">
            🎉 Form submitted successfully! All fields are valid.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Field label="Username" type="text" id="username" value={form.username} onChange={handleChange("username")} error={errors.username} />
            <Field label="Email" type="email" id="email" value={form.email} onChange={handleChange("email")} error={errors.email} />
            <Field label="Password" type="password" id="password" value={form.password} onChange={handleChange("password")} error={errors.password} />
            <button type="submit" className="btn-submit">Create Account →</button>
          </form>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SignupForm />);
