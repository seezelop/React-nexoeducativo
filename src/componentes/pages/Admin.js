import React from 'react';
import FormEditarSuperAdmin from './FormEditarSuperAdmin';

function Admin() {

  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1 className="mb-5">Bienvenido Administrador</h1>
        <button type="button" class="btn btn-primary"><a href='/infoEscuelas'>Informacion sobre escuelas</a></button>
        <button type="button" class="btn btn-secondary"><a href='/infoJefeColegio'>Informacion sobre Jefe Colegio</a></button>
        <button type="button" class="btn btn-success">Chats</button>
   
        <FormEditarSuperAdmin />
      </div>

    </section>
  );
}

export default Admin;
