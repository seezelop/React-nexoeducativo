import React from "react";
import { useNavigate } from "react-router-dom";

const Administrativo = () => {
  const navigate = useNavigate();

  // Redirige a las diferentes secciones
  const redirectToPrecioCuota = () => {
    navigate("/EstablecerPrecioCuota");
  };

  const redirectToGestionesPago = () => {
    navigate("/gestiones-pago");
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h1 className="mb-5">Bienvenido Administrativo</h1>
        <h3 className="mb-5">Panel de Gestión Administrativa</h3>

        <div className="d-flex flex-column align-items-center gap-3">
          {/* Botón para establecer precio de cuota */}
          <button className="btn btn-primary" onClick={redirectToPrecioCuota}>
            Establecer Precio Cuota
          </button>
          {/* Botón para gestiones de pago */}
          <button className="btn btn-success" onClick={redirectToGestionesPago}>
           Informacion de Pago
          </button>
        </div>
      </div>
    </section>
  );
};

export default Administrativo;
