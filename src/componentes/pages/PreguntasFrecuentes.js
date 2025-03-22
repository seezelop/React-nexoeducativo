import React from 'react';


function PreguntasFrecuentes() {
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
      <section className="container d-flex justify-content-center flex-grow-1">
        <section className="col-md-8">
          <h2 className="text-center mb-4 pt-3">Preguntas Frecuentes</h2>
          <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      ¿Puedo utilizar NexoEducativo desde cualquier dispositivo?
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Claro, se puede utilizar tanto en computadoras como en dispositivos moviles y tablets ya sea desde la pagina web o con la app con ciertas restriccciones 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      ¿Como accedo a la plataforma?
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Tu escuela debe previamente registrarte en el sistema con tu mail y contraseña, luego colocar esta informacion en <a href="/contacto" style={{ color: 'black' }}>este link</a> y listo! 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      ¿Puedo realizar pagos?
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <p>Claro, a traves de mercadopago tanto desde la web como desde nuestra app, con inmediata acreditacion o con la informacion bancaria provista por la institucion</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
      ¿Puedo contratar una version mejorada?
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Claro, nuestra plataforma tiene la posibilidad de ofrecerte una version premium orientada a que las autoridades de la escuela puedan ver la informacion de una manera mas grafica y con acceso a una mayor cantidad de informacion para mejorar su gestion
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseTwo">
      ¿Se necesita wifi para utilizar la aplicacion?
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Si, de lo contrario no podras obtener informacion actualizada sobre las novedades de la escuela
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseTwo">
      Tengo un problema con la aplicacion
      </button>
    </h2>
    <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       No te preocupes! Podes comunicarnos tu problema en <a href="/contacto" style={{ color: 'black' }}>este link</a> y lo solucionaremos lo mas pronto posible
      </div>
    </div>
  </div>
</div>
        </section>
      </section>
    </section>
  );
}

export default PreguntasFrecuentes;
