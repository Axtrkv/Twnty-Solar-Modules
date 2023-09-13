import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <span className="logo">Solar™</span>
      <span className="links">
        <Link to="/">☰ Products</Link>
      </span>
    </div>
  );
}
