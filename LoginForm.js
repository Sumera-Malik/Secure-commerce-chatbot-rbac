import React, { useState } from "react";
import axios from "../api/axiosClient";

export default function LoginForm({ onMfaRequired, onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data.mfaRequired) {
        onMfaRequired(email);
      } else if (res.data.accessToken) {
        onLoggedIn(res.data.accessToken);
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : "Continue"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
