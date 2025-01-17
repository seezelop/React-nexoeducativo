import React from 'react';
import AltaTarea from './AltaTarea';
import BajaTarea from './BajaTarea';
import ModificarTarea from './ModificarTarea';

function ABMtarea() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Tarea */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA TAREA</h3>
            <AltaTarea />
          </div>
        </section>

        {/* Sección Baja Tarea */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA TAREA</h3>
            <BajaTarea />
          </div>
        </section>

        {/* Sección Modificación Tarea */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN TAREA</h3>
            <ModificarTarea />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMtarea;
