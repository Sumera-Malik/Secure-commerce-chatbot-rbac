import { useState } from "react";
import { register } from "../api/authApi";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // simple email regex (not perfect, but ok for frontend)
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    // 🔒 Client-side validation (UX only – backend still enforces real security)
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // NOTE: This assumes your register() still accepts (email, password).
      // Backend will still do full validation for name/email/password.
      await register(email, password);
      setMsg("Registered successfully. You can now login.");
      setEmail("");
      setPassword("");
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors && Array.isArray(resp.errors)) {
        // express-validator style
        setError(resp.errors.map((e) => e.msg).join(" | "));
      } else {
        setError(resp?.message || "Registration failed.");
      }
    }
  };

  return (
    <form className="box" onSubmit={onSubmit}>
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>

      {error && <p className="error">{error}</p>}
      {msg && !error && <p>{msg}</p>}
    </form>
  );
}
