import React, { Component } from 'react';
import Header from '../templates/Header';
import AltaEscuela from '../templates/AltaEscuela';
import BajaEscuela from '../templates/BajaEscuela';
class InfoEscuelas extends Component {
  render() {
    /*const links=[ 
      { name: 'Informacion sobre escuelas', path: '/pages/infoEscuelas' },
      { name: 'Informacion sobre Jefe Colegio', path: '/pages/infoJefeC' },
      { name: 'Chats', path: '/pages/chats' },
      { name: 'Contacto', path: '/Contacto' },
    ];*/
    return (
      <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
        {/*<Header links={links} />*/}
        <div className="container d-flex flex-column justify-content-around align-items-stretch flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
          <h1 className="mt-2 mb-4">ALTA ESCUELA</h1>
          <AltaEscuela />
          <h1 className="mt-2 mb-4">BAJA ESCUELA</h1>
          <BajaEscuela />
          <h1 className="mt-2 mb-4">MODIFICACION ESCUELA</h1>
        <AltaEscuela
          nombreLabel="Nombre "
          direccionLabel="Dirección"
          emailLabel="Email"
          buttonText="Editar"
        />
        </div>
      </section>
    );
  }
}

export default InfoEscuelas;