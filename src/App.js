import React from 'react';
import Header from './componentes/Header';
import Carousel from './componentes/Carousel';
import Footer from './componentes/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
       {/* Sección principal con título y descripción */}
       <section className="container my-4">
        <h1 className="text-center">Bienvenido a Nexo Educativo</h1> 
        <p className="text-center">
          Aca va a ir nuestra descripción
        </p> 
      </section>
      
      {/* Sección del carrusel */}
      <section className="container my-4">
        <Carousel />
      </section>
      
      {/* Sección del footer */}
      <section className="container my-4">
        <Footer />
      </section>
    </div>
  );
}

export default App;

