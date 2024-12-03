import React from 'react';
import AltaProfesor from './AltaProfesor';
import BajaProfesor from './BajaProfesor';
import ModificarProfesor from './ModificarProfesor';

function ABMProfesor() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Profesor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA PROFESOR</h3>
            <AltaProfesor />
          </div>
        </section>

        {/* Sección Baja Profesor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA PROFESOR</h3>
            <BajaProfesor />
          </div>
        </section>

        {/* Sección Modificación Profesor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN PROFESOR</h3>
            <ModificarProfesor />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMProfesor;
