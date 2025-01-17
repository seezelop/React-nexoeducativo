import React, { useState } from 'react';
import axios from 'axios';

function AltaComunicacion() {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/comunicaciones/alta', {
        titulo,
        mensaje,
        destinatario
      });

      setRespuesta('Comunicación enviada exitosamente.');
      setTitulo('');
      setMensaje('');
      setDestinatario('');
    } catch (error) {
      setRespuesta('Error al enviar la comunicación.');
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
        <label className="form-label">Mensaje</label>
        <textarea
          className="form-control"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows="3"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Destinatario</label>
        <input
          type="text"
          className="form-control"
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Enviar Comunicación</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default AltaComunicacion;
