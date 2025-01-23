import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BajaMaterial() {
  const [materiales, setMateriales] = useState([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState('');
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/materiales/verMateriales')
      .then(response => setMateriales(response.data))
      .catch(error => console.error('Error al cargar materiales:', error));
  }, []);

  const manejarBaja = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/usuario/bajaMaterial/${materialSeleccionado}`);
      setRespuesta('Material eliminado correctamente.');
      setMaterialSeleccionado('');
    } catch (error) {
      setRespuesta('Error al eliminar el material.');
    }
  };

  return (
    <form onSubmit={manejarBaja}>
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

      <button type="submit" className="btn btn-danger">Eliminar Material</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default BajaMaterial;
