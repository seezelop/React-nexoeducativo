import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InformacionCursoAlumno() {
  const [infoCurso, setInfoCurso] = useState(null); // Información del curso del alumno
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerInfoCurso = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/usuario/verInfoAlumno`, { withCredentials: true });
        setInfoCurso(response.data); // Guardamos la información correctamente
      } catch (error) {
        console.error('Error al obtener la información del alumno:', error);
        setError('Hubo un error al obtener la información.');
      } finally {
        setLoading(false);
      }
    };
    obtenerInfoCurso();
  }, []);

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Información del Curso</h1>
        
        {loading && <p>Cargando información...</p>}
        {error && <p className="text-danger">{error}</p>}

        {infoCurso && infoCurso.length > 0 && (
          <div className="border p-3 rounded">
            <h3>Notas</h3>
            {infoCurso[0].notas && infoCurso[0].notas.length > 0 ? (
              <ul>
                {infoCurso[0].notas.map((nota, index) => (
                  <li key={index}>
                    <strong>Materia:</strong> {nota.nombre} <br />
                    <strong>Tarea:</strong> {nota.descripcion} <br />
                    <strong>Nota:</strong> {nota.nota} <br />
                    <strong>Profesor:</strong> {nota.nombreP} {nota.apellidoP}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay notas registradas.</p>
            )}

            <h3>Eventos</h3>
            {infoCurso[0].eventos && infoCurso[0].eventos.length > 0 ? (
              <ul>
                {infoCurso[0].eventos.map((evento, index) => (
                  <li key={index}>
                    <strong>Descripción:</strong> {evento.descripcion} <br />
                    <strong>Fecha:</strong> {evento.fecha}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay eventos registrados.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default InformacionCursoAlumno;