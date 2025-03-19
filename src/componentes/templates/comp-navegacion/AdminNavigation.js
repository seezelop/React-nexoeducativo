import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMEscuelas">
          ABM escuelas
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/ABMJefeColegio">
          ABM Jefe Colegio
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/admin">
          Mi Perfil
        </Link>
      </li>
    </>
  );
};

export default AdminNavigation;
