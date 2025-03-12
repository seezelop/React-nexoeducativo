import React from 'react';
import AltaCurso from './AltaCurso';
import BajaCurso from './BajaCurso';
import ModificarCursoPreceptor from './ModificarCursoPreceptor';

function ABMCursoPreceptor() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Curso */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA CURSO</h3>
            <AltaCurso />
          </div>
        </section>

        {/* Sección Baja Curso */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA CURSO</h3>
            <BajaCurso />
          </div>
        </section>

        {/* Sección Modificación Curso */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN CURSO</h3>
            <ModificarCursoPreceptor />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMCursoPreceptor;