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
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestion academica</h5>
              <p className="card-text">
                Los alumnos van a poder acceder facilmente con un par de clicks a toda la informacion relacionada a sus estudios ya sea el acceso al material, las notas de sus evaluaciones, agenda de sus proximos eventos y un registro sobre la cantidad de inasistencias ademas de ver las novedades subidas por las distintas autoridades
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Comunicacion clara</h5>
              <p className="card-text">
                Tanto padres como alumnos van a poder comunicarse con profesores, preceptores y personal administrativo de forma instantanea y sin interrupciones gracias a que nuestra plataforma tiene su propia mensajeria
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Informacion accesible</h5>
              <p className="card-text">
              ¿Cansado de tener que acceder a varias plataformas segun la informacion que necesites? No te preocupes, nosotros ofrecemos una plataforma que unifica notificaciones, asistencias, evaluaciones, novedades y pagos en un solo lugar
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Facil de gestionar</h5>
              <p className="card-text">
                Con los diferentes roles que tenemos en la plataforma, las autoridades pueden delegar facilmente funciones a los usuarios sin inconvenientes evitando que se acceda a informacion innecesaria y sensible
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
