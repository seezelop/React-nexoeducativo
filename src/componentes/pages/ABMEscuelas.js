import React from 'react';
import AltaEscuela from './AltaEscuela';
import BajaEscuela from './BajaEscuela';
import ModificacionEscuela from './ModificacionEscuela'; 

function ABMEscuelas() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">ABM de Escuelas</h1>

              {/* Sección Alta Escuela */}
              <h3 className="mb-4">ALTA ESCUELA</h3>
              <AltaEscuela />
              <hr />

              {/* Sección Baja Escuela */}
              <h3 className="mb-4">BAJA ESCUELA</h3>
              <BajaEscuela />
              <hr />

              {/* Sección Modificación Escuela */}
              <h3 className="mb-4">MODIFICAR ESCUELA</h3>
              <ModificacionEscuela /> {/* Componente independiente para la modificación */}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ABMEscuelas;
