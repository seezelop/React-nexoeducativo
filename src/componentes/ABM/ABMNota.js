import React from 'react';
import AltaNota from './AltaNota';
import BajaNota from './BajaNota';
import ModificarNota from './ModificarNota';

function ABMNota() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Sección Alta Nota */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA NOTA</h3>
            <AltaNota />
          </div>
        </section>

        {/* Sección Baja Nota */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA NOTA</h3>
            <BajaNota />
          </div>
        </section>

        {/* Sección Modificar Nota */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICAR NOTA</h3>
            <ModificarNota />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMNota;
