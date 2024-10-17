import React from "react";
import { Link } from 'react-router-dom'; // Importamos Link

function Header({ links=[] }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="nav-link active me-3" to="/">Nexo Educativo</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            {links.map((link, index) => (
              <li className="nav-item me-3" key={index}>
                <Link className="nav-link active" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="fa-regular fa-circle-user"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
