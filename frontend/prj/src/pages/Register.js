import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    try {
      await apiFetch("/auth_register.php", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setOk("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 700);
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <section className="page">
      <h2>Register</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

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
          Password (min 6)
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn primary" type="submit">
          Create Account
        </button>

        {err && <p className="error-text">{err}</p>}
        {ok && <p className="success-text">{ok}</p>}

        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
