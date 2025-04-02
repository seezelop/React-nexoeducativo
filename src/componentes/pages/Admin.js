import React from 'react';
import FormEditarSuperAdmin from './FormEditarSuperAdmin';

function Admin() {

  return (
    <section className="d-flex flex-column min-vh-100 pb-5"> 
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1 mb-5">
        <h1 className="mb-5 text-white">Bienvenido Administrador</h1>
        <h3 className="mb-5 text-white">Panel para editar mis datos</h3>
        <FormEditarSuperAdmin />
      </div>
    </section>

  );
}

export default Admin;
