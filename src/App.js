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
import ABMEscuelas from './componentes/pages/ABMEscuelas';
import ConsultarEscuelas from './componentes/pages/ConsultarEscuelas'; // Importa ConsultarEscuelas
import { UserProvider } from './context/UserContext'; // Importa el UserProvider
import AltaEscuela from './componentes/pages/AltaEscuela';
import BajaEscuela from './componentes/pages/BajaEscuela'; 
import AltaUsuario from './componentes/pages/AltaUsuario';
import BajaUsuario from './componentes/pages/BajaUsuario';
import ABMJefeColegio from './componentes/pages/ABMJefeColegio';

function App() {
  return (
    <UserProvider>
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
            <Route path="/ABMEscuelas" element={<ABMEscuelas />} />
            <Route path="/altaEscuela" element={<AltaEscuela />} />
            <Route path="/bajaEscuela" element={<BajaEscuela />} />
            <Route path="/altaUsuario" element={<AltaUsuario />} />
            <Route path="/bajaUsuario" element={<BajaUsuario />} />
            <Route path="/ABMJefeColegio" element={<ABMJefeColegio />} />

            {/* Ruta para consultar escuelas */}
            <Route path="/consultar-escuelas" element={<ConsultarEscuelas />} />

            {/* Rutas para admin y user */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
          </Routes>

          {/* Aquí se renderiza el Footer en todas las páginas */}
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
