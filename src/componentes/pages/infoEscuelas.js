import React, { Component } from 'react';
import Header from '../templates/Header';
import AltaEscuela from '../templates/AltaEscuela';
class Admin extends Component {
  render(){
    const links=[ 
      { name: 'Informacion sobre escuelas', path: '/pages/infoEscuelas' },
      { name: 'Informacion sobre Jefe Colegio', path: '/pages/infoJefeC' },
      { name: 'Chats', path: '/pages/chats' },
      { name: 'Contacto', path: '/Contacto' },
    ];
  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor que ocupa toda la altura */}
      <Header links={links} />
      <div className="container flex-grow-1"> {/* Flex-grow para que crezca y ocupe espacio */}
        <h1>ALTA ESCUELA</h1>
        <AltaEscuela/>
      </div>
      
    </section>
  );
}
}

export default infoEscuelas;