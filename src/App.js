import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './componentes/templates/Header';
import Carousel from './componentes/templates/Carousel';
import Footer from './componentes/templates/Footer';
import Login from './componentes/pages/Login';
import Admin from './componentes/pages/Admin'; 
import User from './componentes/pages/User';   
import SobreNosotros from './componentes/pages/SobreNosotros';
import Contacto from './componentes/pages/Contacto';
import PreguntasFrecuentes from './componentes/pages/PreguntasFrecuentes';
import QueOfrecemos from './componentes/pages/QueOfrecemos';

function App() {
  return (
    <Router> 
      <div className="App">
      <Header />

        {/* Configuramos las rutas */}
        <Routes>
          {/* Ruta principal */} 
          <Route path="/" element={ 
            <>
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
            </>
          } />

          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} /> 

          {/* Otras rutas */}
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/queofrecemos" element={<QueOfrecemos />} />
          <Route path="/preguntasfrecuentes" element={<PreguntasFrecuentes />} />

          {/* Rutas para admin y user */}
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/user" element={<User />} />   
        </Routes>

        {/* Aquí se renderiza el Footer en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
