import React, { useState } from 'react';

function ModificarTarea() {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Tarea 1' },
    { id: 2, titulo: 'Tarea 2' },
  ]);
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

  const modificarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, titulo: nuevaDescripcion } : tarea
    );
    setTareas(nuevasTareas);
    alert('Tarea modificada correctamente.');
    setNuevaDescripcion('');
  };

  return (
    <div>
      {tareas.length === 0 ? (
        <p>No hay tareas para modificar.</p>
      ) : (
        <ul className="list-group">
          {tareas.map((tarea) => (
            <li key={tarea.id} className="list-group-item">
              <strong>{tarea.titulo}</strong>
              <div className="mt-2 d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Nueva descripción"
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                />
                <button
                  className="btn btn-warning"
                  onClick={() => modificarTarea(tarea.id)}
                >
                  Modificar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ModificarTarea;
