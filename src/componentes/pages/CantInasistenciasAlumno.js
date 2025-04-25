import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ API instanciada fuera del componente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function CantInasistencias() {
  const [inasistencias, setInasistencias] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [hijos, setHijos] = useState([]);
  const [hijoSeleccionado, setHijoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerHijos = async () => {
      try {
        const response = await api.get("/api/usuario/verHijos", {
          withCredentials: true,
        });
        setHijos(response.data);
      } catch (error) {
        setError("Error al obtener los hijos. Inténtelo nuevamente.");
        console.error("Error al obtener hijos:", error);
      }
    };

    obtenerHijos();
  }, []); // ✅ sin advertencia

  useEffect(() => {
    const obtenerInasistencias = async () => {
      if (!hijoSeleccionado) return;

      try {
        const response = await api.get(
          `/api/usuario/cantInasistencias/${hijoSeleccionado}`,
          { withCredentials: true }
        );
        setInasistencias(response.data);
      } catch (error) {
        setError("Error al obtener las inasistencias. Inténtelo nuevamente.");
        console.error("Error al obtener inasistencias:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerInasistencias();
  }, [hijoSeleccionado]); // ✅ sin advertencia

  // Función para determinar el mensaje a mostrar
  const getMensajeInasistencias = () => {
    // Si es una cadena de texto (mensaje del backend)
    if (typeof inasistencias === "string") {
      return inasistencias;
    }
    
    // Si es un número
    if (typeof inasistencias === "number") {
      return inasistencias === 0
        ? "No tiene inasistencias registradas."
        : `Tiene ${inasistencias} inasistencia${
            inasistencias > 1 ? "s" : ""
          } registrada${inasistencias > 1 ? "s" : ""}.`;
    }
    
    // Caso por defecto
    return "No hay información disponible sobre inasistencias.";
  };

  return (
    <div className="container mt-4 pt-5 pb-5">
      <h3 className="text-center mb-4 text-white">Inasistencias</h3>

      <div className="form-group text-white">
        <label htmlFor="hijoSelect">Seleccione un hijo</label>
        <select
          id="hijoSelect"
          className="form-control"
          onChange={(e) => {
            setHijoSeleccionado(e.target.value);
            setCargando(true); // 🟡 muestra "Cargando..." al cambiar de hijo
          }}
          value={hijoSeleccionado || ""}
          style={{ color: "black" }}
        >
          <option value="">Seleccione un hijo</option>
          {hijos.map((hijo) => (
            <option key={hijo.idUsuario} value={hijo.idUsuario}>
              {hijo.nombre + " " + hijo.apellido}
            </option>
          ))}
        </select>
      </div>

      {cargando && hijoSeleccionado ? (
        <div className="alert alert-info mt-3">Cargando...</div>
      ) : error ? (
        <div className="alert alert-danger mt-3">{error}</div>
      ) : hijoSeleccionado ? (
        <div className="alert alert-success mt-3">
          {getMensajeInasistencias()}
        </div>
      ) : (
        <div className="alert alert-info mt-3">
          Seleccione un hijo para ver sus inasistencias.
        </div>
      )}
    </div>
  );
}

export default CantInasistencias;