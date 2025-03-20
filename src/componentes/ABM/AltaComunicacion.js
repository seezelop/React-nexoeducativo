import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AltaComunicacion() {
  const [mensaje, setMensaje] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [respuesta, setRespuesta] = useState('');

  // Cargar cursos desde el backend
  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/verCursoProfesor", {
          withCredentials: true,
        });
        setCursos(response.data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    cargarCursos();
  }, []);

  // Manejo del envío
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!cursoSeleccionado) {
      setRespuesta('Selecciona un curso antes de enviar el mensaje.');
      return;
    }

    try {
      await axios.post(`http://localhost:8080/novedades/${cursoSeleccionado}`,
        { contenido: mensaje },
        { withCredentials: true } 
      );

      setRespuesta('Mensaje enviado exitosamente.');
      setMensaje('');
      setCursoSeleccionado('');
    } catch (error) {
      setRespuesta('Error al enviar el mensaje.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Enviar Comunicación</h4>
        </div>
        <div className="card-body">
          <form onSubmit={manejarEnvio}>
            {/* Selección de curso */}
            <div className="mb-3">
              <label className="form-label">Seleccionar Curso</label>
              <select
                className="form-select"
                value={cursoSeleccionado}
                onChange={(e) => setCursoSeleccionado(e.target.value)}
                required
              >
                <option value="">Seleccione un curso</option>
                {cursos.map((curso) => (
                  <option key={curso.idCurso} value={curso.idCurso}>
                    {curso.numero}{curso.division}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows="3"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Enviar Comunicación</button>
          </form>

          {/* Mensaje de respuesta */}
          {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
        </div>
      </div>
    </div>
  );
}

export default AltaComunicacion;

