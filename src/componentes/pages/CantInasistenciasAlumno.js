import React, { useEffect, useState } from "react";
import axios from "axios";

function CantInasistenciasAlumno() {
  const [inasistencias, setInasistencias] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerInasistencias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/cantInasistenciasAlumno", {
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
    <div>
      <h3>Inasistencias del Alumno</h3>

      {cargando ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{inasistencias}</p>
      )}
    </div>
  );
}

export default CantInasistenciasAlumno;