import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModificarEvento() {
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [respuesta, setRespuesta] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");

  useEffect(() => {
    cargarCursos();
  }, []);

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

  const cargarEventos = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/verEventos/${cursoId}`, {
        withCredentials: true,
      });
      setEventos(response.data);
    } catch (error) {
      console.error("Error al cargar los eventos:", error);
    }
  };

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    if (cursoId) {
      cargarEventos(cursoId);
    } else {
      setEventos([]);
    }
    setCursoSeleccionado(cursoId);
  };

  // Helper function to ensure date is in ISO format
  const formatDateForBackend = (dateString) => {
    if (!dateString) return undefined;
    
    // If it's already in ISO format (contains 'T'), return it
    if (dateString.includes('T')) {
      return dateString;
    }
    
    // Try to parse the date
    try {
      // Check if it's in DD-MM-YYYY HH:MM format
      if (dateString.match(/^\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}$/)) {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('-');
        const [hour, minute] = timePart.split(':');
        
        // Create ISO format: YYYY-MM-DDTHH:MM
        return `${year}-${month}-${day}T${hour}:${minute}`;
      }
      
      // If we can't determine the format, return as is and let backend handle
      return dateString;
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Format the date properly for the backend
    const formattedFecha = formatDateForBackend(fecha);
    
    // Log the date being sent for debugging
    console.log("Sending date to backend:", formattedFecha);
    
    const eventoData = {
      idEvento: parseInt(eventoSeleccionado),
      descripcion: descripcion || undefined,
      fecha: formattedFecha
    };

    // Remove undefined properties
    Object.keys(eventoData).forEach(key => 
      eventoData[key] === undefined && delete eventoData[key]
    );
    
    // Log the final payload for debugging
    console.log("Sending data to backend:", JSON.stringify(eventoData));

    try {
      const response = await axios.patch(
        "http://localhost:8080/api/usuario/modificarEvento",
        eventoData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setRespuesta('Evento editado exitosamente.');
      setDescripcion('');
      setFecha('');
      setEventoSeleccionado('');
      
      // Refresh events list
      if (cursoSeleccionado) {
        cargarEventos(cursoSeleccionado);
      }
    } catch (error) {
      console.error("Error completo:", error);
      if (error.response && error.response.data) {
        const mensajeError = typeof error.response.data === "string" 
          ? error.response.data 
          : error.response.data.message; 
        setRespuesta(mensajeError || "Error desconocido al editar el evento.");
      } else {
        setRespuesta("Error al conectar con el servidor. Verifique el formato de fecha (YYYY-MM-DDTHH:MM).");
      }
    }
  };

  const selectStyle = {
    color: "black",
    backgroundColor: "white"
  };

  const optionStyle = {
    color: "black"
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="mb-3">
        <label htmlFor="cursoSeleccionado" className="form-label">Seleccionar Curso:</label>
        <select
          id="cursoSeleccionado"
          className="form-control"
          value={cursoSeleccionado}
          onChange={handleCursoChange}
          style={selectStyle}
          required
        >
          <option value="" style={optionStyle}>Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.idCurso} value={curso.idCurso}>
              {curso.numero + " " + curso.division}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="eventoSeleccionado" className="form-label">Seleccionar Evento:</label>
        <select
          id="eventoSeleccionado"
          className="form-control"
          value={eventoSeleccionado}
          onChange={(e) => setEventoSeleccionado(e.target.value)}
          style={selectStyle}
          disabled={!cursoSeleccionado}
          required
        >
          <option value="" style={optionStyle}>Seleccione un evento</option>
          {eventos.map((evento) => (
            <option key={evento.idEvento} value={evento.idEvento}>
              {evento.descripcion}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="3"
          placeholder="Deje en blanco para mantener la descripción actual"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="datetime-local"
          className="form-control"
          value={fecha}
          onChange={(e) => {
            console.log("Fecha seleccionada (raw):", e.target.value);
            setFecha(e.target.value);
          }}
          placeholder="Deje en blanco para mantener la fecha actual"
        />
        <small className="form-text text-muted">
          El formato debe ser YYYY-MM-DDTHH:MM (Ejemplo: 2025-03-22T14:30)
        </small>
      </div>

      <button type="submit" className="btn btn-primary">Modificar Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default ModificarEvento;