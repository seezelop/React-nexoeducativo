import React, { useState } from 'react';
import axios from 'axios';

function ModificarNota() {
  const [notaId, setNotaId] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarModificacion = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/notas/modificar/${notaId}`, {
        nuevaNota
      });

      setMensaje('Nota modificada correctamente.');
      setNotaId('');
      setNuevaNota('');
    } catch (error) {
      setMensaje('Error al modificar la nota.');
    }
  };

  return (
    <form onSubmit={manejarModificacion}>
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

      <div className="mb-3">
        <label className="form-label">Nueva Nota</label>
        <input
          type="number"
          className="form-control"
          value={nuevaNota}
          onChange={(e) => setNuevaNota(e.target.value)}
          required
          min="1"
          max="10"
        />
      </div>

      <button type="submit" className="btn btn-warning">Modificar Nota</button>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </form>
  );
}

export default ModificarNota;
