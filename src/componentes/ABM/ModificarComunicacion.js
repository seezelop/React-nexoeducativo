import React, { useState } from 'react';
import axios from 'axios';

function ModificarComunicacion() {
  const [comunicacionId, setComunicacionId] = useState('');
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarModificacion = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/comunicaciones/modificar/${comunicacionId}`, {
        mensaje: nuevoMensaje
      });

      setRespuesta('Comunicación modificada correctamente.');
      setComunicacionId('');
      setNuevoMensaje('');
    } catch (error) {
      setRespuesta('Error al modificar la comunicación.');
    }
  };

  return (
    <form onSubmit={manejarModificacion}>
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

      <div className="mb-3">
        <label className="form-label">Nuevo Mensaje</label>
        <textarea
          className="form-control"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          rows="3"
          required
        />
      </div>

      <button type="submit" className="btn btn-warning">Modificar Comunicación</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default ModificarComunicacion;
