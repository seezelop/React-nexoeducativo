import React, { useState } from 'react';
import axios from 'axios';

function BajaEvento() {
  const [eventoId, setEventoId] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarBaja = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/eventos/baja/${eventoId}`);
      setRespuesta('Evento eliminado correctamente.');
      setEventoId('');
    } catch (error) {
      setRespuesta('Error al eliminar el evento.');
    }
  };

  return (
    <form onSubmit={manejarBaja}>
      <div className="mb-3">
        <label className="form-label">ID del Evento</label>
        <input
          type="text"
          className="form-control"
          value={eventoId}
          onChange={(e) => setEventoId(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-danger">Eliminar Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default BajaEvento;
