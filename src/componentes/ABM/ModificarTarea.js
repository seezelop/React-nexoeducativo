import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function ModificarTarea() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [tareas, setTareas] = useState([]);
   const [materias, setMaterias] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [idTarea, setIdTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/usuario/verCursoProfesor",
        { withCredentials: true }
      );
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

  const cargarTareas = async () => {
    if (!cursoSeleccionado || !materiaSeleccionada) {
      setMensaje("Por favor selecciona tanto un curso como una materia.");
      setTareas([]); // Asegurarte de que las tareas estén vacías
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/obtenerTareas?cursoIdCurso=${cursoSeleccionado}&idMateria=${materiaSeleccionada}`,
        { withCredentials: true }
      );
      if (response.data.length === 0) {
        console.log("No hay tareas disponibles para la materia seleccionada. Curso seleecionado y materia:"+cursoSeleccionado+" "+materiaSeleccionada);
      } else {
        setMensaje(""); // Limpiar el mensaje
      }
      setTareas(response.data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
      setTareas([]);
    }
  };


  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setTareas([]); // Limpiar tareas al cambiar el curso
    if (cursoId) {
      cargarMaterias(cursoId);
    }

    cargarTareas();
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idTarea) {
      alert("Por favor selecciona una tarea para modificar.");
      return;
    }

    const formData = new FormData();
    const tarea = {
      idCurso: cursoSeleccionado,
      idTarea: idTarea,
      calificacion: calificacion,
    };

    formData.append(
      "tarea",
      new Blob([JSON.stringify(tarea)], { type: "application/json" })
    );

    if (descripcion) {
      formData.append("descripcion", descripcion);
    }

    if (archivo) {
      formData.append("archivo", archivo);
    }

    try {
      await axios.patch(
        `http://localhost:8080/api/usuario/modificarTarea/${idTarea}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(`Tarea modificada correctamente.`);
      setDescripcion("");
      setArchivo(null);
      setIdTarea("");
      setCalificacion("");
    } catch (error) {
      console.error("Error al modificar la tarea:", error);
      alert(
        `Error al modificar la tarea: ${
          error.response?.data?.message || error.message
        }`
      );
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
      <div className="mb-3">
        <label htmlFor="cursoSeleccionado">Seleccionar Curso:</label>
        <select
          id="cursoSeleccionado"
          className="form-control"
          value={cursoSeleccionado}
          onChange={handleCursoChange}
          style={selectStyle}
          required
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.idCurso} value={curso.idCurso}>
              {curso.numero + " " + curso.division}
            </option>
          ))}
        </select>
      </div>

      {/* Desplegable de Materias */}
  <div className="mb-3">
    <label htmlFor="materiaSeleccionada" className="form-label">Seleccionar Materia:</label>
    <select
      id="materiaSeleccionada"
       className="form-control"
      value={materiaSeleccionada}
      onChange={(e) => setMateriaSeleccionada(e.target.value)}
      required
      style={selectStyle} 
      disabled={!cursoSeleccionado}
    >
      <option value="">Seleccione una materia</option>
      {materias.map((materia) => (
        <option key={materia.idMateria} value={materia.idMateria}>
          {materia.nombre}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-3">
        <label htmlFor="idTarea">Seleccionar Tarea:</label>
        <select
          id="idTarea"
          className="form-control"
          value={idTarea}
          onChange={(e) => setIdTarea(e.target.value)}
          required
          style={selectStyle}
          disabled={!materiaSeleccionada}
        >
          <option value="">Seleccione una tarea</option>
          {tareas.map((tarea) => (
            <option key={tarea.idTarea} value={tarea.idTarea}>
              {tarea.descripcion}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion">Descripción</label>
        <Form.Control
          as="textarea"
          id="descripcion"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="calificacion">Calificacion</label>
        <Form.Control
          as="text"
          id="calificacion"
          rows="3"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="archivo">Subir Archivo (opcional)</label>
        <Form.Control type="file" id="archivo" onChange={handleFileChange} />
      </div>

      <Button type="submit" variant="success">
        Modificar Tarea
      </Button>
    </form>
  );
}

export default ModificarTarea;

