import React from 'react';
import AltaUsuario from './AltaUsuario';
import BajaUsuario from './BajaUsuario';
import ModificarUsuario from './ModificarUsuario'; 

function ABMJefeColegio() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">Gestión de Jefes de Colegio</h1>

              {/* Sección Alta Jefe Colegio */}
              <h3 className="mb-4">ALTA JEFE COLEGIO</h3>
              <AltaUsuario />
              <hr />

              {/* Sección Baja Jefe Colegio */}
              <h3 className="mb-4">BAJA JEFE COLEGIO</h3>
              <BajaUsuario />
              <hr />

              {/* Sección Modificación Jefe Colegio */}
              <h3 className="mb-4">MODIFICACIÓN JEFE COLEGIO</h3>
              <ModificarUsuario /> {/* Componente independiente para la modificación */}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ABMJefeColegio;
