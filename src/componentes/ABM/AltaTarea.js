import React, { useState } from 'react';

function AltaTarea() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la tarea
    alert(`Tarea "${titulo}" creada correctamente.`);
    setTitulo('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">Título de la Tarea</label>
        <input
          type="text"
          id="titulo"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <textarea
          id="descripcion"
          className="form-control"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">Crear Tarea</button>
    </form>
  );
}

export default AltaTarea;
