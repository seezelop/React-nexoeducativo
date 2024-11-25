import React from "react";

const JefeColegioNavigation = () => {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1 className="mb-5">Bienvenido Jefe de Colegio</h1>
        <h3 className="mb-5">Panel para gestionar la membresía</h3>
        
        {/* Botones centrados */}
        <div className="d-flex justify-content-center">
          <button className="btn btn-danger me-3" onClick={() => alert("Membresía cancelada")}>
            Cancelar Membresía
          </button>
          <button className="btn btn-success" onClick={() => alert("Membresía renovada")}>
            Renovar Membresía
          </button>
        </div>
      </div>
    </section>
  );
};

export default JefeColegioNavigation;


