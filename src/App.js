import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/templates/Header';
import Carousel from './componentes/templates/Carousel';
import Footer from './componentes/templates/Footer';
import Login from './componentes/pages/Login';
import Admin from './componentes/pages/Admin';
import JeFeColegio from './componentes/pages/JefeColegio';
import Administrativo from './componentes/pages/Administrativo';
import Preceptor from './componentes/pages/Preceptor';
import Profesor from './componentes/pages/Profesor';
import Padre from './componentes/pages/Padre';
import Alumno from './componentes/pages/Alumno';
import User from './componentes/pages/User';
import SobreNosotros from './componentes/pages/SobreNosotros';
import Contacto from './componentes/pages/Contacto';
import PreguntasFrecuentes from './componentes/pages/PreguntasFrecuentes';
import QueOfrecemos from './componentes/pages/QueOfrecemos';
import ABMEscuelas from './componentes/pages/ABMEscuelas';
import ConsultarEscuelas from './componentes/pages/ConsultarEscuelas';
import { UserProvider } from './context/UserContext';
import AltaEscuela from './componentes/pages/AltaEscuela';
import BajaEscuela from './componentes/pages/BajaEscuela';
import AltaUsuario from './componentes/pages/AltaUsuario';
import BajaUsuario from './componentes/pages/BajaUsuario';
import ABMJefeColegio from './componentes/pages/ABMJefeColegio';
import ABMadministrativo from './componentes/pages/ABMadministrativo'; 
import SeleccionarCurso from './componentes/pages/SeleccionarCurso'; 
import SeleccionarProfesor from './componentes/pages/SeleccionarProfesor'; 
import ABMmaterias from './componentes/pages/ABMmaterias'; 
import ABMprofesor from './componentes/pages/ABMprofesor'; 
import ABMpadre from './componentes/pages/ABMpadre'; 
import ABMalumno from './componentes/pages/ABMalumno'; 
import ABMcurso from './componentes/pages/ABMcurso'; 
import ABMpreceptor from './componentes/pages/ABMpreceptor'; 

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
                <section className="container my-4">
                  <h1 className="text-center">Bienvenido a Nexo Educativo</h1>
                  <p className="text-center">
                    Aca va a ir nuestra descripción
                  </p>
                </section>
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
            <Route path="/header" element={<Header />} />
            <Route path="/ABMJefeColegio" element={<ABMJefeColegio />} />
            <Route path="/consultar-escuelas" element={<ConsultarEscuelas />} />



            {/* Rutas para admin y user */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/jefeColegio" element={<JeFeColegio />} />
            <Route path="/administrativo" element={<Administrativo />} />
            <Route path="/preceptor" element={<Preceptor />} />
            <Route path="/profesor" element={<Profesor />} />
            <Route path="/padre" element={<Padre />} />
            <Route path="/alumno" element={<Alumno />} />
            <Route path="/user" element={<User />} />


            {/* Rutas para JEFE COLEGIO */}
            <Route path="/ABMadministrativo" element={<ABMadministrativo />} />
            <Route path="/SeleccionarCurso" element={<SeleccionarCurso />} />
            <Route path="/SeleccionarProfesor" element={<SeleccionarProfesor />} />
            
             {/* Rutas para ADMINISTRATIVO  */}
             <Route path="/ABMmaterias" element={<ABMmaterias />} />
             <Route path="/ABMprofesor" element={<ABMprofesor />} />
             <Route path="/ABMpadre" element={<ABMpadre />} />
             <Route path="/ABMalumno" element={<ABMalumno />} />
             <Route path="/ABMcurso" element={<ABMcurso />} />
             <Route path="/ABMpreceptor" element={<ABMpreceptor />} />

            
          </Routes>

          {/* Aca se renderiza el Footer en todas las páginas */}
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
