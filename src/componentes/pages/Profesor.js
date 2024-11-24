import React from 'react';

function Profesor() {
  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1>Bienvenido Profesor</h1>
        <p>Accede a los materiales educativos, asigna calificaciones y gestiona actividades de los alumnos.</p>
      </div>
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <p>© 2024 Copyright: Todos los derechos reservados.</p>
      </footer>
    </section>
  );
}

export default Profesor;
