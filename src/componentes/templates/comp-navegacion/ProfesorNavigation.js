import React from "react";
import { Link } from "react-router-dom";

const ProfesorNavigation = () => {
  return (
    <>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/usuario/chats">
          Enviar mensaje privado
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMtarea">
            ABM tarea
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMnota">
            ABM nota
        </Link>
        </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/altaComunicacion">
            Alta Comunicacion
        </Link>
      </li>
        <li className="nav-item me-3">
          <Link className="nav-link active" to="/ABMevento">
              ABM evento
          </Link>
        </li>
        <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMmaterial">
            ABM material
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Profesor">
            Mi perfil
        </Link>
      </li>
    </>
  );
};

export default ProfesorNavigation;