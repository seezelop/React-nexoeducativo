import React from 'react';

function Padre() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1>Bienvenido Padre</h1>
        <p>Consulta el progreso académico y la asistencia de tus hijos en esta sección.</p>
      </div>
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <p>© 2024 Copyright: Todos los derechos reservados.</p>
      </footer>
    </section>
  );
}

export default Padre;
