import React from 'react';


function PreguntasFrecuentes() {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
      <section className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-8">
          <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
          <p className="text-center">
            Aquí encontrarás las respuestas a las preguntas más comunes sobre nuestros servicios:
          </p>
          <ul>
            <li>
              <strong>¿Pregunta 1?</strong>
              <p>Respuesta a la pregunta 1.</p>
            </li>
            <li>
              <strong>¿Pregunta 2?</strong>
              <p>Respuesta a la pregunta 2.</p>
            </li>
            <li>
              <strong>¿Pregunta 3?</strong>
              <p>Respuesta a la pregunta 3.</p>
            </li>
            {/* Agrega más preguntas según sea necesario */}
          </ul>
        </section>
      </section>
    </section>
  );
}

export default PreguntasFrecuentes;
