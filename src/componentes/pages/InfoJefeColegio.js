import React, { Component } from 'react';
import AltaUsuario from './AltaUsuario';
import BajaUsuario from './BajaUsuario';

class InfoJefeColegio extends Component {
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
          <h1 className="mt-2 mb-4">ALTA JEFE COLEGIO</h1>
          <AltaUsuario />
          <h1 className="mt-2 mb-4">BAJA JEFE COLEGIO</h1>
          <BajaUsuario />
        </div>
      </section>
    );
  }
}

export default InfoJefeColegio;