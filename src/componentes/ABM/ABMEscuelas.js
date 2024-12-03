import React from 'react';
import { useNavigate } from 'react-router-dom';
import AltaEscuela from './AltaEscuela';
import BajaEscuela from './BajaEscuela';
import ModificacionEscuela from './ModificacionEscuela';

function ABMEscuelas() {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA ESCUELA</h3>
            <AltaEscuela />
          </div>
        </section>

        {/* Sección Baja Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA ESCUELA</h3>
            <BajaEscuela />
          </div>
        </section>

        {/* Sección Modificación Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICAR ESCUELA</h3>
            <ModificacionEscuela />
          </div>
        </section>

        {/* Botón para redirigir a Consultar Escuelas */}
        <section className="col-md-8 mb-5">
          <button className="btn btn-primary" onClick={() => navigate('/consultar-escuelas')}>
            Consultar Escuelas
          </button>
        </section>
      </div>
    </section>
  );
}

export default ABMEscuelas;
