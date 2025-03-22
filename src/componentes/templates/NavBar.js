import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavigation from "./comp-navegacion/AdminNavigation"; // Navegación del admin
import JefeColegioNavigation from "./comp-navegacion/JefeColegioNavigation"; // Navegación del jefe colegio
import AdministrativoNavigation from "./comp-navegacion/AdministrativoNavigation"; // Navegación del administrativo
import PreceptorNavigation from "./comp-navegacion/PreceptorNavigation"; // Navegación del preceptor
import ProfesorNavigation from "./comp-navegacion/ProfesorNavigation"; // Navegación del profesor
import PadreNavigation from "./comp-navegacion/PadreNavigation"; // Navegación del padre
import AlumnoNavigation from "./comp-navegacion/AlumnoNavigation"; // Navegación del alumno
import UserNavigation from "./comp-navegacion/UserNavigation"; // Navegación del usuario generico
import { UserContext } from "../../context/UserContext"; // Contexto del usuario
import axios from "axios";
import Cookies from "universal-cookie";

const Header = () => {
  const { userRole, infoSesion, setUserRole, setInfoSesion } = useContext(UserContext); // Accede al contexto
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = async () => {
    try {
      // Opcional: Llama a una API para cerrar sesión en el backend
      await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });

      // Limpia el contexto del usuario
      setUserRole(null);
      setInfoSesion(null);
      cookies.remove("rol");

      // Redirige a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const renderNavigation = () => {
    switch (userRole) {
      case "super admin":
        return <AdminNavigation />;
      case "jefe colegio":
        return <JefeColegioNavigation />;
      case "administrativo":
        return <AdministrativoNavigation />;
      case "preceptor":
        return <PreceptorNavigation />;
      case "profesor":
        return <ProfesorNavigation />;
      case "padre":
        return <PadreNavigation />;
      case "alumno":
        return <AlumnoNavigation />;
      default:
        return <UserNavigation />;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        {/* Enlace al inicio */}
        <Link className="nav-link text-white me-3" to="/">
          Inicio
        </Link>

        {/* Botón para la versión móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Opciones de navegación */}
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            {renderNavigation()}
          </ul>

          {/* Botón de inicio de sesión o cierre de sesión */}
          <div id="icono-login" className="ms-auto">
            <ul className="navbar-nav">
              {infoSesion ? (
                <>
                  {/* Muestra el nombre del usuario */}
                  <li className="nav-item me-3 text-light">
                    <span className="nav-link">Hola, {infoSesion}</span>
                  </li>
                  {/* Botón de cierre de sesión */}
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-regular fa-circle-user fa-2x"></i> {/* Ícono del usuario */}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
