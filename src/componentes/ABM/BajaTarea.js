import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function BajaTarea() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");
  const [tareas, setTareas] = useState([]);

  // Cargar los cursos del profesor al montar el componente
  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await api.get("/api/usuario/verCursoProfesor", {
        withCredentials: true,
      });
      setCursos(response.data);
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    }
  };

  const cargarMaterias = async (cursoId) => {
    try {
      const response = await api.get(`/api/usuario/selecMateriaProfesor/${cursoId}`, {
        withCredentials: true,
      });
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al cargar las materias:", error);
      setMaterias([]);
    }
  };

  // Usar useCallback para memorizar la función cargarTareas
  const cargarTareas = useCallback(async (materiaId) => {
    if (!materiaId) return;

    try {
      const response = await api.get(
        `/api/usuario/obtenerTareas?cursoIdCurso=${cursoSeleccionado}&idMateria=${materiaId}`,
        { withCredentials: true }
      );
      setTareas(response.data);
      setTareaSeleccionada(""); // Limpiar la tarea seleccionada al cargar nuevas tareas
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
      setTareas([]);
    }
  }, [cursoSeleccionado]); // Incluir cursoSeleccionado como dependencia ya que se usa dentro

  // Cargar tareas cuando cambia la materia seleccionada
  useEffect(() => {
    if (materiaSeleccionada && cursoSeleccionado) {
      cargarTareas(materiaSeleccionada);
    } else {
      setTareas([]);
    }
  }, [materiaSeleccionada, cursoSeleccionado, cargarTareas]);

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setMateriaSeleccionada(""); // Limpiar la materia seleccionada al cambiar el curso
    setTareaSeleccionada(""); // Limpiar la tarea seleccionada al cambiar el curso
    
    if (cursoId) {
      cargarMaterias(cursoId);
    } else {
      setMaterias([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tareaSeleccionada) {
      alert("Por favor selecciona una tarea para eliminar.");
      return;
    }

    try {
      // Enviamos el ID de la tarea a eliminar
      await api.delete(
        `/api/usuario/borrarTarea/${tareaSeleccionada}`, // Incluimos el ID en la URL
        {
          withCredentials: true
        }
      );

      alert(`Tarea eliminada correctamente.`);
      
      // Recargar la lista de tareas para reflejar el cambio
      if (materiaSeleccionada) {
        cargarTareas(materiaSeleccionada);
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert(`Error al eliminar la tarea: ${error.response?.data?.message || error.message}`);
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
    <form onSubmit={handleSubmit}>
      {/* Selección de Curso */}
      <div className="mb-3">
        <label htmlFor="curso" className="form-label">Selecciona un Curso</label>
        <select
          id="curso"
          className="form-control"
          value={cursoSeleccionado}
          onChange={handleCursoChange}
          required
          style={selectStyle}
        >
          <option value="" style={optionStyle}>Seleccione...</option>
          {cursos.map((curso) => (
            <option 
              key={curso.idCurso} 
              value={curso.idCurso}
              style={optionStyle} 
            >
              {curso.numero+ ""+curso.division}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de Materia */}
      <div className="mb-3">
        <label htmlFor="materia" className="form-label">Selecciona una Materia</label>
        <select
          id="materia"
          className="form-control"
          value={materiaSeleccionada}
          onChange={(e) => setMateriaSeleccionada(e.target.value)}
          required
          style={selectStyle} 
        >
          <option value="" style={optionStyle}>Seleccione...</option>
          {materias.map((materia) => (
            <option 
              key={materia.idMateria} 
              value={materia.idMateria}
              style={optionStyle} 
            >
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de Tarea */}
      <div className="mb-3">
        <label htmlFor="tarea" className="form-label">Selecciona una Tarea</label>
        <select
          id="tarea"
          className="form-control"
          value={tareaSeleccionada}
          onChange={(e) => setTareaSeleccionada(e.target.value)}
          required
          style={selectStyle}
          disabled={!materiaSeleccionada}
        >
          <option value="" style={optionStyle}>Seleccione...</option>
          {tareas.map((tarea) => (
            <option 
              key={tarea.idTarea} 
              value={tarea.idTarea}
              style={optionStyle} 
            >
              {tarea.descripcion}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-success">
        Eliminar Tarea
      </button>
    </form>
  );
}

export default BajaTarea;