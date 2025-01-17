import React, { useState } from 'react';
import axios from 'axios';

function AltaEvento() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/eventos/alta', {
        titulo,
        descripcion,
        fecha,
        ubicacion
      });

      setRespuesta('Evento creado exitosamente.');
      setTitulo('');
      setDescripcion('');
      setFecha('');
      setUbicacion('');
    } catch (error) {
      setRespuesta('Error al crear el evento.');
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
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ubicación</label>
        <input
          type="text"
          className="form-control"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Crear Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default AltaEvento;
