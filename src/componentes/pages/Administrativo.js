import React from "react";
import { useNavigate } from "react-router-dom";

const Administrativo = () => {
  const navigate = useNavigate();

  // Redirige al formulario para establecer el precio de la cuota
  const redirectToPrecioCuota = () => {
    navigate("/EstablecerPrecioCuota");
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h1 className="mb-5">Bienvenido Administrativo</h1>
        <h3 className="mb-5">Panel de Gestión Administrativa</h3>

        <div className="d-flex flex-column align-items-center gap-3">
          <button className="btn btn-primary" onClick={redirectToPrecioCuota}>
            Establecer Precio Cuota
          </button>

          <button
            className="btn btn-info text-white"
            onClick={() => alert("Comunicación enviada")}
          >
            Enviar Comunicación
          </button>

          <button
            className="btn btn-warning text-dark"
            onClick={() => alert("Comunicación editada")}
          >
            Editar Comunicación
          </button>

          <button
            className="btn btn-success"
            onClick={() => alert("Información del pago subida")}
          >
            Subir Información del Pago
          </button>
        </div>
      </div>
    </section>
  );
};

export default Administrativo;
