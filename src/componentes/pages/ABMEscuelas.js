import React, { useState } from 'react';
import axios from 'axios';
import AltaEscuela from './AltaEscuela';
import BajaEscuela from './BajaEscuela';
import ModificacionEscuela from './ModificacionEscuela';

function ABMEscuelas() {
  // Definimos un estado para almacenar las escuelas
  const [escuelas, setEscuelas] = useState([]);
  
  // Función para consultar las escuelas
  const consultarEscuelas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getEscuelas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Suponiendo que tienes un token en localStorage
        }
      });
      
      if (response.status === 200) {
        setEscuelas(response.data); // Actualiza el estado con los datos obtenidos
      }
    } catch (error) {
      console.error("Hubo un error al obtener las escuelas", error);
    }
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        {/* Sección Alta Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">ALTA ESCUELA</h3>
            <AltaEscuela />
          </div>
        </section>

        {/* Sección Baja Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">BAJA ESCUELA</h3>
            <BajaEscuela />
          </div>
        </section>

        {/* Sección Modificación Escuela */}
        <section className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h3 className="mb-4 text-center">MODIFICAR ESCUELA</h3>
            <ModificacionEscuela />
          </div>
        </section>

        {/* Botón para consultar las escuelas */}
        <section className="col-md-8 mb-5">
          <button className="btn btn-primary" onClick={consultarEscuelas}>Consultar Escuelas</button>
        </section>

        {/* Mostrar la lista de escuelas */}
        {escuelas.length > 0 && (
          <section className="col-md-8 mb-5">
            <div className="card shadow-sm p-3">
              <h3 className="mb-4 text-center">Lista de Escuelas</h3>
              <ul>
                {escuelas.map((escuela, index) => (
                  <li key={index}>
                    {escuela.nombre} - {escuela.direccion}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </div>
    </section>
  );
}

export default ABMEscuelas;
