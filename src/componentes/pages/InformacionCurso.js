import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InformacionCurso() {
  const [hijos, setHijos] = useState([]); // Lista de hijos del padre
  const [hijoSeleccionado, setHijoSeleccionado] = useState(''); // Hijo seleccionado
  const [infoCurso, setInfoCurso] = useState(null); // Información del curso del hijo
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Obtener la lista de hijos al cargar el componente
  useEffect(() => {
    const obtenerHijos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/verHijos', { withCredentials: true });
        setHijos(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de hijos:', error);
        alert('Hubo un error al obtener la lista de hijos.');
      }
    };
    obtenerHijos();
  }, []);

  // Obtener la información del curso del hijo seleccionado automáticamente
  useEffect(() => {
    if (!hijoSeleccionado) {
      setInfoCurso(null);
      return;
    }

    const obtenerInfoCurso = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/usuario/verInfoHijo/${hijoSeleccionado}`, { withCredentials: true });
        setInfoCurso(response.data);
      } catch (error) {
        console.error('Error al obtener la información del curso:', error);
        alert('Hubo un error al obtener la información del curso.');
      } finally {
        setLoading(false);
      }
    };
    obtenerInfoCurso();
  }, [hijoSeleccionado]);

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Información del Curso</h1>
        <p className="mb-5">Seleccione un hijo para ver la información de su curso.</p>

        <div className="mb-4">
          <label htmlFor="hijoSeleccionado" className="form-label">Seleccione un hijo:</label>
          <select
            id="hijoSeleccionado"
            className="form-select"
            value={hijoSeleccionado}
            onChange={(e) => setHijoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un hijo</option>
            {hijos.map((hijo) => (
              <option key={hijo.idUsuario} value={hijo.idUsuario}>
                {hijo.nombre} {hijo.apellido}
              </option>
            ))}
          </select>
        </div>

        {loading && <p>Cargando información...</p>}

        {infoCurso && infoCurso.length > 0 && (
          <div className="border p-3 rounded">
            <h3>Notas</h3>
            {infoCurso[0].notas.length > 0 ? (
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
            {infoCurso[0].eventos.length > 0 ? (
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

        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </section>
  );
}

export default InformacionCurso;