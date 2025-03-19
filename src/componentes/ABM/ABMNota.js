import React from 'react';
import ModificarNota from './ModificarNota';

function ABMNota() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
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
