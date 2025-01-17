import React, { useState } from 'react';
import axios from 'axios';

function ModificarEvento() {
  const [eventoId, setEventoId] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarModificacion = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/eventos/modificar/${eventoId}`, {
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion
      });

      setRespuesta('Evento modificado correctamente.');
      setEventoId('');
      setNuevoTitulo('');
      setNuevaDescripcion('');
    } catch (error) {
      setRespuesta('Error al modificar el evento.');
    }
  };

  return (
    <form onSubmit={manejarModificacion}>
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

      <div className="mb-3">
        <label className="form-label">Nuevo Título</label>
        <input
          type="text"
          className="form-control"
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nueva Descripción</label>
        <textarea
          className="form-control"
          value={nuevaDescripcion}
          onChange={(e) => setNuevaDescripcion(e.target.value)}
          rows="3"
        />
      </div>

      <button type="submit" className="btn btn-warning">Modificar Evento</button>

      {respuesta && <div className="alert alert-info mt-3">{respuesta}</div>}
    </form>
  );
}

export default ModificarEvento;
