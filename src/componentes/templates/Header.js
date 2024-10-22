import React, { useContext } from "react";
import { Link } from 'react-router-dom'; // Importamos Link
import { UserContext } from '../../context/UserContext';  // Importa el contexto

const Header = () => {
  const { userRole } = useContext(UserContext); // Accede al rol del usuario desde el contexto

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="nav-link active me-3" to="/">Inicio</Link> {/* Añadido me-3 para margen derecho */}
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
            {/* Opciones solo para usuarios admin */}
            {userRole === 'admin' ? (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/admin/cursos">Cursos</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/admin/eventos">Eventos</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/admin/material">Material</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/admin/chats">Chats</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/ABMEscuelas">ABM escuelas</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/ABMJefeColegio">ABM Jefe Colegio</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/queofrecemos">¿Qué ofrecemos?</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/preguntasfrecuentes">Preguntas Frecuentes</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/SobreNosotros">Sobre nosotros</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link active" to="/Contacto">Contacto</Link>
                </li>
              </>
            )}
          </ul>

          {/* Ícono de inicio de sesión al final del navbar */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="fa-regular fa-circle-user fa-2x"></i> {/* Icono de usuario */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
