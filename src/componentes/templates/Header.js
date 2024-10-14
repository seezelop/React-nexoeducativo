import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Importamos Link

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="nav-link active" to="/App">Navbar</Link>
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
              <li className="nav-item">
                <a className="nav-link active" href="">Que ofrecemos?</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">Preguntas Frecuentes</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/SobreNosotros">Sobre nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Contacto" >Contacto</Link>
              </li>
              
            </ul>

             {/* Ícono de inicio de sesión al final del navbar */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {/* Cambiamos <a> por Link para navegar sin recargar la página */}
                <Link className="nav-link" to="/login">
                  <i className="fa-regular fa-circle-user"></i> {/* Icono de usuario */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;