import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";

function AltaTarea() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  //const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Cargar los cursos del profesor al montar el componente
  useEffect(() => {
    //console.log("Componente AltaTarea montado, cargando cursos...");
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      //console.log("Haciendo petición a la API para cargar cursos...");
      const response = await api.get("/api/usuario/verCursoProfesor", {
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
      const response = await api.get(`/api/usuario/selecMateriaProfesor/${cursoId}`, {
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

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materiaSeleccionada) {
      alert("Por favor selecciona una materia.");
      return;
    }

    const formData = new FormData();
    const tarea = {
      //titulo: titulo, 
      descripcion: descripcion,
      //fechaEntrega: fechaEntrega,
      idMateria: materiaSeleccionada
    };
    
    formData.append("tarea", new Blob([JSON.stringify(tarea)], { type: "application/json" }));
    
    if (archivo) {
      formData.append("file", archivo);
    }

    try {
      await api.post(
        `/api/usuario/altaTarea/${cursoSeleccionado}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(`Tarea creada correctamente.`);
      //setTitulo("");
      setDescripcion("");
      setArchivo(null);
      setMateriaSeleccionada("");
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
  {/* Desplegable de Cursos */}
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

  {/* Descripción */}
  <div className="mb-3">
    <label htmlFor="descripcion" className="form-label">Descripción</label>
    <Form.Control
      as="textarea"
      id="descripcion"
      rows="3"
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      required
    />
  </div>

  {/* Subir Archivo */}
  <div className="mb-3">
    <label htmlFor="archivo" className="form-label">Subir Archivo (opcional)</label>
    <Form.Control
      type="file"
      id="archivo"
      onChange={handleFileChange}
    />
  </div>

  <Button type="submit" variant="success">Crear Tarea</Button>
</form>
  );
}

export default AltaTarea;