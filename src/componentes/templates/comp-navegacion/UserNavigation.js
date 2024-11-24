import React from "react";
import { Link } from "react-router-dom";

const UserNavigation = () => {
  return (
    <>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/queofrecemos">
          ¿Qué ofrecemos?
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/preguntasfrecuentes">
          Preguntas Frecuentes
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/SobreNosotros">
          Sobre nosotros
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Contacto">
          Contacto
        </Link>
      </li>
    </>
  );
};

export default UserNavigation;
