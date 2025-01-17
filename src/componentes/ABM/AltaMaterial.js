import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AltaMaterial() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [respuesta, setRespuesta] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/materias/verMaterias')
      .then(response => setMaterias(response.data))
      .catch(error => console.error('Error al cargar materias:', error));
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    formData.append('materiaId', materiaSeleccionada);

    try {
      await axios.post('http://localhost:8080/api/materiales/alta', formData);
      setRespuesta('Material cargado correctamente.');
      setTitulo('');
      setDescripcion('');
      setArchivo(null);
      setMateriaSeleccionada('');
    } catch (error) {
      setRespuesta('Error al cargar el material.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

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
        <label className="form-label">Materia</label>
        <select
          className="form-select"
          value={materiaSeleccionada}
          onChange={(e) => setMateriaSeleccionada(e.target.value)}
          required
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
        <label className="form-label">Archivo</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setArchivo(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Subir Material</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default AltaMaterial;
