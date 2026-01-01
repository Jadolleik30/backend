import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-logo">
        <span className="logo-dot" />
        <span className="logo-text">Calorie Tracker</span>
      </div>

      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        ☰
      </label>

      <nav className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/features"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Features
        </NavLink>
        <NavLink
          to="/tracker"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Tracker
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
