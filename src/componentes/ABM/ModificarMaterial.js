import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModificarMaterial() {
  const [materiales, setMateriales] = useState([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/materiales/verMateriales')
      .then(response => setMateriales(response.data))
      .catch(error => console.error('Error al cargar materiales:', error));
  }, []);

  const manejarModificacion = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/materiales/modificar/${materialSeleccionado}`, {
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion
      });
      setRespuesta('Material modificado correctamente.');
      setNuevoTitulo('');
      setNuevaDescripcion('');
    } catch (error) {
      setRespuesta('Error al modificar el material.');
    }
  };

  return (
    <form onSubmit={manejarModificacion}>
      <div className="mb-3">
        <label className="form-label">Seleccionar Material</label>
        <select
          className="form-select"
          value={materialSeleccionado}
          onChange={(e) => setMaterialSeleccionado(e.target.value)}
          required
        >
          <option value="">Seleccione un material</option>
          {materiales.map((material) => (
            <option key={material.idMaterial} value={material.idMaterial}>
              {material.titulo}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-warning">Modificar</button>
    </form>
  );
}

export default ModificarMaterial;
