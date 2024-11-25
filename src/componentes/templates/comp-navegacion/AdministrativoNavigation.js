import React from "react";
import { Link } from "react-router-dom";

const AdministrativoNavigation = () => {
  return (
    <>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/contacto">
          Contacto
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/admin/chats">
          Chats
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMmaterias">
            ABM materias
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMprofesor">
            ABM profesor
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMpadre">
         ABM padre
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMalumno">
            ABM alumno
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMcurso">
            ABM curso
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMpreceptor">
            ABM preceptor
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Administrativo">
            Mi perfil
        </Link>
      </li>
    </>
  );
};

export default AdministrativoNavigation;