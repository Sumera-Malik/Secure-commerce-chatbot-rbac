import { useState } from "react";
import { register } from "../api/authApi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await register(form);
      setMsg("Registered successfully. You can now login.");
    } catch (err) {
      setMsg(
        err?.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="box">
      <h2>Create Account</h2>
      <p>Register as a customer or support agent to use the chatbot.</p>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={onChange}
          required
        />
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
        <select
          name="role"
          value={form.role}
          onChange={onChange}
          className="box-select"
        >
          <option value="customer">Customer</option>
          <option value="agent">Support Agent</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
