import React from 'react';
import AltaEvento from './AltaEvento';
import BajaEvento from './BajaEvento';
import ModificarEvento from './ModificarEvento';

function ABMEvento() {
  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Alta de Evento */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA EVENTO</h3>
            <AltaEvento />
          </div>
        </section>

        {/* Baja de Evento */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA EVENTO</h3>
            <BajaEvento />
          </div>
        </section>

        {/* Modificación de Evento */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICAR EVENTO</h3>
            <ModificarEvento />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMEvento;
