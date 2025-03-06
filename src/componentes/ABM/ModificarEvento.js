import React, { useState, useEffect  } from 'react';
import axios from 'axios';

function ModificarEvento() {
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");

  useEffect(() => {
      //console.log("Componente AltaTarea montado, cargando cursos...");
      cargarCursos();
    }, []);

    const cargarCursos = async () => {
      try {
        //console.log("Haciendo petición a la API para cargar cursos...");
        const response = await axios.get("http://localhost:8080/api/usuario/verCursoProfesor", {
          withCredentials: true,
        });
       // console.log("Respuesta de cursos recibida:", response.data);
        setCursos(response.data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    const cargarEventos = async (cursoId) => {
      try {
        //console.log("Haciendo petición a la API para cargar cursos...");
        const response = await axios.get(`http://localhost:8080/api/usuario/verEventos/${cursoId}`, {
          withCredentials: true,
        });
       // console.log("Respuesta de cursos recibida:", response.data);
        setEventos(response.data);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    };


    const handleCursoChange = (e) => {
      const cursoId = e.target.value;
     // console.log(`Curso seleccionado cambiado a: ${cursoId}`);
     if(cursoId){
      cargarEventos(cursoId)
     }else{
      setEventos([])
     }
      setCursoSeleccionado(cursoId);
    };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Crear un objeto que coincida con el formato que funciona en Postman
    const eventoData = {
      idEvento: parseInt(eventoSeleccionado),
      descripcion: descripcion
    };

    // Si la fecha está presente, añadirla al objeto
    if (fecha) {
      eventoData.fecha = fecha;
    }

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
    } catch (error) {
      console.error("Error completo:", error);
      setRespuesta(`Error al editar el evento: ${error.response ? error.response.data : error.message}`);
    }
  };

  const selectStyle = {
    color: "black", // Forzar color negro para el texto
    backgroundColor: "white" // Asegurar fondo blanco para contraste
  };

  const optionStyle = {
    color: "black" // Asegurar que las opciones tengan texto negro
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
      {eventos.map((curso) => (
        <option key={curso.idEvento} value={curso.idEvento}>
          {curso.descripcion}
        </option>
      ))}
    </select>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="3"
          //required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          //required
        />
      </div>

      <button type="submit" className="btn btn-primary">Modificar Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}


export default ModificarEvento;
