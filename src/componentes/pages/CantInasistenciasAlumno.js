import React, { useEffect, useState } from "react";
import axios from "axios";

function CantInasistenciasAlumno() {
  const [inasistencias, setInasistencias] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const obtenerInasistencias = async () => {
      try {
        const response = await api.get("/api/usuario/cantInasistenciasAlumno", {
          withCredentials: true,
        });

        setInasistencias(response.data);
      } catch (error) {
        setError("Error al obtener las inasistencias. Inténtelo nuevamente.");
        console.error("Error al obtener inasistencias:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerInasistencias();
  }, []);

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "50px" }}>
      <h3 style={{ color: "white" }}>Inasistencias del Alumno</h3>
  
      {cargando ? (
        <p style={{ color: "white" }}>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "white" }}>{inasistencias}</p>
      )}
    </div>
  ); 
  
}

export default CantInasistenciasAlumno;