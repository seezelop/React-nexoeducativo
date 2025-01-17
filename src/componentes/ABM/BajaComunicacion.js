import React, { useState } from 'react';
import axios from 'axios';

function BajaComunicacion() {
  const [comunicacionId, setComunicacionId] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarBaja = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/comunicaciones/baja/${comunicacionId}`);
      setRespuesta('Comunicación eliminada correctamente.');
      setComunicacionId('');
    } catch (error) {
      setRespuesta('Error al eliminar la comunicación.');
    }
  };

  return (
    <form onSubmit={manejarBaja}>
      <div className="mb-3">
        <label className="form-label">ID de la Comunicación</label>
        <input
          type="text"
          className="form-control"
          value={comunicacionId}
          onChange={(e) => setComunicacionId(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-danger">Eliminar Comunicación</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default BajaComunicacion;
