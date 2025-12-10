import { useState } from "react";
import { login, verifyOtp } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login: doLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [otpPhase, setOtpPhase] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await login(form);
      if (data.mfaRequired) {
        setOtpPhase(true);
        setEmailForOtp(form.email);
        setMsg("OTP sent. Check email / server console.");
      } else {
        doLogin(data.accessToken);
        setMsg("Logged in.");
      }
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed.");
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await verifyOtp({ email: emailForOtp, otp });
      doLogin(data.accessToken);
      setMsg("Successfully logged in.");
    } catch (err) {
      setMsg(err?.response?.data?.message || "OTP invalid.");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <p>Enter your credentials to access the secure chatbot.</p>
      {!otpPhase ? (
        <form onSubmit={submitLogin}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={submitOtp}>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {msg && <p>{msg}</p>}
    </div>
  );
}
