import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";

const PadreNavigation = () => {
  return (
    <>
      <UserNavigation /> {/* Renderiza la navegación de usuario */}
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/Padre">
          Mi perfil
        </Link>
      </li>
    </>
  );
};

export default PadreNavigation;

