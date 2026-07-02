import React from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" }
];

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-brand" aria-label="Hariraj Venkatesan home">
          <span className="brand-signal" aria-hidden="true" />
          <span>Hariraj Venkatesan</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
    </>
  );
}
