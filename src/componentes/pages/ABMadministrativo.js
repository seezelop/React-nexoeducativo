import React from 'react';
import AltaAdministrativo from './AltaAdministrativo';
import BajaAdministrativo from './BajaAdministrativo';
import ModificarAdministrativo from './ModificarAdministrativo';

function ABMadministrativo() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Sección Alta Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA ADMINISTRATIVO</h3>
            <AltaAdministrativo />
          </div>
        </section>

        {/* Sección Baja Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA ADMINISTRATIVO</h3>
            <BajaAdministrativo />
          </div>
        </section>

        {/* Sección Modificación Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN ADMINISTRATIVO</h3>
            <ModificarAdministrativo />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMadministrativo;
