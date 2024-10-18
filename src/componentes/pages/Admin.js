import React from 'react';
import Header from '../templates/Header';
import FormEditarSuperAdmin from '../templates/FormEditarSuperAdmin';

function Admin() {

  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
          <div className="container flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1>Bienvenido</h1>
        <p>Martina Asad</p>
        <FormEditarSuperAdmin/>
      </div>
      
    </section>
  );
}

export default Admin;
