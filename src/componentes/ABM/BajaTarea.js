import React, { useState, useEffect } from 'react';
import axios from "axios";

function BajaTarea() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");
  const [tareas, setTareas] = useState(null);

  // Cargar los cursos del profesor al montar el componente
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

  const cargarMaterias = async (cursoId) => {
    try {
     // console.log(`Cargando materias para el curso ID: ${cursoId}...`);
      const response = await axios.get(`http://localhost:8080/api/usuario/selecMateriaProfesor/${cursoId}`, {
        withCredentials: true,
      });
     // console.log("Respuesta de materias recibida:", response.data);
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al cargar las materias:", error);
      setMaterias([]);
    }
  };

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
   // console.log(`Curso seleccionado cambiado a: ${cursoId}`);
    setCursoSeleccionado(cursoId);
    setMateriaSeleccionada(""); // Limpiar la materia seleccionada al cambiar el curso
    
    if (cursoId) {
      cargarMaterias(cursoId);
    } else {
      setMaterias([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materiaSeleccionada) {
      alert("Por favor selecciona una materia.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/usuario/borrarTarea`,
       // formData,
        {
          withCredentials: true
        }
      );

      alert(`Tarea borrada correctamente.`);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert(`Error al crear la tarea: ${error.response?.data?.message || error.message}`);
    }
  };

  // Estilos personalizados para asegurar que el texto sea visible
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

      <button type="submit" className="btn btn-success">
        Crear Tarea
      </button>
    </form>
  );
}


export default BajaTarea;
