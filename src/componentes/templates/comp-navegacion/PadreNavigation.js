import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";

const PadreNavigation = () => {
  return (
    <>
          <li className="nav-item me-3">
            <Link className="nav-link active" to="/admin/chats">
              Novedades
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link active" >
              Notificacion Privada
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link active" to="/InformacionCurso">
              Informacion del curso
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link active" >
              Enviar Mensaje privado
            </Link>
          </li>
        </>
  );
};

export default PadreNavigation;

