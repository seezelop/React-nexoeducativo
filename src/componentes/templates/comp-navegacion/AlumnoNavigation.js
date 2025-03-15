import React from "react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";

const AlumnoNavigation = () => {
  return (
   <>
         <li className="nav-item me-3">
           <Link className="nav-link active">
             Novedades
           </Link>
         </li>
         <li className="nav-item me-3">
           <Link className="nav-link active">
             Notificacion privada
           </Link>
         </li>
         <li className="nav-item me-3">
           <Link className="nav-link active" to="/InformacionCurso">
             Informacion del curso
           </Link>
         </li>
         <li className="nav-item me-3">
           <Link className="nav-link active">
             Enviar mensaje privado
           </Link>
         </li>
         <li className="nav-item me-3">
           <Link className="nav-link active" to="/cantInasistenciasAlumno">
             Cantidad de faltas
           </Link>
         </li>
       </>
  );
};

export default AlumnoNavigation;

