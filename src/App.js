import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/templates/NavBar';
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
import ABMEscuelas from './componentes/ABM/ABMEscuelas';
import ConsultarEscuelas from './componentes/pages/ConsultarEscuelas';
import { UserProvider } from './context/UserContext';
import AltaEscuela from './componentes/ABM/AltaEscuela';
import BajaEscuela from './componentes/ABM/BajaEscuela';
import AltaJefeColegio from './componentes/ABM/AltaJefeColegio';
import BajaUsuario from './componentes/ABM/BajaUsuario';
import ABMJefeColegio from './componentes/ABM/ABMJefeColegio';
import ABMadministrativo from './componentes/ABM/ABMadministrativo'; 
import SeleccionarCurso from './componentes/pages/SeleccionarCurso'; 
import SeleccionarProfesor from './componentes/pages/SeleccionarProfesor'; 
import ABMmaterias from './componentes/ABM/ABMmaterias'; 
import ABMprofesor from './componentes/ABM/ABMprofesor'; 
import ABMpadre from './componentes/ABM/ABMpadre'; 
import ABMalumno from './componentes/ABM/ABMalumno'; 
import ABMcurso from './componentes/ABM/ABMcurso'; 
import ABMpreceptor from './componentes/ABM/ABMpreceptor'; 
import GestionarAsistenciaAlumno from './componentes/pages/GestionarAsistenciaAlumno'; 
import GestionarAsistenciaProfesor from './componentes/pages/GestionarAsistenciaProfesor';
import RealizarPago from './componentes/pages/RealizarPago';
import EstablecerPrecioCuota from './componentes/pages/EstablecerPrecioCuota';
import HistorialPagos from './componentes/pages/HistorialPagos';
import ABMtarea from './componentes/ABM/ABMtarea';
import ABMNota from './componentes/ABM/ABMNota';
import ABMComunicaciones from './componentes/ABM/ABMComunicaciones';
import ABMEvento from './componentes/ABM/ABMEvento';
import ABMMaterial from './componentes/ABM/ABMMaterial';
import InformacionCurso from './componentes/pages/InformacionCurso';
import InformacionCursoAlumno from './componentes/pages/InformacionCursoAlumno';
import RenovarMembresia from './componentes/pages/RenovarMembresia';
import Chats from "./componentes/pages/Chats";
import ChatIndividual from "./componentes/pages/ChatIndividual"; 
import GestionesPago from "./componentes/pages/GestionesPago";


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
            <Route path="/altaJefeColegio" element={<AltaJefeColegio />} />
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
            
            <Route path="/RenovarMembresia" element={<RenovarMembresia />} />
            
             {/* Rutas para ADMINISTRATIVO  */}
             <Route path="/ABMmaterias" element={<ABMmaterias />} />
             <Route path="/ABMprofesor" element={<ABMprofesor />} />
             <Route path="/ABMpadre" element={<ABMpadre />} />
             <Route path="/ABMalumno" element={<ABMalumno />} />
             <Route path="/ABMcurso" element={<ABMcurso />} />
             <Route path="/ABMpreceptor" element={<ABMpreceptor />} />
             <Route path="/gestiones-pago" element={<GestionesPago />} />

              {/* Rutas para PRECEPTOR  */}
              <Route path="/GestionarAsistenciaAlumno" element={<GestionarAsistenciaAlumno />} />
              <Route path="/GestionarAsistenciaProfesor" element={<GestionarAsistenciaProfesor />} />

              {/* Rutas para Profesor  */}
              <Route path="/ABMtarea" element={<ABMtarea />} />
              <Route path="/ABMNota" element={<ABMNota />} />
              <Route path="/ABMComunicaciones" element={<ABMComunicaciones />} />
              <Route path="/ABMEvento" element={<ABMEvento />} />
              <Route path="/ABMMaterial" element={<ABMMaterial />} />
              
              {/* Rutas para Padre  */}
              <Route path="/InformacionCurso" element={<InformacionCurso />} />


              {/* Rutas para Alumno  */}
              <Route path="/InformacionCursoAlumno" element={<InformacionCursoAlumno />} />

              {/* Ruta para realizar pagos  */}
              <Route path="/EstablecerPrecioCuota" element={<EstablecerPrecioCuota/>} />
              <Route path="/RealizarPago" element={<RealizarPago />} />
              <Route path="/HistorialPagos" element={<HistorialPagos />} />


             {/* Rutas para chats  */}
              <Route path="/admin/chats" element={<Chats />} />
              <Route path="/admin/chat/:mail" element={<ChatIndividual />} />

            
          </Routes>

          {/* Aca se renderiza el Footer en todas las páginas */}
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
