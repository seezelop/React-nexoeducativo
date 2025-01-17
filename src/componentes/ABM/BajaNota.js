import React, { useState } from 'react';
import axios from 'axios';

function BajaNota() {
  const [notaId, setNotaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarBaja = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/notas/baja/${notaId}`);
      setMensaje('Nota eliminada correctamente.');
      setNotaId('');
    } catch (error) {
      setMensaje('Error al eliminar la nota.');
    }
  };

  return (
    <form onSubmit={manejarBaja}>
      <div className="mb-3">
        <label className="form-label">ID de la Nota</label>
        <input
          type="text"
          className="form-control"
          value={notaId}
          onChange={(e) => setNotaId(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-danger">Eliminar Nota</button>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </form>
  );
}

export default BajaNota;
