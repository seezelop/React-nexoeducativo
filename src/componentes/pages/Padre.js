import React from 'react';
import { useNavigate } from 'react-router-dom';

function Padre() {
  const navigate = useNavigate();

  const irARealizarPago = () => {
    navigate('/RealizarPago');
  };

  const irAHistorialPagos = () => {
    navigate('/HistorialPagos');
  };

  const irAInasistencias = () => {
    navigate('/cantInasistencias');
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Bienvenido Padre</h1>
        <p className="mb-5">Consulta el progreso académico y la asistencia de tus hijos en esta sección.</p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
        
          <button className="btn btn-danger" onClick={irAInasistencias}>Cantidad de Faltas</button>
          <button className="btn btn-success" onClick={irAHistorialPagos}>Historial de Pagos</button>
          <button className="btn btn-info" onClick={irARealizarPago}>Realizar Pagos</button>
        </div>
      </div>
    </section>
  );
}

export default Padre;