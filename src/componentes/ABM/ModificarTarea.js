import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function ModificarTarea() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [tareas, setTareas] = useState([]);
  const [idTarea, setIdTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
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

  const cargarTareas = async (cursoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/obtenerTareas?cursoIdCurso=${cursoId}`,
        { withCredentials: true }
      );
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
      cargarTareas(cursoId);
    }
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="cursoSeleccionado">Seleccionar Curso:</label>
        <select
          id="cursoSeleccionado"
          className="form-control"
          value={cursoSeleccionado}
          onChange={handleCursoChange}
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

      <div className="mb-3">
        <label htmlFor="idTarea">Seleccionar Tarea:</label>
        <select
          id="idTarea"
          className="form-control"
          value={idTarea}
          onChange={(e) => setIdTarea(e.target.value)}
          required
          disabled={!cursoSeleccionado}
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

