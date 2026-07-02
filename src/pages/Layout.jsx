import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HouseDoorFill } from "react-bootstrap-icons";

const navItems = [
  { label: "Home", to: "/", icon: HouseDoorFill, end: true, className: "nav-home-link" },
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
              end={item.end}
              className={({ isActive }) => [
                "nav-link",
                item.className,
                isActive ? "active" : null
              ].filter(Boolean).join(" ")}
            >
              {item.icon && <item.icon className="nav-icon home-nav-icon" aria-hidden="true" focusable="false" />}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
    </>
  );
}
