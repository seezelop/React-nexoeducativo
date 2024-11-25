import React from "react";

const Administrativo = () => {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1 className="mb-5">Bienvenido Administrativo</h1>
        <h3 className="mb-5">Panel de Gestión Administrativa</h3>
        
        {/* Botones centrados */}
        <div className="d-flex flex-column align-items-center gap-3"> {/* Usamos gap para espaciar los botones */}
          <button className="btn btn-primary" onClick={() => alert("Precio de cuota establecido")}>
            Establecer Precio Cuota
          </button>
          <button className="btn btn-info text-white" onClick={() => alert("Comunicación enviada")}>
            Enviar Comunicación
          </button>
          <button className="btn btn-warning text-dark" onClick={() => alert("Comunicación editada")}>
            Editar Comunicación
          </button>
          <button className="btn btn-success" onClick={() => alert("Información del pago subida")}>
            Subir Información del Pago
          </button>
        </div>
      </div>
    </section>
  );
};

export default Administrativo;

