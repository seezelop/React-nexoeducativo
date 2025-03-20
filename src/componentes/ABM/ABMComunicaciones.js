import React from 'react';
import AltaComunicacion from './AltaComunicacion';
import BajaComunicacion from './BajaComunicacion';
import ModificarComunicacion from './ModificarComunicacion';

function ABMComunicaciones() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Sección Alta Comunicación */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA COMUNICACIÓN</h3>
            <AltaComunicacion />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMComunicaciones;
