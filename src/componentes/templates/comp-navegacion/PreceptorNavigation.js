import React from "react";
import { Link } from "react-router-dom";

const PreceptorNavigation = () => {
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
        <Link className="nav-link active" to="/GestionarAsistenciaAlumno">
            Asistencia alumno
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/GestionarAsistenciaProfesor">
            Asistencia profesor
        </Link>
        </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Preceptor">
            Mi perfil
        </Link>
      </li>
    </>
  );
};

export default PreceptorNavigation;