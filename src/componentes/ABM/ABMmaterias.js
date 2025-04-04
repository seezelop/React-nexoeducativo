import React from 'react';
import AltaMateria from './AltaMateria';
import BajaMateria from './BajaMateria';
import ModificarMateria from './ModificarMateria';

function ABMMaterias() {
  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Sección Alta Materia */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA MATERIA</h3>
            <AltaMateria />
          </div>
        </section>

        {/* Sección Baja Materia */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA MATERIA</h3>
            <BajaMateria />
          </div>
        </section>

        {/* Sección Modificación Materia */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN MATERIA</h3>
            <ModificarMateria />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMMaterias;
