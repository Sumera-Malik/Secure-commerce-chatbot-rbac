import React, { useState } from "react";
import axios from "../api/axiosClient";

export default function MFAForm({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    // 🔒 Simple client-side OTP validation (matches backend)
    const trimmed = otp.trim();
    if (!/^[0-9]{6}$/.test(trimmed)) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/auth/verify-otp", { email, otp: trimmed });

      if (res.data.accessToken) {
        onVerified(res.data.accessToken);
      } else {
        setError("Unexpected server response. No token.");
      }
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors && Array.isArray(resp.errors)) {
        setError(resp.errors.map((e) => e.msg).join(" | "));
      } else {
        setError(
          resp?.message || "Invalid or expired OTP. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="box" onSubmit={handleVerify}>
      <h2>Enter OTP</h2>
      <p>
        OTP sent to: <strong>{email}</strong>
      </p>
      <input
        type="text"
        placeholder="6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify & Login"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
