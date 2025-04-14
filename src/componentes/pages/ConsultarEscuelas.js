import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ✅ Instancia de axios fuera del componente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ConsultarEscuelas = () => {
  const [escuelas, setEscuelas] = useState([]);

  useEffect(() => {
    const obtenerEscuelas = async () => {
      try {
        const response = await api.get('/api/usuario/getEscuelas', {
          withCredentials: true
        });

        if (response.status === 200) {
          setEscuelas(response.data);
        }
      } catch (error) {
        console.error('Error al obtener las escuelas', error);
      }
    };

    obtenerEscuelas(); // 👈 Llamada dentro del useEffect
  }, []); // ✅ Ya no hay advertencia de dependencias

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h2 className="text-center mb-4">Listado de Escuelas</h2>
        {escuelas.length > 0 ? (
          <ul className="list-group col-md-8">
            {escuelas.map((escuela, index) => (
              <li key={index} className="list-group-item">
                <strong>Nombre:</strong> {escuela.nombre}<br />
                <strong>Dirección:</strong> {escuela.direccion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay escuelas registradas.</p>
        )}
      </div>
    </section>
  );
};

export default ConsultarEscuelas;
