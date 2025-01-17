import React, { useState } from 'react';
import axios from 'axios';

function AltaNota() {
  const [nota, setNota] = useState('');
  const [alumnoId, setAlumnoId] = useState('');
  const [materia, setMateria] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/notas/alta', {
        nota,
        alumnoId,
        materia
      });

      setMensaje('Nota cargada exitosamente.');
      setNota('');
      setAlumnoId('');
      setMateria('');
    } catch (error) {
      setMensaje('Error al cargar la nota.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="mb-3">
        <label className="form-label">ID del Alumno</label>
        <input
          type="text"
          className="form-control"
          value={alumnoId}
          onChange={(e) => setAlumnoId(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Materia</label>
        <input
          type="text"
          className="form-control"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nota</label>
        <input
          type="number"
          className="form-control"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
          min="1"
          max="10"
        />
      </div>

      <button type="submit" className="btn btn-primary">Cargar Nota</button>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </form>
  );
}

export default AltaNota;
