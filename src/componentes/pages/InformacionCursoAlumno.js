import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InformacionCursoAlumno() {
  const [infoCurso, setInfoCurso] = useState(null); // Información del curso del alumno
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();

  // Función para obtener la información del curso
  const obtenerInfoCurso = async () => {
    setLoading(true);
    setError(null); // Reiniciar el estado de error
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/verInfoAlumno', { withCredentials: true });
      setInfoCurso(response.data);
    } catch (error) {
      console.error('Error al obtener la información del curso:', error);
      setError('Hubo un error al obtener la información del curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Información del Curso</h1>
        <p className="mb-5">Aquí puedes ver la información de tu curso.</p>

        {/* Mostrar el botón si no se ha cargado la información */}
        {!infoCurso && !loading && (
          <button className="btn btn-primary" onClick={obtenerInfoCurso} disabled={loading}>
            Click aquí para ver mi información
          </button>
        )}

        {/* Mostrar mensaje de carga */}
        {loading && <p>Cargando información del curso...</p>}

        {/* Mostrar mensaje de error */}
        {error && <p className="text-danger">{error}</p>}

        {/* Mostrar la información del curso si está disponible */}
        {infoCurso && (
          <div className="border p-3 rounded mt-4">
            <h3>Información del Curso</h3>
            <p><strong>Curso:</strong> {infoCurso.curso}</p>
            <p><strong>División:</strong> {infoCurso.division}</p>
            <p><strong>Materias:</strong></p>
            <ul>
              {infoCurso.materias.map((materia, index) => (
                <li key={index}>
                  {materia.nombre} - {materia.profesor} ({materia.dia}, {materia.horaInicio} - {materia.horaFin})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón para volver atrás */}
        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </section>
  );
}

export default InformacionCursoAlumno;