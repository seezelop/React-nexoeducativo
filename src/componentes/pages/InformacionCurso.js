import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InformacionCurso() {
  const [hijos, setHijos] = useState([]); // Lista de hijos del padre
  const [hijoSeleccionado, setHijoSeleccionado] = useState(''); // Hijo seleccionado
  const [infoCurso, setInfoCurso] = useState(null); // Información del curso del hijo
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

  // useEffect para obtener la lista de hijos
  useEffect(() => {
    const obtenerHijos = async () => {
      try {
        const response = await api.get('/api/usuario/verHijos', { withCredentials: true });
        setHijos(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de hijos:', error);
        alert('Hubo un error al obtener la lista de hijos.');
      }
    };
    obtenerHijos();
  }, [api]); // Añadido 'api' como dependencia

  // useEffect para obtener la información del curso del hijo seleccionado
  useEffect(() => {
    if (!hijoSeleccionado) {
      setInfoCurso(null);
      return;
    }

    const obtenerInfoCurso = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/usuario/verInfoHijo/${hijoSeleccionado}`, { withCredentials: true });
        setInfoCurso(response.data);
      } catch (error) {
        console.error('Error al obtener la información del curso:', error);
        alert('Hubo un error al obtener la información del curso.');
      } finally {
        setLoading(false);
      }
    };
    obtenerInfoCurso();
  }, [hijoSeleccionado, api]); // Añadido 'api' como dependencia

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3"> {/* Tarjeta con fondo claro */}
            <h1 className="mb-4 text-center">Información del Curso</h1>
            <p className="mb-4 text-center">Seleccione un hijo para ver la información de su curso.</p>

            <div className="mb-4">
              <label htmlFor="hijoSeleccionado" className="form-label">Seleccione un hijo:</label>
              <select
                id="hijoSeleccionado"
                className="form-select text-dark"
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

            {loading && <p className="text-center">Cargando información...</p>}

            {infoCurso && infoCurso.length > 0 && (
              <div className="border p-3 rounded"> {/* Cuadro de información con bordes redondeados */}
                <h3 className="text-center">Notas</h3>
                {infoCurso[0].notas.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Materia</th>
                          <th>Tarea</th>
                          <th>Nota</th>
                          <th>Profesor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {infoCurso[0].notas.map((nota, index) => (
                          <tr key={index}>
                            <td>{nota.nombre}</td>
                            <td>{nota.descripcion}</td>
                            <td>{nota.nota}</td>
                            <td>{nota.nombreP} {nota.apellidoP}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center">No hay notas registradas.</p>
                )}

                <h3 className="text-center mt-4">Eventos</h3>
                {infoCurso[0].eventos.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Descripción</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {infoCurso[0].eventos.map((evento, index) => (
                          <tr key={index}>
                            <td>{evento.descripcion}</td>
                            <td>{evento.fecha}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center">No hay eventos registrados.</p>
                )}
              </div>
            )}

            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-primary" onClick={() => navigate(-1)}> {/* Botón estilizado */}
                Volver
              </button>
            </div>

          </div>
        </section>

      </div>
    </section>
  );
}

export default InformacionCurso;
