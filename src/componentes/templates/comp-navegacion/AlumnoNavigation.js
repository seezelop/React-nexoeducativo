import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";

const AlumnoNavigation = () => {
  return (
    <>
      <UserNavigation /> {/* Renderiza la navegación de usuario */}
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Alumno">
          Mi perfil
        </Link>
      </li>
    </>
  );
};

export default AlumnoNavigation;

