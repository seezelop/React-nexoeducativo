import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa los componentes de react-router-dom
import Header from './componentes/templates/Header';
import Carousel from './componentes/templates/Carousel';
import Footer from './componentes/templates/Footer';
import Login from './componentes/pages/Login';
import Admin from './componentes/pages/Admin'; // Importa el componente Admin
import User from './componentes/pages/User';   // Importa el componente User

function App() {
  return (
    <Router> {/* Envolvemos todo dentro de Router */}
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

              {/* Sección del footer */}
              <section className="container my-4">
                <Footer />
              </section>
            </>
          } />

          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} /> {/* Aquí renderiza el componente Login */}

          {/* Rutas para admin y user */}
          <Route path="/admin" element={<Admin />} /> {/* Renderiza el componente Admin */}
          <Route path="/user" element={<User />} />   {/* Renderiza el componente User */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
