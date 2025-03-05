import React from "react";
import { useNavigate } from "react-router-dom";  // Usamos el hook useNavigate para la redirección

const JefeColegioNavigation = () => {
  const navigate = useNavigate();  // Hook para redirigir a otra página

  const redirigirARenovar = () => {
    navigate('/renovar-membresia');  // Redirige a la ruta de renovación
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h1 className="mb-5">Bienvenido Jefe de Colegio</h1>
        <h3 className="mb-5">Panel para gestionar la membresía</h3>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-3" onClick={redirigirARenovar}>
            Gestionar Membresía
          </button>
        </div>
      </div>
    </section>
  );
};

export default JefeColegioNavigation;
