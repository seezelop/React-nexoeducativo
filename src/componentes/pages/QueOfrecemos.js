import React from 'react';

function QueOfrecemos() {
  return (
    <section className="d-flex flex-column min-vh-100">
      {/* Contenedor principal usando section */}
      <section className="container flex-grow-1">
        <section className="col-md-8 mx-auto">
          <h2 className="text-center mb-4 pt-3">¿Qué ofrecemos?</h2>
          {/* Renglón para las tarjetas */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100"> {/* Añadir h-100 para que todas las tarjetas tengan la misma altura */}
                <div className="card-body d-flex flex-column"> {/* Utilizar flex para distribuir el contenido */}
                  <h5 className="card-title">Gestión académica</h5>
                  <p className="card-text flex-grow-1"> {/* flex-grow-1 para que el texto ocupe el espacio restante */}
                    Los alumnos van a poder acceder fácilmente con un par de clics a toda la información relacionada a sus estudios, ya sea el acceso al material, las notas de sus evaluaciones, la agenda de sus próximos eventos y un registro sobre la cantidad de inasistencias, además de ver las novedades subidas por las distintas autoridades.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100"> {/* Añadir h-100 para que todas las tarjetas tengan la misma altura */}
                <div className="card-body d-flex flex-column"> {/* Utilizar flex para distribuir el contenido */}
                  <h5 className="card-title">Comunicación clara</h5>
                  <p className="card-text flex-grow-1"> {/* flex-grow-1 para que el texto ocupe el espacio restante */}
                    Tanto padres como alumnos van a poder comunicarse con profesores, preceptores y personal administrativo de forma instantánea y sin interrupciones, gracias a que nuestra plataforma tiene su propia mensajería.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100"> {/* Añadir h-100 para que todas las tarjetas tengan la misma altura */}
                <div className="card-body d-flex flex-column"> {/* Utilizar flex para distribuir el contenido */}
                  <h5 className="card-title">Información accesible</h5>
                  <p className="card-text flex-grow-1"> {/* flex-grow-1 para que el texto ocupe el espacio restante */}
                    ¿Cansado de tener que acceder a varias plataformas según la información que necesites? No te preocupes, nosotros ofrecemos una plataforma que unifica notificaciones, asistencias, evaluaciones, novedades y pagos en un solo lugar.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100"> {/* Añadir h-100 para que todas las tarjetas tengan la misma altura */}
                <div className="card-body d-flex flex-column"> {/* Utilizar flex para distribuir el contenido */}
                  <h5 className="card-title">Fácil de gestionar</h5>
                  <p className="card-text flex-grow-1"> {/* flex-grow-1 para que el texto ocupe el espacio restante */}
                    Con los diferentes roles que tenemos en la plataforma, las autoridades pueden delegar fácilmente funciones a los usuarios sin inconvenientes, evitando que se acceda a información innecesaria y sensible.
                  </p>
                </div>
              </div>
            </div>

            {/* Puedes agregar más tarjetas aquí */}
          </div>
        </section>
      </section>
    </section>
  );
}

export default QueOfrecemos;
