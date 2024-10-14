import React from 'react';
import Footer from '../templates/Footer';

function QueOfrecemos() {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
      <section className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-8">
          <h2 className="text-center mb-4">¿Qué ofrecemos?</h2>
          <p className="text-center">
            Aquí puedes describir los servicios y productos que ofreces.
            Por ejemplo, podrías hablar sobre:
          </p>
          <ul>
            <li>Servicio 1: Descripción del servicio 1.</li>
            <li>Servicio 2: Descripción del servicio 2.</li>
            <li>Servicio 3: Descripción del servicio 3.</li>
            {/* Agrega más servicios según sea necesario */}
          </ul>
        </section>
      </section>

      {/* Footer colocado al final */}
      <Footer />
    </section>
  );
}

export default QueOfrecemos;
