import React from "react";
import { Link } from "react-router-dom";

const JefeColegioNavigation = () => {
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
        <Link className="nav-link active" to="/ABMadministrativos">
          ABM administrativos
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/SeleccionarCurso">
          Seleccionar curso
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/SeleccionarProfesor">
          Seleccionar profesor
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/JefeColegio">
          Mi Perfil
        </Link>
      </li>
    </>
  );
};

export default JefeColegioNavigation;