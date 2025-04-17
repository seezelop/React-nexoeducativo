import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function ModificarNota() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [tareas, setTareas] = useState([]);
  const [idTarea, setIdTarea] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  //const [id_usuario, setIdUsuario] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState("");
  const [calificacion, setCalificacion] = useState("");

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await api.get(
        "/api/usuario/verCursoProfesor",
        { withCredentials: true }
      );
      setCursos(response.data);
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    }
  };

  const cargarMaterias = async (cursoId) => {
    if (!cursoId) return;
    
    try {
      const response = await api.get(
        `/api/usuario/selecMateriaProfesor/${cursoId}`,
        { withCredentials: true }
      );
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al cargar las materias:", error);
      setMaterias([]);
    }
  };

  const cargarTareas = async (materiaId) => {
    if (!materiaId) return;

    try {
      //console.log("Cargando tareas para materia:", materiaId);
      const response = await api.get(
        `/api/usuario/obtenerTareas?cursoIdCurso=${cursoSeleccionado}&idMateria=${materiaId}`,
        { withCredentials: true }
      );
      setTareas(response.data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
      setTareas([]);
    }
  };

  
  const cargarAlumnos = async (cursoId) => {
    if (!cursoId) return;

    try {
      //console.log("Cargando tareas para materia:", materiaId);
      const response = await api.get(
        `/api/usuario/verAlumnosCurso/${cursoId}`,
        { withCredentials: true }
      );
      console.log(response.data)
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error al cargar los alumnos:", error);
      setAlumnos([]);
    }
  };

  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setMateriaSeleccionada("");
    setTareas([]);

    if (cursoId) {
      cargarMaterias(cursoId);
      cargarAlumnos(cursoId)
    } else {
      setMaterias([]);
    }
  };

  const handleMateriaChange = (e) => {
    const materiaId = e.target.value;
    setMateriaSeleccionada(materiaId);
    setTareas([]);

    if (materiaId) {
      cargarTareas(materiaId);
    }
  };

  const handleAlumnosChange = (e) => {
    const usuario = e.target.value;
    setAlumnoSeleccionado(usuario);
    console.log('alumno handle: '+usuario)
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
      idAlumno: alumnoSeleccionado,
      calificacion: calificacion,
    };

    formData.append(
      "tarea",
      new Blob([JSON.stringify(tarea)], { type: "application/json" })
    );

    console.log('lo que se envia al backend '+JSON.stringify(tarea))

    try {
      await api.patch(
        `/api/usuario/modificarTarea/${idTarea}`,
        formData,
        {
          withCredentials: true,
          //headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Tarea modificada correctamente.");
      setIdTarea("");
      setCalificacion("");
    } catch (error) {
      console.error("Error al modificar la tarea:", error);
      alert(`Error al modificar la tarea: ${error.response?.data?.message || error.message}`);
    }
  };

  //console.log('curso seleccionado: ' + cursoSeleccionado);
  console.log('alumno seleccionado: '+alumnoSeleccionado)
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
          style={{ color: "black" }}
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
        <label htmlFor="materiaSeleccionada">Seleccionar Materia:</label>
        <select
          id="materiaSeleccionada"
          className="form-control"
          value={materiaSeleccionada}
          onChange={handleMateriaChange}
          required
          style={{ color: "black" }}
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
          style={{ color: "black" }}
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
        <label htmlFor="alumnoSeleccionado">Seleccionar Alumno:</label>
        <select
          id="alumnoSeleccionado"
          className="form-control"
          value={alumnoSeleccionado}
          onChange={handleAlumnosChange}
          required
          style={{ color: "black" }}
          disabled={!cursoSeleccionado}
        >
          <option value="">Seleccione un Alumno </option>
          {alumnos.map((materia) => (
            <option key={materia.id_usuario} value={materia.id_usuario}>
              {materia.nombre+" "+materia.apellido}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="calificacion">Nota</label>
        <Form.Control
          as="input"
          id="calificacion"
         // rows="3"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          required
        />
      </div>

      <Button type="submit" variant="success">
        Modificar Nota
      </Button>
    </form>
  );
}


export default ModificarNota;
