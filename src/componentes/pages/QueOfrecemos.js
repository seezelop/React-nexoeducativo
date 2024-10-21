import React from 'react';

function QueOfrecemos() {
  return (
    <section className="d-flex flex-column min-vh-100">
  {/* Contenedor principal usando section */}
  <section className="container flex-grow-1 pb-4">
    <section className="col-md-12 mx-auto">
      <h2 className="text-center mb-4 pt-3">¿Qué ofrecemos?</h2>
      <div className="row gx-3 gy-4">
        <div className="col-12">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Gestión académica</h5>
              <p className="card-text">
                Los alumnos van a poder acceder fácilmente con un par de clicks a toda la información relacionada a sus estudios ya sea el acceso al material, las notas de sus evaluaciones, agenda de sus próximos eventos y un registro sobre la cantidad de inasistencias además de ver las novedades subidas por las distintas autoridades.
              </p>
            </div>
          </div>
        </div>
      
        <div className="col-12">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Comunicación clara</h5>
              <p className="card-text">
                Tanto padres como alumnos van a poder comunicarse con profesores, preceptores y personal administrativo de forma instantánea y sin interrupciones gracias a que nuestra plataforma tiene su propia mensajería.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Información accesible</h5>
              <p className="card-text">
                ¿Cansado de tener que acceder a varias plataformas según la información que necesites? No te preocupes, nosotros ofrecemos una plataforma que unifica notificaciones, asistencias, evaluaciones, novedades y pagos en un solo lugar.
              </p>
            </div>
          </div>
        </div>
  
        <div className="col-12">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Fácil de gestionar</h5>
              <p className="card-text">
                Con los diferentes roles que tenemos en la plataforma, las autoridades pueden delegar fácilmente funciones a los usuarios sin inconvenientes evitando que se acceda a información innecesaria y sensible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</section>

);
}

export default QueOfrecemos;
