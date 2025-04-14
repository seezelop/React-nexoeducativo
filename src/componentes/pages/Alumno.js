import React from 'react';
import { useNavigate } from 'react-router-dom';

function Alumno() {
  const navigate = useNavigate();

  const irAInformacionCurso = () => {
    navigate('/InformacionCursoAlumno');
  };

  const irAInasistencias = () => {
    navigate('/cantInasistenciasAlumno');
  };

  return (
    <section className="d-flex flex-column min-vh-100 text-white pt-5">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Bienvenido Alumno</h1>
        <p className="mb-5">Consulta el progreso académico y la asistencia en esta sección.</p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button className="btn btn-primary" onClick={irAInformacionCurso}>
            Información del Curso
          </button>
          <button className="btn btn-secondary" onClick={irAInasistencias}>
            Inasistencias
          </button>
        </div>
      </div>
    </section>
  );
}

export default Alumno;
