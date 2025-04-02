import React from 'react';
import AltaPreceptor from './AltaPreceptor';
import BajaPreceptor from './BajaPreceptor';
import ModificarPreceptor from './ModificarPreceptor';

function ABMpreceptor() {
  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Preceptor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA PRECEPTOR</h3>
            <AltaPreceptor />
          </div>
        </section>

        {/* Sección Baja Preceptor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA PRECEPTOR</h3>
            <BajaPreceptor />
          </div>
        </section>

        {/* Sección Modificación Preceptor */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICACIÓN PRECEPTOR</h3>
            <ModificarPreceptor />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMpreceptor;
