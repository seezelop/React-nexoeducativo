import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function AltaEvento() {
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [tipoMensaje, setTipoMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');

  // Cargar cursos al montar el componente
    useEffect(() => {
      cargarCursos();
    }, []);

  // Función para cargar los cursos del profesor
    const cargarCursos = async () => {
      setCargando(true);
      setMensaje(null);
      
      try {
        const response = await api.get('/api/usuario/verCursoProfesor', {
          withCredentials: true
        });
        setCursos(response.data);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        setMensaje('Error al cargar los cursos. Por favor, intente nuevamente.');
        setTipoMensaje('danger');
        setCargando(false);
      }
    };

    const formatDateForBackend = (dateString) => {
      if (!dateString) return undefined;
    
      try {
        const date = new Date(dateString);
        
        // Extraer valores de la fecha
        const day = String(date.getDate()).padStart(2, '0');  
        const month = String(date.getMonth() + 1).padStart(2, '0');  
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Formato esperado por el backend: "dd-MM-yyyy HH:mm"
        return `${day}-${month}-${year} ${hours}:${minutes}`;
      } catch (e) {
        console.error("Error formateando fecha:", e);
        return dateString;
      }
    };
    

    const manejarEnvio = async (e) => {
      e.preventDefault();

      const fechaObj = formatDateForBackend(fecha);
    
      console.log('HORA que llega antes de castear '+JSON.stringify(fechaObj))
      console.log('HORA CASTEADA A ENVIAR: '+JSON.stringify(fechaObj))
      try {
        await api.post(`/api/usuario/altaEvento/${cursoSeleccionado}`, {
          cursoSeleccionado,
          descripcion,
          fecha:fechaObj,
        }, { withCredentials: true });
    
        setRespuesta('Evento creado exitosamente.');
        setDescripcion('');
        setFecha('');
        setCursoSeleccionado('');  // Resetear el curso seleccionado
      } catch (error) {
        setRespuesta('Error al crear el evento.');
      }
    };
    

  return (
    <form onSubmit={manejarEnvio}>
       <Form.Group className="mb-3">
                <Form.Label>Seleccionar Curso</Form.Label>
                <Form.Select
                  value={cursoSeleccionado}
                  onChange={(e) => setCursoSeleccionado(e.target.value)}
                  disabled={cargando}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.numero}{curso.division}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="3"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="datetime-local"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Crear Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default AltaEvento;
