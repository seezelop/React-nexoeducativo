import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

function Padre() {
  const [searchParams] = useSearchParams();
  const [estadoPago, setEstadoPago] = useState('');
  const [precio, setPrecio] = useState(null);
  const navigate = useNavigate();
  const primeraCarga = useRef(true); // Evita ejecutar en la primera carga

  useEffect(() => {
    // Evita que el efecto se dispare en la primera carga
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }

    const status = searchParams.get("status");
    setEstadoPago(status);

    // Si el estado es "approved" y viene de una redirección, obtenemos el precio y generamos el comprobante
    if (status === "approved") {
      obtenerPrecioYGenerarComprobante();
    }
  }, [searchParams]); // Se ejecuta solo si cambia el parámetro en la URL

  // Obtiene el precio antes de generar el comprobante
  const obtenerPrecioYGenerarComprobante = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/usuario/obtenerInfoCuota", {
        withCredentials: true,
      });

      const nuevoPrecio = response.data;
      setPrecio(nuevoPrecio);

      console.log("Precio obtenido:", nuevoPrecio);

      // Generamos el comprobante solo si se obtuvo un precio válido
      if (nuevoPrecio) {
        generarComprobante(nuevoPrecio);
      }
    } catch (error) {
      console.error("Error al obtener la información de la cuota:", error);
    }
  };

  const generarComprobante = async (importe) => {
    if (!importe) {
      console.error("Error: el importe es inválido");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuario/generarComprobante",
        { importe }, // Enviar datos como JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Para enviar cookies si es necesario
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Funciones de navegación
  const irARealizarPago = () => navigate('/RealizarPago');
  const irAHistorialPagos = () => navigate('/HistorialPagos');
  const irAInasistencias = () => navigate('/cantInasistencias');

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1 className="mb-4">Bienvenido Padre</h1>
        <p className="mb-5">Consulta el progreso académico y la asistencia de tus hijos en esta sección.</p>

        {estadoPago === "approved" && (
          <p className="text-success">El pago fue aprobado, y estas al dia con la cuota</p>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button className="btn btn-danger" onClick={irAInasistencias}>Cantidad de Faltas</button>
          <button className="btn btn-success" onClick={irAHistorialPagos}>Historial de Pagos</button>
          <button className="btn btn-info" onClick={irARealizarPago}>Realizar Pagos</button>
        </div>
      </div>
    </section>
  );
}

export default Padre;
