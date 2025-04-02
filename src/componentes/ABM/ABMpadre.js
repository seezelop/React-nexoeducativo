import React from 'react';
import AltaPadre from './AltaPadre';
import BajaPadre from './BajaPadre';
import ModificarPadre from './ModificarPadre';

function ABMPadre() {
  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Padre */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA PADRE</h3>
            <AltaPadre />
          </div>
        </section>

        {/* Sección Baja Padre */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA PADRE</h3>
            <BajaPadre />
          </div>
        </section>

        {/* Sección Modificación Padre */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN PADRE</h3>
            <ModificarPadre />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMPadre;
