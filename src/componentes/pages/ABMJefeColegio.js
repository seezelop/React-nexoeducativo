import React from 'react';
import AltaUsuario from './AltaUsuario';
import BajaUsuario from './BajaUsuario';
import ModificarUsuario from './ModificarUsuario';

function ABMJefeColegio() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Sección Alta Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA JEFE COLEGIO</h3>
            <AltaUsuario />
          </div>
        </section>

        {/* Sección Baja Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA JEFE COLEGIO</h3>
            <BajaUsuario />
          </div>
        </section>

        {/* Sección Modificación Jefe Colegio */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN JEFE COLEGIO</h3>
            <ModificarUsuario />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMJefeColegio;
