import React from 'react';

function Alumno() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Bienvenido Alumno</h1>
        <p className="mb-5">Consulta el progreso académico y la asistencia en esta sección.</p>

        {/* Botones adicionales */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button className="btn btn-primary">Novedades</button>
          <button className="btn btn-secondary">Notificación Privada</button>
          <button className="btn btn-info">Información del Curso</button>
          <button className="btn btn-warning">Enviar Mensaje Privado</button>
          <button className="btn btn-danger">Cantidad de Faltas</button>
        </div>
      </div>
      
    </section>
  );
}

export default Alumno;
