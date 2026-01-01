import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../api/client";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const data = await apiFetch("/auth_login.php", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setToken(data.token);
      navigate("/tracker");
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <section className="page">
      <h2>Login</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn primary" type="submit">
          Login
        </button>

        {err && <p className="error-text">{err}</p>}

        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
}
