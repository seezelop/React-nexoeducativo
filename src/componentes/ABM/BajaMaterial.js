import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function BajaMaterial() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState("");
  const [respuesta, setRespuesta] = useState("");

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
      const response = await api.get(
        `/api/usuario/selecMaterialProfesor?cursoIdCurso=${cursoSeleccionado}&materiaIdMateria=${materiaId}`,
        { withCredentials: true }
      );
      setMateriales(response.data);
    } catch (error) {
      console.error("Error al cargar los materiales:", error);
      setMateriales([]);
    }
  };

  const manejarBaja = async (e) => {
    e.preventDefault();
    if (!materialSeleccionado) {
      alert("Por favor selecciona un material para eliminar.");
      return;
    }

    //console.log('ID A ENVIAR: '+materialSeleccionado)

    try {
      await api.delete(
        `/api/usuario/borrarMaterial/${materialSeleccionado}`,
        { withCredentials: true }
      );
      setRespuesta("Material eliminado correctamente.");
      setMaterialSeleccionado("");
      cargarTareas(materiaSeleccionada); // Recargar lista de materiales
    } catch (error) {
      setRespuesta("Error al eliminar el material.");
      console.error("Error al eliminar el material:", error);
    }
  };

  return (
    <form onSubmit={manejarBaja}>
      {/* Selección de curso */}
      <div className="mb-3">
        <label htmlFor="cursoSeleccionado">Seleccionar Curso:</label>
        <select
          id="cursoSeleccionado"
          className="form-control"
          value={cursoSeleccionado}
          onChange={(e) => {
            setCursoSeleccionado(e.target.value);
            setMateriaSeleccionada("");
            setMateriales([]);
            if (e.target.value) cargarMaterias(e.target.value);
          }}
          required
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.idCurso} value={curso.idCurso} style={{ color: "black" }}>
              {curso.numero + " " + curso.division}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de materia */}
      <div className="mb-3">
        <label htmlFor="materiaSeleccionada">Seleccionar Materia:</label>
        <select
          id="materiaSeleccionada"
          className="form-control"
          value={materiaSeleccionada}
          onChange={(e) => {
            setMateriaSeleccionada(e.target.value);
            setMateriales([]);
            if (e.target.value) cargarTareas(e.target.value);
          }}
          required
          disabled={!cursoSeleccionado}
        >
          <option value="">Seleccione una materia</option>
          {materias.map((materia) => (
            <option key={materia.idMateria} value={materia.idMateria} style={{ color: "black" }}>
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de material */}
      <div className="mb-3">
        <label htmlFor="materialSeleccionado">Seleccionar Material:</label>
        <select
          id="materialSeleccionado"
          className="form-control"
          value={materialSeleccionado}
          onChange={(e) => setMaterialSeleccionado(e.target.value)}
          required
          disabled={!materiaSeleccionada}
        >
          <option value="">Seleccione un material</option>
          {materiales.map((material) => (
            <option key={material.idMaterial} value={material.idMaterial} style={{ color: "black" }}>
              {material.descripcion}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-danger">
        Eliminar Material
      </button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default BajaMaterial;
