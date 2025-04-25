import React from "react";
import { Link } from "react-router-dom";

const PadreNavigation = () => {
  return (
    <>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/InformacionCurso">
          Información del curso
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/usuario/chats">
          Chats
        </Link>
      </li>

      <li className="nav-item me-3">
        <Link className="nav-link active" to="/infoPago">
          Información de pago
        </Link>
      </li>

      <li className="nav-item me-3">
        <Link className="nav-link active" to="/cantInasistenciasAlumno">
          Cantidad de faltas
        </Link>
      </li>

      <li className="nav-item me-3">
        <Link className="nav-link active" to="/RealizarPago">
          Pagar cuota
        </Link>
      </li>
      <li className="nav-item me-3">
        <Link className="nav-link active" to="/padre">
          Mi Perfil
        </Link>
      </li>
    </>
  );
};

export default PadreNavigation;
