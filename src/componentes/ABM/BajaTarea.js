import React, { useState } from 'react';

function BajaTarea() {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Tarea 1' },
    { id: 2, titulo: 'Tarea 2' },
    { id: 3, titulo: 'Tarea 3' },
  ]);

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
    alert('Tarea eliminada correctamente.');
  };

  return (
    <div>
      {tareas.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul className="list-group">
          {tareas.map((tarea) => (
            <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center">
              {tarea.titulo}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarTarea(tarea.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BajaTarea;
