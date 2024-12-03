import React from 'react';
import AltaAlumno from './AltaAlumno';
import BajaAlumno from './BajaAlumno';
import ModificarAlumno from './ModificarAlumno';

function ABMalumno() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Alumno */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA ALUMNO</h3>
            <AltaAlumno />
          </div>
        </section>

        {/* Sección Baja Alumno */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA ALUMNO</h3>
            <BajaAlumno />
          </div>
        </section>

        {/* Sección Modificación Alumno */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN ALUMNO</h3>
            <ModificarAlumno />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMalumno;
