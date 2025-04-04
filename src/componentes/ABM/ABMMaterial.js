import React from 'react';
import AltaMaterial from './AltaMaterial';
import BajaMaterial from './BajaMaterial';
import ModificarMaterial from './ModificarMaterial';

function ABMMaterial() {
  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">

        {/* Alta de Material */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA MATERIAL</h3>
            <AltaMaterial />
          </div>
        </section>

        {/* Baja de Material */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA MATERIAL</h3>
            <BajaMaterial />
          </div>
        </section>

        {/* Modificación de Material */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICAR MATERIAL</h3>
            <ModificarMaterial />
          </div>
        </section>

      </div>
    </section>
  );
}

export default ABMMaterial;
